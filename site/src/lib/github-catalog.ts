export const OWNER = "vicert-healthcare";
export const REPO = "vicert-claude-marketplace";
const BRANCH = "main";
const RAW_BASE = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}`;

export const BASE_PATH = "/vicert-claude-marketplace/";

export interface PluginMeta {
  name: string;
  slug: string;
  description: string;
  version: string;
  category: string;
  author: { name: string } | null;
  tags: string[];
  license: string;
  components: string[];
}

export interface CatalogData {
  plugins: PluginMeta[];
  categories: { name: string; count: number }[];
}

let catalogPromise: Promise<CatalogData> | null = null;

export function fetchCatalog(): Promise<CatalogData> {
  if (catalogPromise) return catalogPromise;

  catalogPromise = (async () => {
    if (typeof sessionStorage !== "undefined") {
      const cached = sessionStorage.getItem("marketplace_catalog");
      if (cached) {
        try {
          return JSON.parse(cached) as CatalogData;
        } catch {}
      }
    }

    const res = await fetch(`${RAW_BASE}/.claude-plugin/marketplace.json`);
    if (!res.ok) throw new Error("Failed to fetch marketplace data");
    const marketplace = await res.json();

    const plugins: PluginMeta[] = (marketplace.plugins || []).map((p: any) => ({
      name: p.name,
      slug: p.source.replace(/^\.\/plugins\//, ""),
      description: p.description || "",
      version: p.version || "1.0.0",
      category: p.category || "uncategorized",
      author: p.author || null,
      tags: p.tags || [],
      license: p.license || "",
      components: p.components || [],
    }));

    const catMap = new Map<string, number>();
    plugins.forEach((p) => catMap.set(p.category, (catMap.get(p.category) || 0) + 1));
    const categories = Array.from(catMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const data: CatalogData = { plugins, categories };

    if (typeof sessionStorage !== "undefined") {
      try {
        sessionStorage.setItem("marketplace_catalog", JSON.stringify(data));
      } catch {}
    }

    return data;
  })();

  return catalogPromise;
}

export async function fetchPluginReadme(slug: string): Promise<string> {
  try {
    const res = await fetch(`${RAW_BASE}/plugins/${slug}/README.md`);
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

export function clearCache() {
  catalogPromise = null;
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem("marketplace_catalog");
  }
}
