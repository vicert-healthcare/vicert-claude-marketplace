import { useState, useEffect } from "preact/hooks";
import { fetchCatalog } from "../lib/github-catalog";
import type { PluginMeta, CatalogData } from "../lib/github-catalog";

const componentIcons: Record<string, string> = {
  skills: "⚡",
  agents: "🤖",
  commands: "⌨️",
  hooks: "🪝",
  mcp: "🔌",
  lsp: "📝",
};

function PluginCard({ plugin }: { plugin: PluginMeta }) {
  return (
    <a
      href={`/plugin/?slug=${plugin.slug}`}
      class="group block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-brand-500/50 hover:bg-gray-900/80 transition-all duration-200"
    >
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-lg font-semibold text-white group-hover:text-brand-400 transition-colors">
          {plugin.name}
        </h3>
        <span class="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">
          v{plugin.version}
        </span>
      </div>

      <p class="text-sm text-gray-400 mb-4 line-clamp-2">{plugin.description}</p>

      {plugin.components.length > 0 && (
        <div class="flex items-center gap-2 mb-3">
          {plugin.components.map((c) => (
            <span key={c} class="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded" title={c}>
              {componentIcons[c] || "📦"} {c}
            </span>
          ))}
        </div>
      )}

      <div class="flex items-center justify-between">
        <span class="text-xs text-brand-400 bg-brand-400/10 px-2 py-0.5 rounded">
          {plugin.category}
        </span>
        <div class="flex gap-1.5">
          {plugin.tags.slice(0, 3).map((k) => (
            <span key={k} class="text-xs text-gray-500">
              #{k}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function PluginBrowser() {
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) setActiveCategory(cat);
    }

    fetchCatalog()
      .then(setCatalog)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    if (typeof window !== "undefined") {
      const url = cat ? `?category=${cat}` : window.location.pathname;
      history.replaceState(null, "", url);
    }
  };

  if (loading) {
    return (
      <div class="text-center py-16">
        <div class="inline-block w-8 h-8 border-2 border-gray-600 border-t-brand-500 rounded-full animate-spin" />
        <p class="text-gray-500 mt-4">Loading plugins from GitHub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div class="text-center py-16">
        <p class="text-red-400 mb-2">Failed to load plugins</p>
        <p class="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!catalog) return null;

  let filtered = catalog.plugins;
  if (activeCategory) filtered = filtered.filter((p) => p.category === activeCategory);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }

  return (
    <div>
      <div class="relative max-w-xl mx-auto mb-10">
        <input
          type="text"
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
          placeholder="Search plugins by name, description, or tags..."
          class="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
        />
        <svg
          class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div class="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => selectCategory("")}
          class={`text-sm px-4 py-2 rounded-lg transition-colors ${
            !activeCategory
              ? "bg-brand-600 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
          }`}
        >
          All
        </button>
        {catalog.categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => selectCategory(cat.name)}
            class={`text-sm px-4 py-2 rounded-lg transition-colors ${
              activeCategory === cat.name
                ? "bg-brand-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
            }`}
          >
            {cat.name}
            <span class="ml-1.5 text-xs opacity-70">{cat.count}</span>
          </button>
        ))}
      </div>

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white">
          {activeCategory ? <span class="capitalize">{activeCategory}</span> : "All Plugins"}
          <span class="text-gray-500 text-base font-normal ml-2">({filtered.length})</span>
        </h2>
        <a
          href="/editor"
          class="text-sm bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Add Plugin
        </a>
      </div>

      {filtered.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((plugin) => (
            <PluginCard key={plugin.slug} plugin={plugin} />
          ))}
        </div>
      ) : (
        <div class="text-center py-16">
          <p class="text-gray-500 text-lg">No plugins match your search.</p>
        </div>
      )}
    </div>
  );
}
