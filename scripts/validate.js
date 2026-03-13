#!/usr/bin/env node

/**
 * Validates plugin structure and manifests.
 * Used by CI (validate-pr.yml) and can be run locally.
 *
 * Usage:
 *   node scripts/validate.js                    # validate all plugins
 *   node scripts/validate.js plugins/devops/foo  # validate a specific plugin
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, basename } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const PLUGINS_DIR = join(ROOT, "plugins");

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const REQUIRED_MANIFEST_FIELDS = ["name", "version", "description"];

let errors = 0;
let warnings = 0;

function error(path, msg) {
  console.error(`  ERROR  ${path}: ${msg}`);
  errors++;
}

function warn(path, msg) {
  console.warn(`  WARN   ${path}: ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  OK     ${msg}`);
}

async function dirExists(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function fileExists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function readJson(path) {
  try {
    const content = await readFile(path, "utf-8");
    return { data: JSON.parse(content), raw: content };
  } catch (e) {
    return { error: e.message };
  }
}

async function validatePlugin(pluginPath, category) {
  const pluginDirName = basename(pluginPath);
  const label = `${category}/${pluginDirName}`;

  console.log(`\n  Validating ${label}...`);

  if (!KEBAB_CASE.test(pluginDirName)) {
    error(label, `Plugin folder name must be kebab-case, got "${pluginDirName}"`);
  }

  const manifestPath = join(pluginPath, ".claude-plugin", "plugin.json");
  if (!(await fileExists(manifestPath))) {
    error(label, "Missing .claude-plugin/plugin.json");
    return null;
  }

  const { data: manifest, error: parseError } = await readJson(manifestPath);
  if (parseError) {
    error(label, `Invalid JSON in plugin.json: ${parseError}`);
    return null;
  }

  for (const field of REQUIRED_MANIFEST_FIELDS) {
    if (!manifest[field]) {
      error(label, `Missing required field "${field}" in plugin.json`);
    }
  }

  if (manifest.name && !KEBAB_CASE.test(manifest.name)) {
    error(label, `Plugin name must be kebab-case, got "${manifest.name}"`);
  }

  if (manifest.name && manifest.name !== pluginDirName) {
    warn(label, `Plugin name "${manifest.name}" differs from folder name "${pluginDirName}"`);
  }

  if (manifest.version && !/^\d+\.\d+\.\d+/.test(manifest.version)) {
    error(label, `Version must follow semver (x.y.z), got "${manifest.version}"`);
  }

  if (!(await fileExists(join(pluginPath, "README.md")))) {
    warn(label, "Missing README.md (recommended for marketplace listing)");
  }

  const hasSkills = await dirExists(join(pluginPath, "skills"));
  const hasAgents = await dirExists(join(pluginPath, "agents"));
  const hasCommands = await dirExists(join(pluginPath, "commands"));
  const hasHooks = await dirExists(join(pluginPath, "hooks"));
  const hasMcp = await fileExists(join(pluginPath, ".mcp.json"));
  const hasLsp = await fileExists(join(pluginPath, ".lsp.json"));

  if (!hasSkills && !hasAgents && !hasCommands && !hasHooks && !hasMcp && !hasLsp) {
    warn(label, "Plugin has no components (skills, agents, commands, hooks, mcp, or lsp)");
  }

  if (hasSkills) {
    const skillDirs = await readdir(join(pluginPath, "skills"));
    for (const skill of skillDirs) {
      const skillDir = join(pluginPath, "skills", skill);
      if (!(await dirExists(skillDir))) continue;
      if (!(await fileExists(join(skillDir, "SKILL.md")))) {
        error(label, `Skill "${skill}" is missing SKILL.md`);
      }
    }
  }

  if (hasMcp) {
    const { error: mcpError } = await readJson(join(pluginPath, ".mcp.json"));
    if (mcpError) {
      error(label, `.mcp.json contains invalid JSON: ${mcpError}`);
    }
  }

  if (hasHooks) {
    const hooksPath = join(pluginPath, "hooks", "hooks.json");
    if (await fileExists(hooksPath)) {
      const { error: hooksError } = await readJson(hooksPath);
      if (hooksError) {
        error(label, `hooks/hooks.json contains invalid JSON: ${hooksError}`);
      }
    }
  }

  ok(label);
  return manifest;
}

async function validateAll(targetPath) {
  console.log("Validating marketplace plugins...\n");

  const seenNames = new Map();
  let pluginCount = 0;

  if (targetPath) {
    const parts = targetPath.replace(/\/$/, "").split("/");
    const category = parts[parts.length - 2] || "unknown";
    const manifest = await validatePlugin(targetPath, category);
    if (manifest?.name) {
      seenNames.set(manifest.name, targetPath);
    }
    pluginCount = 1;
  } else {
    if (!(await dirExists(PLUGINS_DIR))) {
      console.log("No plugins/ directory found.");
      return;
    }

    const categories = await readdir(PLUGINS_DIR);

    for (const category of categories) {
      const categoryPath = join(PLUGINS_DIR, category);
      if (!(await dirExists(categoryPath))) continue;

      if (!KEBAB_CASE.test(category)) {
        error(category, `Category folder name must be kebab-case, got "${category}"`);
      }

      const pluginDirs = await readdir(categoryPath);

      for (const pluginName of pluginDirs) {
        const pluginPath = join(categoryPath, pluginName);
        if (!(await dirExists(pluginPath))) continue;

        pluginCount++;
        const manifest = await validatePlugin(pluginPath, category);

        if (manifest?.name) {
          if (seenNames.has(manifest.name)) {
            error(
              `${category}/${pluginName}`,
              `Duplicate plugin name "${manifest.name}" (also in ${seenNames.get(manifest.name)})`
            );
          } else {
            seenNames.set(manifest.name, `${category}/${pluginName}`);
          }
        }
      }
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Validated ${pluginCount} plugin(s): ${errors} error(s), ${warnings} warning(s)`);

  if (errors > 0) {
    console.error("\nValidation FAILED.");
    process.exit(1);
  } else {
    console.log("\nValidation PASSED.");
  }
}

const targetPath = process.argv[2]
  ? join(ROOT, process.argv[2])
  : null;

validateAll(targetPath).catch((err) => {
  console.error(err);
  process.exit(1);
});
