import { useState, useEffect, useMemo } from "preact/hooks";
import { marked } from "marked";

interface ChangelogEntry {
  version: string;
  body: string;
}

const QUICK_FILTERS = [
  { label: "Skills", query: "skill" },
  { label: "Agents", query: "agent" },
  { label: "Hooks", query: "hook" },
  { label: "Commands", query: "command" },
  { label: "MCP", query: "mcp" },
  { label: "Plugins", query: "plugin" },
  { label: "Tools", query: "tool" },
  { label: "Bug Fixes", query: "fix" },
  { label: "SDK", query: "sdk" },
  { label: "VSCode", query: "vscode" },
  { label: "Windows", query: "windows" },
];

const CHANGELOG_URL =
  "https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md";

function parseChangelog(md: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const lines = md.split("\n");
  let current: ChangelogEntry | null = null;
  const bodyLines: string[] = [];

  const flush = () => {
    if (current) {
      current.body = bodyLines.join("\n").trim();
      if (current.body) entries.push(current);
    }
    bodyLines.length = 0;
  };

  for (const line of lines) {
    const match = line.match(/^## (.+)/);
    if (match) {
      flush();
      current = { version: match[1].trim(), body: "" };
    } else if (current) {
      bodyLines.push(line);
    }
  }
  flush();
  return entries;
}

function highlightMatch(html: string, query: string): string {
  if (!query.trim()) return html;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return html.replace(regex, `<mark class="bg-yellow-200 text-swiss-black px-0.5">$1</mark>`);
}

function EntryCard({
  entry,
  defaultOpen,
  searchQuery,
}: {
  entry: ChangelogEntry;
  defaultOpen: boolean;
  searchQuery: string;
}) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const [bodyHtml, setBodyHtml] = useState("");

  useEffect(() => {
    if (entry.body) {
      let html = marked(entry.body) as string;
      if (searchQuery.trim()) {
        html = highlightMatch(html, searchQuery);
      }
      setBodyHtml(html);
    }
  }, [entry.body, searchQuery]);

  useEffect(() => {
    if (searchQuery) setExpanded(true);
  }, [searchQuery]);

  const titleHtml = searchQuery
    ? highlightMatch(entry.version, searchQuery)
    : entry.version;

  const bulletCount = (entry.body.match(/^- /gm) || []).length;

  return (
    <article class="border-2 border-swiss-black bg-white">
      <button
        onClick={() => setExpanded(!expanded)}
        class="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-gray-100 transition-colors"
      >
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span
              class="text-sm font-black"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
            {bulletCount > 0 && (
              <span class="text-[10px] text-gray-600 font-medium">
                {bulletCount} {bulletCount === 1 ? "change" : "changes"}
              </span>
            )}
          </div>
        </div>
        <svg
          class={`w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {expanded && bodyHtml && (
        <div class="border-t-2 border-swiss-black px-5 py-4">
          <div
            class="markdown-content text-sm"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </div>
      )}
    </article>
  );
}

export default function ClaudeCodeNews() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(CHANGELOG_URL);
        if (!res.ok) throw new Error("Failed to fetch changelog");
        const text = await res.text();
        setEntries(parseChangelog(text));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(
      (e) =>
        e.version.toLowerCase().includes(q) ||
        e.body.toLowerCase().includes(q)
    );
  }, [entries, search]);

  const visible = useMemo(
    () => (search ? filtered : filtered.slice(0, visibleCount)),
    [filtered, visibleCount, search]
  );

  if (loading) {
    return (
      <div class="border-2 border-gray-200 p-10 text-center">
        <p class="text-sm text-gray-600 font-medium">Loading changelog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div class="border-2 border-red-400 bg-red-50 p-6 text-center">
        <p class="text-sm text-red-800 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div class="mb-4">
        <div class="relative">
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onInput={(e: Event) => {
              setSearch((e.target as HTMLInputElement).value);
              setVisibleCount(20);
            }}
            placeholder='Search all versions... e.g. "skills", "/btw", "hooks", "plan mode"'
            class="swiss-input" style="padding-left: 2.75rem"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-swiss-black"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Quick filters */}
      <div class="flex flex-wrap gap-2 mb-6">
        {QUICK_FILTERS.map((f) => (
          <button
            key={f.query}
            onClick={() => setSearch(search === f.query ? "" : f.query)}
            class={`text-xs font-bold px-3 py-1.5 border-2 transition-colors ${
              search === f.query
                ? "bg-swiss-black text-white border-swiss-black"
                : "bg-white text-swiss-black border-swiss-black hover:bg-gray-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      {search && (
        <p class="text-xs text-gray-600 mb-4 font-medium">
          {filtered.length} {filtered.length === 1 ? "version" : "versions"}{" "}
          matching "{search}" (out of {entries.length} total)
        </p>
      )}

      {!search && (
        <p class="text-xs text-gray-600 mb-4 font-medium">
          {entries.length} versions — from {entries[entries.length - 1]?.version}{" "}
          to {entries[0]?.version}
        </p>
      )}

      {/* Entry list */}
      <div class="space-y-3">
        {visible.map((entry, i) => (
          <EntryCard
            key={entry.version}
            entry={entry}
            defaultOpen={i === 0 && !search}
            searchQuery={search}
          />
        ))}
      </div>

      {filtered.length === 0 && search && (
        <div class="border-2 border-gray-200 p-8 text-center">
          <p class="text-sm text-gray-600 font-medium">
            No versions found matching "{search}"
          </p>
        </div>
      )}

      {!search && visibleCount < entries.length && (
        <button
          onClick={() => setVisibleCount((c) => c + 20)}
          class="mt-6 w-full border-2 border-swiss-black py-3 text-sm font-bold hover:bg-gray-100 transition-colors"
        >
          Show more ({entries.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}
