# Contributing to Vicert Claude Code Marketplace

Thanks for contributing! This guide covers how to add plugins, create categories, and update existing plugins.

## Two Ways to Contribute

### Option 1: Web Editor (Recommended)

1. Visit the [marketplace site](https://vicert-healthcare.github.io/vicert-claude-marketplace/)
2. Click **Add Plugin**
3. Fill in the plugin metadata, write your components, and submit
4. The editor automatically creates a fork, commits your files, and opens a pull request

### Option 2: Manual via GitHub

Follow the steps below to create a plugin manually.

## Adding a New Plugin

### 1. Fork and clone

```bash
git clone https://github.com/<your-username>/vicert-claude-marketplace.git
cd vicert-claude-marketplace
```

### 2. Create the plugin directory

```bash
mkdir -p plugins/<category>/<your-plugin-name>/.claude-plugin
```

Pick an existing category folder or create a new one (see [Creating a New Category](#creating-a-new-category)).

### 3. Add plugin.json

Create `plugins/<category>/<your-plugin-name>/.claude-plugin/plugin.json`:

```json
{
  "name": "your-plugin-name",
  "version": "1.0.0",
  "description": "Brief description of what your plugin does",
  "author": {
    "name": "Your Name"
  },
  "keywords": ["relevant", "tags"],
  "license": "MIT"
}
```

**Required fields:**

| Field         | Description                                    |
| ------------- | ---------------------------------------------- |
| `name`        | Unique kebab-case identifier (e.g., `my-tool`) |
| `version`     | Semantic version (`MAJOR.MINOR.PATCH`)         |
| `description` | One-line summary of the plugin                 |

### 4. Add components

Add at least one component to your plugin. All are optional -- include only what your plugin needs.

#### Skills

```
your-plugin-name/
└── skills/
    └── skill-name/
        └── SKILL.md
```

SKILL.md format:

```markdown
---
description: What this skill does (shown in /plugin UI)
disable-model-invocation: true
---

Your skill instructions here.
```

#### Agents

```
your-plugin-name/
└── agents/
    └── agent-name.md
```

Agent markdown format:

```markdown
---
name: agent-name
description: When Claude should invoke this agent
---

System prompt for the agent.
```

#### Commands

```
your-plugin-name/
└── commands/
    └── command-name.md
```

Same format as skills, placed in `commands/` instead of `skills/`.

#### Hooks

```
your-plugin-name/
└── hooks/
    └── hooks.json
```

See [Claude Code hooks docs](https://code.claude.com/docs/en/hooks) for the JSON format.

#### MCP Servers

Create `.mcp.json` in the plugin root:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/my-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"]
    }
  }
}
```

Use `${CLAUDE_PLUGIN_ROOT}` for paths -- plugins are copied to a cache when installed.

### 5. Add README.md

Create a `README.md` in your plugin root. This is rendered on the marketplace site.

```markdown
# Your Plugin Name

Description of what it does.

## Usage

How to use it after installing.

## Install

\`\`\`bash
/plugin install your-plugin-name@vicert-marketplace
\`\`\`
```

### 6. Validate locally

```bash
node scripts/validate.js plugins/<category>/<your-plugin-name>
```

### 7. Open a pull request

```bash
git checkout -b add-plugin/your-plugin-name
git add plugins/<category>/<your-plugin-name>
git commit -m "Add plugin: your-plugin-name"
git push origin add-plugin/your-plugin-name
```

Then open a PR against `vicert-healthcare/vicert-claude-marketplace:main`.

## Creating a New Category

Categories are simply folders under `plugins/`. To create a new category:

1. Create the folder: `mkdir plugins/my-new-category`
2. Add your plugin inside it
3. The category will be auto-discovered by the build system

Category names must be **kebab-case** (lowercase letters, numbers, and hyphens).

## Updating an Existing Plugin

1. Make your changes in the plugin directory
2. **Bump the version** in `.claude-plugin/plugin.json` (this is required -- Claude Code uses the version for cache invalidation)
3. Update the README if needed
4. Open a PR

### Version Bumping Guide

- **Patch** (`1.0.0` → `1.0.1`): Bug fixes, typo corrections
- **Minor** (`1.0.0` → `1.1.0`): New features, additional components
- **Major** (`1.0.0` → `2.0.0`): Breaking changes, restructured components

## Plugin Structure Reference

```
plugins/<category>/<plugin-name>/
├── .claude-plugin/
│   └── plugin.json          # Required
├── skills/                  # Optional
│   └── <skill-name>/
│       └── SKILL.md
├── agents/                  # Optional
│   └── agent-name.md
├── commands/                # Optional
│   └── command-name.md
├── hooks/                   # Optional
│   └── hooks.json
├── .mcp.json                # Optional
├── .lsp.json                # Optional
├── scripts/                 # Optional
└── README.md                # Recommended
```

## CI Validation

When you open a PR that modifies files under `plugins/`, the CI will automatically:

- Validate your `plugin.json` schema
- Check that required files exist
- Verify folder naming conventions (kebab-case)
- Warn if you modified an existing plugin without bumping the version

## Questions?

Open an [issue](https://github.com/vicert-healthcare/vicert-claude-marketplace/issues) or check the [Claude Code plugin docs](https://code.claude.com/docs/en/plugins).
