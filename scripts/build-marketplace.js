#!/usr/bin/env node

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const PLUGINS_DIR = join(ROOT, "plugins");
const OUTPUT = join(ROOT, ".claude-plugin", "marketplace.json");

const MARKETPLACE_NAME = "vicert-marketplace";
const OWNER = { name: "vicert-healthcare" };
const DESCRIPTION = "Vicert community Claude Code plugin marketplace";

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
    return JSON.parse(await readFile(path, "utf-8"));
  } catch {
    return null;
  }
}

async function detectComponents(pluginPath) {
  const components = [];
  const dirs = [
    { dir: "skills", label: "skills" },
    { dir: "agents", label: "agents" },
    { dir: "commands", label: "commands" },
    { dir: "hooks", label: "hooks" },
  ];

  for (const { dir, label } of dirs) {
    if (await dirExists(join(pluginPath, dir))) components.push(label);
  }

  if (await fileExists(join(pluginPath, ".mcp.json"))) components.push("mcp");
  if (await fileExists(join(pluginPath, ".lsp.json"))) components.push("lsp");

  return components;
}

async function discoverPlugins() {
  const plugins = [];

  if (!(await dirExists(PLUGINS_DIR))) {
    return plugins;
  }

  const categories = await readdir(PLUGINS_DIR);

  for (const category of categories) {
    const categoryPath = join(PLUGINS_DIR, category);
    if (!(await dirExists(categoryPath))) continue;

    const pluginDirs = await readdir(categoryPath);

    for (const pluginName of pluginDirs) {
      const pluginPath = join(categoryPath, pluginName);
      if (!(await dirExists(pluginPath))) continue;

      const manifestPath = join(pluginPath, ".claude-plugin", "plugin.json");
      const manifest = await readJson(manifestPath);

      if (!manifest) {
        console.warn(
          `  Skipping ${category}/${pluginName}: missing or invalid .claude-plugin/plugin.json`
        );
        continue;
      }

      const relativePath =
        "./" + relative(ROOT, pluginPath).split("\\").join("/");

      const components = await detectComponents(pluginPath);

      const entry = {
        name: manifest.name || pluginName,
        source: relativePath,
        description: manifest.description || "",
        version: manifest.version || "1.0.0",
        category,
        components,
      };

      if (manifest.author) entry.author = manifest.author;
      if (manifest.keywords?.length) entry.tags = manifest.keywords;
      if (manifest.homepage) entry.homepage = manifest.homepage;
      if (manifest.repository) entry.repository = manifest.repository;
      if (manifest.license) entry.license = manifest.license;

      plugins.push(entry);
      console.log(`  Found: ${category}/${manifest.name || pluginName}`);
    }
  }

  return plugins;
}

async function main() {
  console.log("Building marketplace.json...\n");

  const plugins = await discoverPlugins();

  const marketplace = {
    name: MARKETPLACE_NAME,
    owner: OWNER,
    metadata: {
      description: DESCRIPTION,
      version: "1.0.0",
    },
    plugins,
  };

  await writeFile(OUTPUT, JSON.stringify(marketplace, null, 2) + "\n");
  console.log(
    `\nWrote ${OUTPUT} with ${plugins.length} plugin(s) across ${new Set(plugins.map((p) => p.category)).size} categor(ies).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
