import { useState, useEffect, useMemo } from "preact/hooks";

interface DocTopic {
  label: string;
  slug: string;
  content: string | null;
  loading: boolean;
  error: string | null;
}

const TOPICS: { label: string; slug: string }[] = [
  { label: "Overview", slug: "overview" },
  { label: "Getting Started", slug: "getting-started" },
  { label: "Skills", slug: "skills" },
  { label: "Agents", slug: "agents" },
  { label: "Commands", slug: "commands" },
  { label: "Hooks", slug: "hooks" },
  { label: "MCP Servers", slug: "mcp-servers" },
  { label: "Plugins", slug: "plugins" },
  { label: "Settings", slug: "settings" },
  { label: "Keybindings", slug: "keybindings" },
  { label: "Memory", slug: "memory" },
];

const DOC_BASE = "https://code.claude.com/docs/en";

function highlightMatch(html: string, query: string): string {
  if (!query.trim()) return html;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return html.replace(
    regex,
    `<mark class="bg-yellow-200 text-swiss-black px-0.5">$1</mark>`
  );
}

export default function ClaudeCodeDocs() {
  const [topics, setTopics] = useState<DocTopic[]>(
    TOPICS.map((t) => ({ ...t, content: null, loading: false, error: null }))
  );
  const [activeSlug, setActiveSlug] = useState<string>(TOPICS[0].slug);
  const [search, setSearch] = useState("");
  const [fetchedSlugs, setFetchedSlugs] = useState<Set<string>>(new Set());

  async function fetchTopic(slug: string) {
    if (fetchedSlugs.has(slug)) return;

    setFetchedSlugs((prev) => new Set([...prev, slug]));
    setTopics((prev) =>
      prev.map((t) => (t.slug === slug ? { ...t, loading: true, error: null } : t))
    );

    try {
      const res = await fetch(`${DOC_BASE}/${slug}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const contentEl =
        doc.querySelector("main article") ||
        doc.querySelector("main .content") ||
        doc.querySelector("main") ||
        doc.querySelector("article") ||
        doc.querySelector(".docs-content") ||
        doc.querySelector(".content");

      const content = contentEl
        ? contentEl.innerHTML
        : `<p class="text-gray-600 italic">Content preview not available. <a class="text-vicert-blue underline" href="${DOC_BASE}/${slug}" target="_blank" rel="noopener noreferrer">View on code.claude.com</a></p>`;

      setTopics((prev) =>
        prev.map((t) =>
          t.slug === slug ? { ...t, content, loading: false } : t
        )
      );
    } catch (e: any) {
      setTopics((prev) =>
        prev.map((t) =>
          t.slug === slug
            ? {
                ...t,
                loading: false,
                error: null,
                content: `<p class="text-gray-600">Documentation for this topic is available at <a class="text-vicert-blue underline font-bold" href="${DOC_BASE}/${slug}" target="_blank" rel="noopener noreferrer">code.claude.com/docs/en/${slug}</a>.</p>`,
              }
            : t
        )
      );
    }
  }

  useEffect(() => {
    fetchTopic(activeSlug);
  }, [activeSlug]);

  useEffect(() => {
    if (search.trim()) {
      TOPICS.forEach((t) => fetchTopic(t.slug));
    }
  }, [search]);

  const activeTopic = topics.find((t) => t.slug === activeSlug);

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return topics.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        (t.content && t.content.toLowerCase().includes(q))
    );
  }, [topics, search]);

  const contentHtml = useMemo(() => {
    if (!activeTopic?.content) return "";
    if (search.trim()) return highlightMatch(activeTopic.content, search);
    return activeTopic.content;
  }, [activeTopic, search]);

  return (
    <div class="flex flex-col">
      {/* Search + Topics bar */}
      <div class="border-b-2 border-swiss-black bg-white p-4 pb-0">
        {/* Search */}
        <div class="relative mb-4">
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10"
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
            placeholder='Search docs... e.g. "hooks", "install", "config"'
            class="swiss-input"
            style="padding-left: 2.5rem"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-swiss-black"
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

        {/* Topic tabs */}
        <div class="flex gap-1 overflow-x-auto pb-0 -mb-[2px]">
          {topics.map((topic) => {
            const isActive = topic.slug === activeSlug;
            const matchesSearch =
              search.trim() &&
              searchResults?.some((r) => r.slug === topic.slug);
            return (
              <button
                key={topic.slug}
                onClick={() => {
                  setActiveSlug(topic.slug);
                  setSearch("");
                }}
                class={`whitespace-nowrap px-3 py-2 text-xs font-bold transition-colors border-2 border-b-0 flex-shrink-0 ${
                  isActive
                    ? "bg-swiss-black text-white border-swiss-black"
                    : matchesSearch
                    ? "bg-vicert-blue/10 text-vicert-blue border-vicert-blue/20 hover:bg-vicert-blue/20"
                    : "text-gray-500 border-transparent hover:text-swiss-black hover:bg-gray-50"
                }`}
              >
                {topic.label}
                {topic.loading && (
                  <span class="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                )}
                {matchesSearch && !isActive && (
                  <span class="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-vicert-blue" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search results summary */}
      {search && searchResults !== null && (
        <div class="border-b-2 border-swiss-black px-5 py-3 bg-gray-50">
          <p class="text-xs font-medium text-gray-600">
            {searchResults.length === 0
              ? `No topics matching "${search}"`
              : `${searchResults.length} topic${searchResults.length === 1 ? "" : "s"} matching "${search}" — click a tab to read it`}
          </p>
        </div>
      )}

      {/* Doc content */}
      <div class="p-6 lg:p-8 bg-white min-h-[500px]">
        {activeTopic?.loading ? (
          <div class="flex flex-col gap-4 animate-pulse">
            <div class="h-8 bg-gray-200 w-1/3" />
            <div class="h-4 bg-gray-100 w-full" />
            <div class="h-4 bg-gray-100 w-5/6" />
            <div class="h-4 bg-gray-100 w-4/6" />
            <div class="h-4 bg-gray-100 w-full mt-4" />
            <div class="h-4 bg-gray-100 w-3/4" />
          </div>
        ) : (
          <>
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-swiss-black">
              <h2 class="text-xl font-black tracking-tight">
                {activeTopic?.label}
              </h2>
              <span class="swiss-badge-black text-[10px]">
                Docs
              </span>
              <a
                href={`${DOC_BASE}/${activeSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                class="ml-auto text-xs font-bold text-vicert-blue hover:text-vicert-blue-dark flex items-center gap-1 transition-colors"
              >
                code.claude.com
                <svg
                  class="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {contentHtml ? (
              <div
                class="markdown-content text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <div class="text-center py-12">
                <p class="text-sm text-gray-500 font-medium mb-4">
                  Loading documentation...
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
