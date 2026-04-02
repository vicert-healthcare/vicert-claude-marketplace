import { useState, useMemo, useRef } from "preact/hooks";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Item {
  key: string;
  val: string;
  isNew?: boolean;
}

interface SubSection {
  label: string;
  items: Item[];
}

interface Section {
  id: string;
  title: string;
  emoji: string;
  subSections: SubSection[];
}

const SECTIONS: Section[] = [
  {
    id: "keyboard",
    title: "Keyboard Shortcuts",
    emoji: "⌨️",
    subSections: [
      {
        label: "General",
        items: [
          { key: "Ctrl+C", val: "Cancel input / generation" },
          { key: "Ctrl+D", val: "Exit session" },
          { key: "Ctrl+L", val: "Clear screen" },
          { key: "Ctrl+O", val: "Toggle verbose output" },
          { key: "Ctrl+R", val: "Reverse search history" },
          { key: "Ctrl+G", val: "Open prompt in editor" },
          { key: "Ctrl+B", val: "Background running task" },
          { key: "Ctrl+T", val: "Toggle task list" },
          { key: "Ctrl+V", val: "Paste image" },
          { key: "Ctrl+F ×2", val: "Kill background agents" },
          { key: "Esc Esc", val: "Rewind / undo" },
        ],
      },
      {
        label: "Modes",
        items: [
          { key: "⇧Tab", val: "Cycle permission modes" },
          { key: "⌥P", val: "Switch model" },
          { key: "⌥T", val: "Toggle thinking" },
        ],
      },
      {
        label: "Input",
        items: [
          { key: "\\+Enter", val: "Newline (quick)" },
          { key: "Ctrl+J", val: "Newline (control seq)" },
          { key: "/", val: "Slash command" },
          { key: "!", val: "Direct bash" },
          { key: "@", val: "File mention + autocomplete" },
        ],
      },
      {
        label: "Session Picker",
        items: [
          { key: "↑ ↓", val: "Navigate" },
          { key: "← →", val: "Expand / collapse" },
          { key: "P / R", val: "Preview / Rename" },
          { key: "A / B", val: "All projects / Current branch" },
        ],
      },
    ],
  },
  {
    id: "slash",
    title: "Slash Commands",
    emoji: "⚡",
    subSections: [
      {
        label: "Session",
        items: [
          { key: "/clear", val: "Clear conversation" },
          { key: "/compact [focus]", val: "Compact context" },
          { key: "/resume", val: "Resume / switch session" },
          { key: "/rename [name]", val: "Name current session" },
          { key: "/branch [name]", val: "Branch conversation" },
          { key: "/cost", val: "Token usage stats" },
          { key: "/context", val: "Visualize context (grid)" },
          { key: "/diff", val: "Interactive diff viewer" },
          { key: "/copy", val: "Copy last response" },
          { key: "/export", val: "Export conversation" },
        ],
      },
      {
        label: "Config",
        items: [
          { key: "/config", val: "Open settings" },
          { key: "/model [model]", val: "Switch model" },
          { key: "/fast [on|off]", val: "Toggle fast mode" },
          { key: "/vim", val: "Toggle vim mode" },
          { key: "/theme", val: "Change color theme" },
          { key: "/permissions", val: "View / update permissions" },
          { key: "/effort [level]", val: "Set effort (low/med/high/max/auto)", isNew: true },
          { key: "/color [color]", val: "Set prompt-bar color" },
          { key: "/keybindings", val: "Customize keyboard shortcuts" },
          { key: "/terminal-setup", val: "Configure terminal keybindings" },
        ],
      },
      {
        label: "Tools",
        items: [
          { key: "/init", val: "Create CLAUDE.md" },
          { key: "/memory", val: "Edit CLAUDE.md files" },
          { key: "/mcp", val: "Manage MCP servers" },
          { key: "/hooks", val: "Manage hooks" },
          { key: "/skills", val: "List available skills" },
          { key: "/agents", val: "Manage agents" },
          { key: "/chrome", val: "Chrome integration" },
          { key: "/reload-plugins", val: "Hot-reload plugins" },
          { key: "/add-dir <path>", val: "Add working directory" },
        ],
      },
      {
        label: "Special",
        items: [
          { key: "/btw <question>", val: "Side question (no context)" },
          { key: "/plan [desc]", val: "Plan mode (+ auto-start)" },
          { key: "/loop [interval]", val: "Schedule recurring task" },
          { key: "/voice", val: "Push-to-talk (20 langs)" },
          { key: "/doctor", val: "Diagnose installation" },
          { key: "/pr-comments [PR]", val: "Fetch GitHub PR comments" },
          { key: "/stats", val: "Usage streaks & prefs" },
          { key: "/insights", val: "Analyze sessions report" },
          { key: "/desktop", val: "Continue in Desktop app" },
          { key: "/remote-control", val: "Bridge to claude.ai/code", isNew: true },
          { key: "/usage", val: "Plan limits & rate status" },
          { key: "/schedule", val: "Cloud scheduled tasks" },
          { key: "/security-review", val: "Security analysis of changes" },
          { key: "/help", val: "Show help + commands" },
          { key: "/feedback", val: "Submit feedback" },
          { key: "/release-notes", val: "View full changelog" },
          { key: "/stickers", val: "Order stickers!" },
        ],
      },
    ],
  },
  {
    id: "mcp",
    title: "MCP Servers",
    emoji: "🔌",
    subSections: [
      {
        label: "Transport",
        items: [
          { key: "--transport http", val: "Remote HTTP (recommended)" },
          { key: "--transport stdio", val: "Local process" },
          { key: "--transport sse", val: "Remote SSE" },
        ],
      },
      {
        label: "Scopes",
        items: [
          { key: ".claude.json", val: "Local (per project)" },
          { key: ".mcp.json", val: "Project (shared / VCS)" },
          { key: "~/.claude.json", val: "User (global)" },
        ],
      },
      {
        label: "Manage",
        items: [
          { key: "/mcp", val: "Interactive UI" },
          { key: "claude mcp list", val: "List all servers" },
          { key: "claude mcp serve", val: "CC as MCP server" },
          { key: "Elicitation", val: "Servers request input mid-task", isNew: true },
        ],
      },
    ],
  },
  {
    id: "memory",
    title: "Memory & Files",
    emoji: "📁",
    subSections: [
      {
        label: "CLAUDE.md Locations",
        items: [
          { key: "./CLAUDE.md", val: "Project (team-shared)" },
          { key: "~/.claude/CLAUDE.md", val: "Personal (all projects)" },
          { key: "/etc/claude-code/", val: "Managed (org-wide)" },
        ],
      },
      {
        label: "Rules & Import",
        items: [
          { key: ".claude/rules/*.md", val: "Project rules" },
          { key: "~/.claude/rules/*.md", val: "User rules" },
          { key: "paths: frontmatter", val: "Path-specific rules" },
          { key: "@path/to/file", val: "Import in CLAUDE.md" },
        ],
      },
      {
        label: "Auto Memory",
        items: [
          { key: "~/.claude/projects/…/memory/", val: "MEMORY.md + topic files, auto-loaded" },
        ],
      },
    ],
  },
  {
    id: "skills",
    title: "Skills & Agents",
    emoji: "🔧",
    subSections: [
      {
        label: "Built-in Skills",
        items: [
          { key: "/simplify", val: "Code review (3 parallel agents)" },
          { key: "/batch", val: "Parallel changes (5–30 worktrees)" },
          { key: "/debug [desc]", val: "Troubleshoot from debug log" },
          { key: "/loop [interval]", val: "Recurring scheduled task" },
          { key: "/claude-api", val: "Load API + SDK reference" },
        ],
      },
      {
        label: "Custom Skills",
        items: [
          { key: ".claude/skills/<name>/", val: "Project skills" },
          { key: "~/.claude/skills/<name>/", val: "Personal skills" },
        ],
      },
      {
        label: "Skill Frontmatter",
        items: [
          { key: "description:", val: "Auto-invocation trigger" },
          { key: "allowed-tools:", val: "Skip permission prompts" },
          { key: "model:", val: "Override model" },
          { key: "effort:", val: "Override effort level", isNew: true },
          { key: "context: fork", val: "Run in subagent" },
          { key: "$ARGUMENTS", val: "User input placeholder" },
          { key: "${CLAUDE_SKILL_DIR}", val: "Skill's own directory" },
          { key: "!`cmd`", val: "Dynamic context injection" },
        ],
      },
      {
        label: "Built-in Agents",
        items: [
          { key: "Explore", val: "Fast read-only (Haiku)" },
          { key: "Plan", val: "Research for plan mode" },
          { key: "General", val: "Full tools, complex tasks" },
          { key: "Bash", val: "Terminal separate context" },
        ],
      },
      {
        label: "Agent Frontmatter",
        items: [
          { key: "permissionMode:", val: "default / acceptEdits / plan / bypass" },
          { key: "isolation: worktree", val: "Run in git worktree" },
          { key: "memory: user|project", val: "Persistent memory" },
          { key: "background: true", val: "Background task" },
          { key: "maxTurns:", val: "Limit agentic turns" },
          { key: "SendMessage", val: "Resume agents", isNew: true },
        ],
      },
    ],
  },
  {
    id: "workflows",
    title: "Workflows & Tips",
    emoji: "🧠",
    subSections: [
      {
        label: "Plan Mode",
        items: [
          { key: "⇧Tab", val: "Normal → Auto-Accept → Plan" },
          { key: "--permission-mode plan", val: "Start in plan mode" },
        ],
      },
      {
        label: "Thinking & Effort",
        items: [
          { key: "⌥T", val: "Toggle thinking on/off" },
          { key: '"ultrathink"', val: "Max effort for turn" },
          { key: "Ctrl+O", val: "See thinking (verbose)" },
          { key: "/effort", val: "○ low · ◐ med · ● high", isNew: true },
        ],
      },
      {
        label: "Git Worktrees",
        items: [
          { key: "--worktree name", val: "Isolated branch per feature" },
          { key: "isolation: worktree", val: "Agent in own worktree" },
          { key: "sparsePaths", val: "Checkout only needed dirs", isNew: true },
          { key: "/batch", val: "Auto-creates worktrees" },
        ],
      },
      {
        label: "Voice",
        items: [
          { key: "/voice", val: "Enable push-to-talk" },
          { key: "Space (hold)", val: "Record, release to send" },
          { key: "20 languages", val: "EN, ES, FR, DE, CZ, PL…" },
        ],
      },
      {
        label: "Context",
        items: [
          { key: "/context", val: "Usage + optimization tips" },
          { key: "/compact [focus]", val: "Compress with focus" },
          { key: "Auto-compact", val: "~95% capacity" },
          { key: "1M context", val: "Opus 4.6 (Max/Team/Ent)" },
          { key: "CLAUDE.md", val: "Survives compaction!" },
        ],
      },
      {
        label: "Power Moves",
        items: [
          { key: "claude -c", val: "Continue last conv" },
          { key: 'claude -r "name"', val: "Resume by name" },
          { key: "/btw question", val: "Side Q, no context cost" },
          { key: 'claude -p "query"', val: "Non-interactive / headless" },
          { key: "--output-format json", val: "Structured output" },
          { key: "--max-budget-usd 5", val: "Cost cap" },
          { key: "cat file | claude -p", val: "Pipe input" },
          { key: "/loop 5m msg", val: "Recurring task" },
          { key: "/rc", val: "Remote control" },
          { key: "--remote", val: "Web session on claude.ai" },
        ],
      },
    ],
  },
  {
    id: "cli",
    title: "CLI & Flags",
    emoji: "🖥️",
    subSections: [
      {
        label: "Core",
        items: [
          { key: "claude", val: "Interactive" },
          { key: 'claude "q"', val: "With prompt" },
          { key: 'claude -p "q"', val: "Headless" },
          { key: "claude -c", val: "Continue last" },
          { key: 'claude -r "n"', val: "Resume" },
          { key: "claude update", val: "Update" },
        ],
      },
      {
        label: "Key Flags",
        items: [
          { key: "--model", val: "Set model" },
          { key: "-w", val: "Git worktree" },
          { key: "-n / --name", val: "Session name" },
          { key: "--add-dir", val: "Add dir" },
          { key: "--agent", val: "Use agent" },
          { key: "--allowedTools", val: "Pre-approve" },
          { key: "--output-format", val: "json / stream" },
          { key: "--json-schema", val: "Structured" },
          { key: "--max-turns", val: "Limit turns" },
          { key: "--max-budget-usd", val: "Cost cap" },
          { key: "--console", val: "Auth via Anthropic Console" },
          { key: "--verbose", val: "Verbose" },
          { key: "--bare", val: "Minimal headless (no hooks/LSP)", isNew: true },
          { key: "--channels", val: "Permission relay / MCP push", isNew: true },
          { key: "--remote", val: "Web session" },
          { key: "--effort", val: "low / med / high / max" },
          { key: "--permission-mode", val: "plan / default / …" },
          { key: "--dangerously-skip-permissions", val: "Skip all prompts ⚠️" },
          { key: "--chrome", val: "Chrome" },
        ],
      },
      {
        label: "Permission Modes",
        items: [
          { key: "default", val: "Prompts for everything" },
          { key: "acceptEdits", val: "Auto-accept edits" },
          { key: "plan", val: "Read-only" },
          { key: "dontAsk", val: "Deny unless allowed" },
          { key: "bypassPermissions", val: "Skip all" },
        ],
      },
    ],
  },
  {
    id: "config",
    title: "Config & Env",
    emoji: "⚙️",
    subSections: [
      {
        label: "Config Files",
        items: [
          { key: "~/.claude/settings.json", val: "User settings" },
          { key: ".claude/settings.json", val: "Project (shared)" },
          { key: ".claude/settings.local.json", val: "Local only" },
          { key: "~/.claude.json", val: "OAuth, MCP, state" },
          { key: ".mcp.json", val: "Project MCP servers" },
        ],
      },
      {
        label: "Key Settings",
        items: [
          { key: "modelOverrides", val: "Map model picker → custom IDs" },
          { key: "autoMemoryDirectory", val: "Custom memory dir" },
          { key: "worktree.sparsePaths", val: "Sparse checkout dirs", isNew: true },
        ],
      },
      {
        label: "Environment Variables",
        items: [
          { key: "ANTHROPIC_API_KEY", val: "API key" },
          { key: "ANTHROPIC_MODEL", val: "Default model" },
          { key: "CLAUDE_CODE_EFFORT_LEVEL", val: "low / med / high" },
          { key: "MAX_THINKING_TOKENS", val: "0 = off" },
          { key: "ANTHROPIC_CUSTOM_MODEL_OPTION", val: "Custom /model entry" },
          { key: "CLAUDE_CODE_PLUGIN_SEED_DIR", val: "Plugin seed dirs" },
          { key: "CLAUDECODE", val: "Detect CC shell (=1)" },
          { key: "IS_DEMO", val: "Demo mode (hide email/org)" },
        ],
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hl(text: string, q: string): string {
  if (!q.trim()) return text;
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${esc})`, "gi"),
    '<mark class="bg-yellow-200 text-swiss-black rounded-sm">$1</mark>'
  );
}

function matches(item: Item, q: string): boolean {
  const lower = q.toLowerCase();
  return item.key.toLowerCase().includes(lower) || item.val.toLowerCase().includes(lower);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CheatSheet() {
  const [search, setSearch] = useState("");
  const [activeSections, setActiveSections] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const q = search.trim();

  const toggleSection = (id: string) => {
    setActiveSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalItems = SECTIONS.reduce(
    (a, s) => a + s.subSections.reduce((b, ss) => b + ss.items.length, 0),
    0
  );

  const filteredSections = useMemo(() => {
    let sections = SECTIONS;

    // Filter by active pill toggles
    if (activeSections.size > 0) {
      sections = sections.filter((s) => activeSections.has(s.id));
    }

    // Filter by search query
    if (!q) return sections;
    return sections.map((s) => ({
      ...s,
      subSections: s.subSections
        .map((ss) => ({
          ...ss,
          items: ss.items.filter((i) => matches(i, q)),
        }))
        .filter((ss) => ss.items.length > 0),
    })).filter((s) => s.subSections.length > 0);
  }, [q, activeSections]);

  const matchCount = useMemo(() => {
    return filteredSections.reduce(
      (a, s) => a + s.subSections.reduce((b, ss) => b + ss.items.length, 0),
      0
    );
  }, [filteredSections]);

  return (
    <div>
      {/* Search + nav bar */}
      <div class="sticky top-0 z-10 bg-gray-100 pb-4 -mx-6 px-6 lg:-mx-8 lg:px-8 pt-1 -mt-1">
        <div class="relative mb-3">
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onInput={(e: Event) => setSearch((e.target as HTMLInputElement).value)}
            placeholder='Search… e.g. "/btw", "worktree", "Ctrl+B"'
            class="swiss-input"
            style="padding-left: 2.75rem"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); inputRef.current?.focus(); }}
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-swiss-black"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Section pills — toggle filter */}
        <div class="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {SECTIONS.map((s) => {
            const isActive = activeSections.has(s.id);
            const itemCount = s.subSections.reduce((a, ss) => a + ss.items.length, 0);
            return (
              <button
                key={s.id}
                onClick={() => toggleSection(s.id)}
                class={`whitespace-nowrap text-[11px] font-bold px-2.5 py-1 border-2 border-swiss-black transition-all flex items-center gap-1 flex-shrink-0 ${
                  isActive
                    ? "bg-swiss-black text-white"
                    : "bg-white text-swiss-black hover:bg-gray-100"
                }`}
              >
                <span>{s.emoji}</span>
                <span class="hidden sm:inline">{s.title}</span>
                <span class="sm:hidden">{s.title.split(" ")[0]}</span>
                <span class={`text-[9px] px-1.5 py-0.5 leading-none -mr-0.5 ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {itemCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Count */}
        <div class="flex items-center justify-between mt-2">
          <p class="text-[11px] text-gray-500 font-medium">
            {(q || activeSections.size > 0) ? (
              <><span class="font-black text-swiss-black">{matchCount}</span> of {totalItems} items
              {activeSections.size > 0 && !q && (
                <> · <button onClick={() => setActiveSections(new Set())} class="text-vicert-blue hover:underline">show all</button></>
              )}
              </>
            ) : (
              <><span class="font-black text-swiss-black">{totalItems}</span> items · {SECTIONS.length} sections</>
            )}
          </p>
          <span class="text-[10px] text-gray-400 flex items-center gap-1">
            <span class="bg-green-500 text-white text-[8px] font-bold px-1 py-px leading-none">NEW</span>
            v2.1.81
          </span>
        </div>
      </div>

      {/* Sections — 2 col on desktop */}
      <div class="columns-1 lg:columns-2 gap-4 space-y-4">
        {filteredSections.map((section) => (
          <div
            key={section.id}
            id={`cs-${section.id}`}
            class="break-inside-avoid border-2 border-swiss-black bg-white"
          >
            {/* Section header */}
            <div class="bg-swiss-black text-white px-4 py-2 flex items-center gap-2">
              <span class="text-sm">{section.emoji}</span>
              <span class="font-black text-sm tracking-tight">{section.title}</span>
              <span class="ml-auto text-[10px] text-gray-400 font-medium">
                {section.subSections.reduce((a, ss) => a + ss.items.length, 0)}
              </span>
            </div>

            {/* Sub-sections */}
            {section.subSections.map((sub, si) => (
              <div key={sub.label}>
                {/* Sub label */}
                <div class={`px-3 py-1.5 bg-gray-50 flex items-center ${si > 0 ? "border-t border-gray-200" : ""}`}>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {sub.label}
                  </span>
                </div>

                {/* Items */}
                {sub.items.map((item, i) => (
                  <div
                    key={item.key}
                    class={`flex items-baseline gap-3 px-3 py-1.5 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    } ${i < sub.items.length - 1 ? "" : ""}`}
                  >
                    <span class="flex-shrink-0 w-[45%]">
                      <code
                        class="text-[11px] font-mono font-semibold text-swiss-black"
                        dangerouslySetInnerHTML={{ __html: q ? hl(item.key, q) : item.key }}
                      />
                      {item.isNew && (
                        <span class="bg-green-500 text-white text-[8px] font-bold px-1 py-px ml-1 leading-none inline-block align-middle">
                          NEW
                        </span>
                      )}
                    </span>
                    <span
                      class="text-[11px] text-gray-600 leading-snug"
                      dangerouslySetInnerHTML={{ __html: q ? hl(item.val, q) : item.val }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <div class="border-2 border-gray-200 p-8 text-center mt-4">
          <p class="text-sm text-gray-500 font-medium">
            {q ? `No items matching "${search}"` : "No sections selected"}
          </p>
        </div>
      )}
    </div>
  );
}
