import { useState, useEffect } from "preact/hooks";
import { fetchCatalog, BASE_PATH } from "../lib/github-catalog";
import type { PluginMeta, CatalogData } from "../lib/github-catalog";

const componentLabels: Record<string, string> = {
  skills: "Skills",
  agents: "Agents",
  commands: "Commands",
  hooks: "Hooks",
  mcp: "MCP",
  lsp: "LSP",
};

function PluginCard({ plugin }: { plugin: PluginMeta }) {
  return (
    <a
      href={`${BASE_PATH}plugin/?slug=${plugin.slug}`}
      class="group block bg-swiss-white border-2 border-swiss-black p-6 cursor-pointer transition-shadow duration-200 hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
    >
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-lg font-bold text-swiss-black group-hover:text-vicert-blue transition-colors leading-tight">
          {plugin.name}
        </h3>
        <span class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 ml-3 flex-shrink-0">
          v{plugin.version}
        </span>
      </div>

      <p class="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{plugin.description}</p>

      {plugin.components.length > 0 && (
        <div class="flex items-center gap-2 mb-4">
          {plugin.components.map((c) => (
            <span key={c} class="text-[10px] font-bold uppercase tracking-wider text-gray-800 bg-gray-200 px-2 py-0.5">
              {componentLabels[c] || c}
            </span>
          ))}
        </div>
      )}

      <div class="flex items-center justify-between pt-4 border-t-2 border-gray-200">
        <span class="text-xs font-bold uppercase tracking-wider text-swiss-blue">
          {plugin.category}
        </span>
        <div class="flex gap-2">
          {plugin.tags.slice(0, 3).map((k) => (
            <span key={k} class="text-xs text-gray-600">
              {k}
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
      <div class="text-center py-20">
        <p class="text-gray-600 font-medium">Loading plugins...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div class="text-center py-20">
        <p class="text-vicert-blue-dark font-bold mb-2">Failed to load plugins</p>
        <p class="text-gray-600 text-sm">{error}</p>
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
      {/* Search */}
      <div class="relative max-w-xl mb-10">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
          placeholder="Search plugins..."
          class="w-full border-2 border-swiss-black py-3 pl-12 pr-4 bg-swiss-white text-swiss-black font-medium focus:outline-none focus:ring-2 focus:ring-vicert-blue"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            class="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <svg class="w-5 h-5 text-gray-600 hover:text-swiss-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Categories */}
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => selectCategory("")}
          class={`text-sm font-bold py-2 px-5 transition-all duration-200 ${
            !activeCategory
              ? "bg-swiss-black text-swiss-white"
              : "bg-swiss-white text-swiss-black border-2 border-swiss-black hover:bg-gray-100"
          }`}
        >
          All
        </button>
        {catalog.categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => selectCategory(cat.name)}
            class={`text-sm font-bold py-2 px-5 transition-all duration-200 capitalize ${
              activeCategory === cat.name
                ? "bg-swiss-black text-swiss-white"
                : "bg-swiss-white text-swiss-black border-2 border-swiss-black hover:bg-gray-100"
            }`}
          >
            {cat.name}
            <span class="ml-1.5 opacity-50">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Header */}
      <div class="flex items-center justify-between mb-8 pb-4 border-b-2 border-swiss-black">
        <div class="flex items-baseline gap-3">
          <h2 class="text-2xl font-black">
            {activeCategory ? <span class="capitalize">{activeCategory}</span> : "All Plugins"}
          </h2>
          <span class="text-sm text-gray-600 font-bold">{filtered.length} plugins</span>
        </div>
        <a
          href={`${BASE_PATH}editor`}
          class="text-sm font-bold bg-swiss-blue text-white py-2.5 px-6 hover:bg-swiss-blue-dark transition-colors hidden sm:inline-block"
        >
          Submit Plugin
        </a>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((plugin) => (
            <PluginCard key={plugin.slug} plugin={plugin} />
          ))}
        </div>
      ) : (
        <div class="text-center py-20">
          <p class="text-gray-600 font-medium">No plugins match your search.</p>
        </div>
      )}
    </div>
  );
}
