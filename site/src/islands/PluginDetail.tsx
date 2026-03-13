import { useState, useEffect } from "preact/hooks";
import { fetchCatalog, fetchPluginReadme } from "../lib/github-catalog";
import type { PluginMeta } from "../lib/github-catalog";
import { marked } from "marked";
import ChangeHistory from "./ChangeHistory";

const REPO_OWNER = "vicert-healthcare";
const REPO_NAME = "vicert-claude-marketplace";

const componentLabels: Record<string, { icon: string; label: string }> = {
  skills: { icon: "⚡", label: "Skills" },
  agents: { icon: "🤖", label: "Agents" },
  commands: { icon: "⌨️", label: "Commands" },
  hooks: { icon: "🪝", label: "Hooks" },
  mcp: { icon: "🔌", label: "MCP Servers" },
  lsp: { icon: "📝", label: "LSP Servers" },
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
    <div class="bg-gray-800 rounded-lg p-4 font-mono text-sm group relative">
      <div class="flex items-center justify-between">
        <code class="text-green-400">{command}</code>
        <button
          onClick={copy}
          class="text-gray-500 hover:text-white transition-colors p-1 rounded"
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
      <div class="text-center py-16">
        <div class="inline-block w-8 h-8 border-2 border-gray-600 border-t-brand-500 rounded-full animate-spin" />
        <p class="text-gray-500 mt-4">Loading plugin details...</p>
      </div>
    );
  }

  if (error || !plugin) {
    return (
      <div class="text-center py-16">
        <p class="text-red-400 mb-2">{error || "Plugin not found"}</p>
        <a href="/" class="text-brand-400 hover:text-brand-300 text-sm transition-colors">
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
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav class="mb-8 text-sm text-gray-500">
        <a href="/" class="hover:text-gray-300 transition-colors">
          Marketplace
        </a>
        <span class="mx-2">/</span>
        <a
          href={`/?category=${plugin.category}`}
          class="hover:text-gray-300 transition-colors capitalize"
        >
          {plugin.category}
        </a>
        <span class="mx-2">/</span>
        <span class="text-gray-300">{plugin.name}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h1 class="text-3xl font-bold text-white mb-2">{plugin.name}</h1>
              <p class="text-lg text-gray-400">{plugin.description}</p>
            </div>
            <a
              href={`/editor?plugin=${plugin.slug}`}
              class="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Edit
            </a>
          </div>

          <div class="mb-8">
            <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Install
            </h2>
            <InstallCommand pluginName={plugin.name} />
            <p class="text-xs text-gray-500 mt-2">
              First, add the marketplace:{" "}
              <code class="text-gray-400">
                /plugin marketplace add vicert-healthcare/vicert-claude-marketplace
              </code>
            </p>
          </div>

          {readmeHtml && (
            <div class="border-t border-gray-800 pt-8">
              <div
                class="prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: readmeHtml }}
              />
            </div>
          )}
        </div>

        <aside class="space-y-6">
          <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Details
            </h3>
            <dl class="space-y-3 text-sm">
              <div>
                <dt class="text-gray-500">Version</dt>
                <dd class="text-white font-mono">{plugin.version}</dd>
              </div>
              <div>
                <dt class="text-gray-500">Category</dt>
                <dd>
                  <a
                    href={`/?category=${plugin.category}`}
                    class="text-brand-400 hover:text-brand-300 capitalize transition-colors"
                  >
                    {plugin.category}
                  </a>
                </dd>
              </div>
              {authorName && (
                <div>
                  <dt class="text-gray-500">Author</dt>
                  <dd class="text-white">{authorName}</dd>
                </div>
              )}
              {plugin.license && (
                <div>
                  <dt class="text-gray-500">License</dt>
                  <dd class="text-white">{plugin.license}</dd>
                </div>
              )}
            </dl>
          </div>

          {plugin.components.length > 0 && (
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Components
              </h3>
              <ul class="space-y-2">
                {plugin.components.map((c) => {
                  const info = componentLabels[c] || { icon: "📦", label: c };
                  return (
                    <li key={c} class="flex items-center gap-2 text-sm text-gray-300">
                      <span>{info.icon}</span>
                      <span>{info.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {plugin.tags.length > 0 && (
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Tags
              </h3>
              <div class="flex flex-wrap gap-2">
                {plugin.tags.map((k) => (
                  <span key={k} class="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                    #{k}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Source
            </h3>
            <a
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/main/plugins/${plugin.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-brand-400 hover:text-brand-300 transition-colors"
            >
              View on GitHub →
            </a>
          </div>

          <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Change History
            </h3>
            <ChangeHistory pluginSlug={plugin.slug} />
          </div>
        </aside>
      </div>
    </section>
  );
}
