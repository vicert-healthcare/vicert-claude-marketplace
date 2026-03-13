# Vicert Claude Code Marketplace

A Vicert Claude Code plugin marketplace. Browse, discover, and install plugins directly from Claude Code.

## Quick Start

### Add the marketplace

```bash
/plugin marketplace add vicert-healthcare/vicert-claude-marketplace
```

### Browse and install plugins

```bash
# Open the plugin manager
/plugin

# Or install directly
/plugin install <plugin-name>@vicert-marketplace
```

### Browse online

Visit the [marketplace catalog](https://vicert-healthcare.github.io/vicert-claude-marketplace/) to browse plugins with descriptions, categories, and install commands.

## Contributing a Plugin

You can contribute plugins in two ways:

### Via the website

1. Visit the [marketplace catalog](https://vicert-healthcare.github.io/vicert-claude-marketplace/)
2. Click **Add Plugin**
3. Follow the wizard to create your plugin
4. A PR is automatically opened for maintainer review

### Via GitHub

1. Fork this repository
2. Create your plugin folder: `plugins/<category>/<your-plugin-name>/`
3. Add a `.claude-plugin/plugin.json` manifest and your plugin components
4. Add a `README.md` describing your plugin
5. Open a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

## Plugin Structure

Each plugin follows the [official Claude Code plugin format](https://code.claude.com/docs/en/plugins-reference):

```
plugins/<category>/<plugin-name>/
├── .claude-plugin/
│   └── plugin.json          # Required: name, version, description
├── skills/                  # Skills (optional)
│   └── <skill-name>/
│       └── SKILL.md
├── agents/                  # Subagents (optional)
│   └── agent-name.md
├── commands/                # Commands (optional)
│   └── command-name.md
├── hooks/                   # Event hooks (optional)
│   └── hooks.json
├── .mcp.json                # MCP servers (optional)
├── .lsp.json                # LSP servers (optional)
└── README.md                # Documentation
```

## Categories

Categories are folder-driven. Any folder under `plugins/` is a category. To create a new category, just add a new folder. Current categories are auto-discovered from the repository structure.

## License

[MIT](LICENSE)
