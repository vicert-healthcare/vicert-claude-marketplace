import { useState, useEffect } from "preact/hooks";
import { fetchCatalog, fetchPluginReadme, BASE_PATH } from "../lib/github-catalog";
import type { PluginMeta } from "../lib/github-catalog";
import { marked } from "marked";
import ChangeHistory from "./ChangeHistory";

const REPO_OWNER = "vicert-healthcare";
const REPO_NAME = "vicert-claude-marketplace";

const componentLabels: Record<string, string> = {
  skills: "Skills",
  agents: "Agents",
  commands: "Commands",
  hooks: "Hooks",
  mcp: "MCP Servers",
  lsp: "LSP Servers",
};

function InstallCommand({ pluginName }: { pluginName: string }) {
  const command = `/plugin install ${pluginName}@vicert-marketplace`;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class="bg-swiss-black text-swiss-white p-4 font-mono text-sm group relative">
      <div class="flex items-center justify-between">
        <code>{command}</code>
        <button
          onClick={copy}
          class="text-gray-400 hover:text-white transition-colors p-1"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function PluginDetail() {
  const [plugin, setPlugin] = useState<PluginMeta | null>(null);
  const [readmeHtml, setReadmeHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    if (!slug) {
      setError("No plugin specified");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const [catalog, readme] = await Promise.all([fetchCatalog(), fetchPluginReadme(slug)]);

        const found = catalog.plugins.find((p) => p.slug === slug);
        if (!found) {
          setError("Plugin not found");
          return;
        }

        setPlugin(found);
        if (readme) {
          setReadmeHtml(marked(readme) as string);
        }
      } catch (e: any) {
        setError(e.message || "Failed to load plugin");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div class="text-center py-20">
        <p class="text-gray-600 font-medium">Loading plugin details...</p>
      </div>
    );
  }

  if (error || !plugin) {
    return (
      <div class="text-center py-20">
        <p class="text-vicert-blue-dark font-bold mb-3">{error || "Plugin not found"}</p>
        <a href={BASE_PATH} class="text-vicert-blue hover:text-vicert-blue-dark text-sm font-bold transition-colors">
          Back to marketplace
        </a>
      </div>
    );
  }

  const authorName =
    plugin.author && typeof plugin.author === "object"
      ? plugin.author.name
      : typeof plugin.author === "string"
        ? plugin.author
        : null;

  return (
    <section class="p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav class="mb-8 text-sm text-gray-600 font-medium">
        <a href={BASE_PATH} class="hover:text-swiss-black transition-colors">
          Marketplace
        </a>
        <span class="mx-2">/</span>
        <a
          href={`${BASE_PATH}?category=${plugin.category}`}
          class="hover:text-swiss-black transition-colors capitalize"
        >
          {plugin.category}
        </a>
        <span class="mx-2">/</span>
        <span class="text-swiss-black font-bold">{plugin.name}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main content */}
        <div class="lg:col-span-2">
          <div class="flex items-start justify-between mb-8">
            <div>
              <h1 class="text-3xl sm:text-4xl font-black tracking-tight mb-3">{plugin.name}</h1>
              <p class="text-lg text-gray-600 leading-relaxed">{plugin.description}</p>
            </div>
            <a
              href={`${BASE_PATH}editor?plugin=${plugin.slug}`}
              class="text-sm font-bold text-swiss-black border-2 border-swiss-black hover:bg-gray-100 px-4 py-2 transition-colors whitespace-nowrap ml-4"
            >
              Edit
            </a>
          </div>

          <div class="mb-10">
            <label class="block text-sm font-bold mb-2 uppercase tracking-wider">Install</label>
            <InstallCommand pluginName={plugin.name} />
            <p class="text-xs text-gray-600 mt-3 font-mono">
              First: /plugin marketplace add vicert-healthcare/vicert-claude-marketplace
            </p>
          </div>

          {readmeHtml && (
            <div class="border-t-2 border-swiss-black pt-10">
              <div
                class="markdown-content"
                dangerouslySetInnerHTML={{ __html: readmeHtml }}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside class="space-y-6">
          {/* Details */}
          <div class="bg-swiss-white border-2 border-swiss-black p-6">
            <h3 class="text-sm font-bold uppercase tracking-wider mb-4">Details</h3>
            <dl class="space-y-3 text-sm">
              <div class="flex justify-between">
                <dt class="text-gray-600 font-medium">Version</dt>
                <dd class="font-bold">{plugin.version}</dd>
              </div>
              <div class="border-t-2 border-gray-200" />
              <div class="flex justify-between">
                <dt class="text-gray-600 font-medium">Category</dt>
                <dd>
                  <a
                    href={`${BASE_PATH}?category=${plugin.category}`}
                    class="text-vicert-blue hover:text-vicert-blue-dark font-bold capitalize transition-colors"
                  >
                    {plugin.category}
                  </a>
                </dd>
              </div>
              {authorName && (
                <>
                  <div class="border-t-2 border-gray-200" />
                  <div class="flex justify-between">
                    <dt class="text-gray-600 font-medium">Author</dt>
                    <dd class="font-bold">{authorName}</dd>
                  </div>
                </>
              )}
              {plugin.license && (
                <>
                  <div class="border-t-2 border-gray-200" />
                  <div class="flex justify-between">
                    <dt class="text-gray-600 font-medium">License</dt>
                    <dd class="font-bold">{plugin.license}</dd>
                  </div>
                </>
              )}
            </dl>
          </div>

          {/* Components */}
          {plugin.components.length > 0 && (
            <div class="bg-swiss-white border-2 border-swiss-black p-6">
              <h3 class="text-sm font-bold uppercase tracking-wider mb-4">Components</h3>
              <ul class="space-y-2">
                {plugin.components.map((c) => {
                  const label = componentLabels[c] || c;
                  return (
                    <li key={c} class="flex items-center gap-3 text-sm">
                      <div class="w-2 h-2 bg-swiss-blue" />
                      <span class="font-medium">{label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Tags */}
          {plugin.tags.length > 0 && (
            <div class="bg-swiss-white border-2 border-swiss-black p-6">
              <h3 class="text-sm font-bold uppercase tracking-wider mb-4">Tags</h3>
              <div class="flex flex-wrap gap-2">
                {plugin.tags.map((k) => (
                  <span key={k} class="text-xs font-bold bg-gray-200 text-gray-800 px-3 py-1 uppercase tracking-wider">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Source */}
          <div class="bg-swiss-white border-2 border-swiss-black p-6">
            <h3 class="text-sm font-bold uppercase tracking-wider mb-4">Source</h3>
            <a
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/main/plugins/${plugin.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-vicert-blue hover:text-vicert-blue-dark font-bold transition-colors"
            >
              View on GitHub →
            </a>
          </div>

          {/* Change History */}
          <div class="bg-swiss-white border-2 border-swiss-black p-6">
            <h3 class="text-sm font-bold uppercase tracking-wider mb-4">History</h3>
            <ChangeHistory pluginSlug={plugin.slug} />
          </div>
        </aside>
      </div>
    </section>
  );
}
