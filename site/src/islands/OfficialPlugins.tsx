import { useState, useEffect, useMemo } from "preact/hooks";
import { marked } from "marked";

interface PluginComponent {
  commands?: string[];
  agents?: string[];
  skills?: string[];
  hooks?: string[];
  [key: string]: any;
}

interface Plugin {
  name: string;
  dirName: string;
  description: string;
  version?: string;
  readme: string | null;
  pluginJson: PluginComponent | null;
  loading: boolean;
  error: string | null;
  readmeExpanded: boolean;
}

const GITHUB_API_BASE = "https://api.github.com/repos/anthropics/claude-code";
const RAW_BASE =
  "https://raw.githubusercontent.com/anthropics/claude-code/main/plugins";

const COMPONENT_LABELS: Record<string, { label: string; color: string }> = {
  commands: { label: "Commands", color: "swiss-badge-black" },
  agents: { label: "Agents", color: "swiss-badge-blue" },
  skills: { label: "Skills", color: "swiss-badge-cream" },
  hooks: { label: "Hooks", color: "swiss-badge-gray" },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      class="inline-flex items-center gap-1 text-gray-400 hover:text-swiss-black transition-colors flex-shrink-0 p-1"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg class="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

function ComponentBadge({ type, items }: { type: string; items: string[] }) {
  const config = COMPONENT_LABELS[type] || {
    label: type,
    color: "swiss-badge-gray",
  };
  return (
    <span class={`${config.color} flex items-center gap-1`}>
      {config.label}
      <span class="opacity-70 font-normal normal-case tracking-normal">
        ×{items.length}
      </span>
    </span>
  );
}

function PluginCard({
  plugin,
  searchQuery,
  onToggleReadme,
}: {
  plugin: Plugin;
  searchQuery: string;
  onToggleReadme: (dirName: string) => void;
}) {
  const [readmeHtml, setReadmeHtml] = useState("");

  useEffect(() => {
    if (plugin.readme && plugin.readmeExpanded) {
      let html = marked(plugin.readme) as string;
      if (searchQuery.trim()) {
        const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        html = html.replace(
          new RegExp(`(${escaped})`, "gi"),
          `<mark class="bg-yellow-200 text-swiss-black px-0.5">$1</mark>`
        );
      }
      setReadmeHtml(html);
    }
  }, [plugin.readme, plugin.readmeExpanded, searchQuery]);

  const components = plugin.pluginJson
    ? (["commands", "agents", "skills", "hooks"] as const).filter(
        (k) =>
          plugin.pluginJson![k] &&
          Array.isArray(plugin.pluginJson![k]) &&
          plugin.pluginJson![k]!.length > 0
      )
    : [];

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} class="bg-yellow-200 text-swiss-black px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const installCommand = `claude plugin add ${plugin.dirName}`;

  return (
    <article class="border-2 border-swiss-black bg-white hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-shadow">
      {/* Card header */}
      <div class="p-5 border-b-2 border-swiss-black">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="min-w-0">
            <h3 class="font-black text-base tracking-tight truncate">
              {highlightText(plugin.name)}
            </h3>
            <p class="text-[10px] text-gray-400 font-mono mt-0.5">
              {plugin.dirName}
            </p>
          </div>
          {plugin.version && (
            <span class="swiss-badge-gray flex-shrink-0 text-[10px]">
              v{plugin.version}
            </span>
          )}
        </div>

        <p class="text-sm text-gray-600 leading-relaxed">
          {highlightText(plugin.description || "No description available.")}
        </p>
      </div>

      {/* Component badges */}
      {components.length > 0 && (
        <div class="px-5 py-3 border-b-2 border-swiss-black flex flex-wrap gap-2">
          {components.map((type) => (
            <ComponentBadge
              key={type}
              type={type}
              items={plugin.pluginJson![type] as string[]}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div class="px-5 py-3 flex items-center gap-3 bg-gray-50">
        {/* Install command */}
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 border-2 border-swiss-black bg-white px-3 py-2">
            <svg
              class="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <code class="text-xs font-mono text-swiss-black truncate flex-1">
              {installCommand}
            </code>
            <CopyButton text={installCommand} />
          </div>
        </div>

        {/* Expand README */}
        {plugin.readme && (
          <button
            onClick={() => onToggleReadme(plugin.dirName)}
            class={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 border-2 border-swiss-black transition-colors flex-shrink-0 ${
              plugin.readmeExpanded
                ? "bg-swiss-black text-white"
                : "bg-white text-swiss-black hover:bg-gray-100"
            }`}
          >
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            README
          </button>
        )}

        <a
          href={`https://github.com/anthropics/claude-code/tree/main/plugins/${plugin.dirName}`}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-xs font-bold px-3 py-2 border-2 border-swiss-black bg-white text-swiss-black hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>

      {/* README expanded */}
      {plugin.readmeExpanded && readmeHtml && (
        <div class="border-t-2 border-swiss-black px-5 py-4">
          <div
            class="markdown-content text-sm"
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        </div>
      )}

      {plugin.loading && (
        <div class="border-t-2 border-swiss-black px-5 py-3 bg-gray-50">
          <p class="text-xs text-gray-400 font-medium animate-pulse">
            Loading plugin details...
          </p>
        </div>
      )}
    </article>
  );
}

export default function OfficialPlugins() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${GITHUB_API_BASE}/contents/plugins`);
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const items: any[] = await res.json();

        const dirs = items.filter((i) => i.type === "dir");

        const initialPlugins: Plugin[] = dirs.map((d) => ({
          name: d.name
            .split("-")
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          dirName: d.name,
          description: "",
          readme: null,
          pluginJson: null,
          loading: true,
          error: null,
          readmeExpanded: false,
        }));

        setPlugins(initialPlugins);
        setLoading(false);

        // Fetch details for each plugin in parallel (batched)
        const fetchPlugin = async (dirName: string) => {
          const [readmeRes, jsonRes] = await Promise.allSettled([
            fetch(`${RAW_BASE}/${dirName}/README.md`),
            fetch(`${RAW_BASE}/${dirName}/plugin.json`),
          ]);

          let readme: string | null = null;
          let pluginJson: PluginComponent | null = null;

          if (
            readmeRes.status === "fulfilled" &&
            readmeRes.value.ok
          ) {
            readme = await readmeRes.value.text();
          }

          if (
            jsonRes.status === "fulfilled" &&
            jsonRes.value.ok
          ) {
            try {
              pluginJson = await jsonRes.value.json();
            } catch {}
          }

          // Extract description from README or pluginJson
          let description = "";
          if (pluginJson && (pluginJson as any).description) {
            description = (pluginJson as any).description;
          } else if (readme) {
            // First paragraph after the heading
            const lines = readme.split("\n");
            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("!")) {
                description = trimmed;
                break;
              }
            }
          }

          // Extract name from pluginJson if available
          let name = dirName
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          if (pluginJson && (pluginJson as any).name) {
            name = (pluginJson as any).name;
          }

          setPlugins((prev) =>
            prev.map((p) =>
              p.dirName === dirName
                ? {
                    ...p,
                    name,
                    description,
                    readme,
                    pluginJson,
                    loading: false,
                    version: (pluginJson as any)?.version,
                  }
                : p
            )
          );
        };

        // Fetch all in parallel
        await Promise.allSettled(dirs.map((d) => fetchPlugin(d.name)));
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    })();
  }, []);

  const toggleReadme = (dirName: string) => {
    setPlugins((prev) =>
      prev.map((p) =>
        p.dirName === dirName
          ? { ...p, readmeExpanded: !p.readmeExpanded }
          : p
      )
    );
  };

  const FILTERS = ["commands", "agents", "skills", "hooks"];

  const filtered = useMemo(() => {
    let result = plugins;

    if (activeFilter) {
      result = result.filter(
        (p) =>
          p.pluginJson &&
          Array.isArray(p.pluginJson[activeFilter]) &&
          p.pluginJson[activeFilter]!.length > 0
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.dirName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.readme && p.readme.toLowerCase().includes(q))
      );
    }

    return result;
  }, [plugins, search, activeFilter]);

  if (loading) {
    return (
      <div class="border-2 border-gray-200 p-10 text-center">
        <p class="text-sm text-gray-600 font-medium">
          Fetching plugins from GitHub...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div class="border-2 border-red-400 bg-red-50 p-6">
        <p class="text-sm text-red-800 font-bold mb-1">Failed to load plugins</p>
        <p class="text-sm text-red-600">{error}</p>
        <a
          href="https://github.com/anthropics/claude-code/tree/main/plugins"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-vicert-blue hover:underline"
        >
          Browse on GitHub
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Search and filters */}
      <div class="mb-4">
        <div class="relative mb-3">
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
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
            onInput={(e: Event) =>
              setSearch((e.target as HTMLInputElement).value)
            }
            placeholder='Search plugins... e.g. "git", "test", "deploy"'
            class="swiss-input" style="padding-left: 2.75rem"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-swiss-black"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Component type filters */}
        <div class="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(activeFilter === f ? null : f)}
              class={`text-xs font-bold px-3 py-1.5 border-2 transition-colors capitalize ${
                activeFilter === f
                  ? "bg-swiss-black text-white border-swiss-black"
                  : "bg-white text-swiss-black border-swiss-black hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p class="text-xs text-gray-500 mb-5 font-medium">
        {filtered.length === plugins.length
          ? `${plugins.length} official plugins`
          : `${filtered.length} of ${plugins.length} plugins`}
        {plugins.some((p) => p.loading) && (
          <span class="ml-2 text-gray-400">(loading details...)</span>
        )}
      </p>

      {/* Plugin grid */}
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filtered.map((plugin) => (
          <PluginCard
            key={plugin.dirName}
            plugin={plugin}
            searchQuery={search}
            onToggleReadme={toggleReadme}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div class="border-2 border-gray-200 p-8 text-center">
          <p class="text-sm text-gray-500 font-medium">
            No plugins found
            {search ? ` matching "${search}"` : ""}
            {activeFilter ? ` with ${activeFilter}` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
