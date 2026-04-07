import { useState, useMemo, useRef, useEffect } from "preact/hooks";
import { marked } from "marked";

interface Reply {
  author: string;
  text: string;
}

interface Post {
  slug: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  type: string;
  url: string;
  body: string;
  replies: Reply[];
}

const TYPE_META: Record<string, { label: string; icon: string; color: string }> = {
  post:       { label: "Post",       icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", color: "text-gray-500" },
  link:       { label: "Link",       icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1", color: "text-vicert-blue" },
  tip:        { label: "Tip",        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", color: "text-amber-500" },
  news:       { label: "News",       icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", color: "text-purple-500" },
  tool:       { label: "Tool",       icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", color: "text-green-600" },
  demo:       { label: "Demo",       icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-red-500" },
  discussion: { label: "Discussion", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", color: "text-sky-500" },
  "show-and-tell": { label: "Show & Tell", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", color: "text-orange-500" },
};

// Author avatar images from Slack
const AUTHOR_AVATARS: Record<string, string> = {
  "Igor Stojanovic": "igor-stojanovic.png",
  "Nikola Stojanovic": "nikola-stojanovic.png",
  "Nebojsa Lazic": "nebojsa-lazic.jpg",
  "Bojan Todorovic": "bojan-todorovic.png",
  "Slobodan Dimic": "slobodan-dimic.png",
  "Mihailo Trisovic": "mihailo-trisovic.png",
  "Milos Djakovic": "milos-djakovic.jpg",
  "Maja Bogdanovic": "maja-bogdanovic.png",
  "Voja Lalich": "voja-lalich.png",
  "Dejan Radmanovic": "dejan-radmanovic.png",
  "Nikola Milev": "nikola-milev.png",
  "Nikola Markovic": "nikola-markovic.png",
  "Nemanja Stevanovic": "nemanja-stevanovic.png",
  "Iva Lucic": "iva-lucic.jpg",
  "Iva Danilovic": "iva-danilovic.png",
  "Dejan Nedic": "dejan-nedic.png",
  "Bojan Mirić": "bojan-miric.png",
  "Filip Jankovic": "filip-jankovic.jpg",
  "Marko Jovanovic": "marko-jovanovic.png",
  "Milan Ilic": "milan-ilic.png",
  "Nenad Damnjanović": "nenad-damnjanovic.jpg",
  "Vladimir Petrovic": "vladimir-petrovic.png",
};

// Consistent avatar colors per author (hashed from name) — used as fallback
const AVATAR_COLORS = [
  "bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-amber-600",
  "bg-rose-600", "bg-cyan-600", "bg-indigo-600", "bg-teal-600",
  "bg-orange-600", "bg-pink-600", "bg-sky-600", "bg-lime-600",
  "bg-violet-600", "bg-fuchsia-600", "bg-red-600", "bg-green-600",
  "bg-yellow-600", "bg-slate-600",
];

function getAuthorColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({ name, size = "sm" }: { name: string; size?: "xs" | "sm" | "md" }) {
  const sizeClasses = { xs: "w-5 h-5 text-[8px]", sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-xs" };
  const imgSizes = { xs: 20, sm: 28, md: 36 };
  const avatarFile = AUTHOR_AVATARS[name];

  if (avatarFile) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}avatars/${avatarFile}`}
        alt={name}
        title={name}
        width={imgSizes[size]}
        height={imgSizes[size]}
        class={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0 border border-gray-200`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      class={`${sizeClasses[size]} ${getAuthorColor(name)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 select-none`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    '<mark class="bg-yellow-200/80 text-swiss-black rounded-sm px-0.5">$1</mark>'
  );
}

function TypeIcon({ type, size = 16 }: { type: string; size?: number }) {
  const meta = TYPE_META[type] || TYPE_META.post;
  return (
    <svg
      class={`flex-shrink-0 ${meta.color}`}
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d={meta.icon} />
    </svg>
  );
}

function RepliesSection({ replies }: { replies: Reply[] }) {
  if (replies.length === 0) return null;

  return (
    <div class="mt-3 pt-3 border-t border-gray-100" onClick={(e: MouseEvent) => e.stopPropagation()}>
      <div class="space-y-0">
        {replies.map((reply, i) => (
          <div
            key={i}
            class={`flex gap-2.5 py-2.5 ${i < replies.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div class="flex-shrink-0 pt-0.5">
              <Avatar name={reply.author} size="sm" />
            </div>
            <div class="min-w-0 flex-1">
              <span class="text-[13px] font-bold text-swiss-black">{reply.author}</span>
              <p class="text-[13px] text-gray-700 leading-[1.4] mt-0.5 whitespace-pre-wrap break-words">
                {reply.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post,
  query,
  isExpanded,
  isSelected,
  onToggle,
  onAuthorClick,
  onTagClick,
}: {
  post: Post;
  query: string;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: () => void;
  onAuthorClick: (author: string) => void;
  onTagClick: (tag: string) => void;
}) {
  const meta = TYPE_META[post.type] || TYPE_META.post;

  const bodyHtml = useMemo(() => {
    let html = marked(post.body) as string;
    if (query.trim()) html = highlightText(html, query);
    return html;
  }, [post.body, query]);

  const preview = post.body.replace(/[#*`\[\]>]/g, "").replace(/\(http[^)]+\)/g, "").slice(0, 180);
  const previewHtml = query ? highlightText(preview, query) : preview;

  const dateFormatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const relativeDate = useMemo(() => {
    const now = new Date();
    const d = new Date(post.date);
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  }, [post.date]);

  const handle = post.author.toLowerCase().replace(/\s+/g, ".");

  return (
    <article
      id={`post-${post.slug}`}
      class={`border-b border-gray-200 transition-colors cursor-pointer ${
        isSelected ? "bg-blue-50/50 xl:border-l-2 xl:border-l-vicert-blue" : "hover:bg-gray-50/50"
      }`}
      onClick={onToggle}
    >
      <div class="px-4 pt-3 pb-2.5">
        <div class="flex gap-2.5">
          <div class="flex-shrink-0 w-10">
            <div
              onClick={(e: MouseEvent) => { e.stopPropagation(); onAuthorClick(post.author); }}
              class="hover:opacity-80 transition-opacity cursor-pointer"
              title={`Filter by ${post.author}`}
            >
              <Avatar name={post.author} size="md" />
            </div>
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-baseline gap-1 leading-5">
              <span
                onClick={(e: MouseEvent) => { e.stopPropagation(); onAuthorClick(post.author); }}
                class="text-[15px] font-bold text-swiss-black hover:underline cursor-pointer"
              >
                {post.author}
              </span>
              <span class="text-[15px] text-gray-400 hidden sm:inline">@{handle}</span>
              <span class="text-gray-300">·</span>
              <span class="text-[14px] text-gray-400 flex-shrink-0" title={dateFormatted}>
                {relativeDate}
              </span>
              <span class="text-gray-300">·</span>
              <span class={`text-[12px] font-medium inline-flex items-center gap-1 flex-shrink-0 ${meta.color}`}>
                <TypeIcon type={post.type} size={12} />
                {meta.label}
              </span>
            </div>

            {/* Preview always shown in list; full body only inline on non-xl */}
            {!isExpanded ? (
              <p
                class="text-[15px] text-swiss-black leading-[1.35] mt-0.5 line-clamp-3 whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: previewHtml + (post.body.length > 180 ? "…" : ""),
                }}
              />
            ) : (
              <>
                {/* Inline expand only on < xl screens */}
                <div class="xl:hidden">
                  <div
                    class="markdown-content text-[15px] text-swiss-black leading-[1.35] mt-0.5"
                    dangerouslySetInnerHTML={{ __html: bodyHtml }}
                  />
                  {post.url && (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" onClick={(e: MouseEvent) => e.stopPropagation()}
                      class="block border border-gray-200 rounded-2xl mt-3 overflow-hidden hover:bg-gray-50 transition-colors group/link">
                      <div class="flex items-center">
                        <div class="w-[68px] h-[68px] bg-gray-100 flex items-center justify-center flex-shrink-0 border-r border-gray-200">
                          <svg class="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        <div class="min-w-0 flex-1 px-3 py-2">
                          <p class="text-[12px] text-gray-400">{getDomain(post.url)}</p>
                          <p class="text-[14px] text-swiss-black truncate mt-0.5 group-hover/link:text-vicert-blue">{post.title}</p>
                        </div>
                      </div>
                    </a>
                  )}
                  {post.tags.length > 0 && (
                    <div class="flex items-center gap-1 mt-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span key={tag} onClick={(e: MouseEvent) => { e.stopPropagation(); onTagClick(tag); }} class="text-[13px] text-vicert-blue hover:underline cursor-pointer">#{tag}</span>
                      ))}
                    </div>
                  )}
                  {post.replies.length > 0 && <RepliesSection replies={post.replies} />}
                </div>
                {/* On xl, just show preview (detail in panel) */}
                <p
                  class="hidden xl:block text-[15px] text-swiss-black leading-[1.35] mt-0.5 line-clamp-3 whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: previewHtml + (post.body.length > 180 ? "…" : ""),
                  }}
                />
              </>
            )}

            {/* Tags — always visible */}
            {post.tags.length > 0 && (
              <div class="flex items-center gap-1 mt-1.5 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={(e: MouseEvent) => { e.stopPropagation(); onTagClick(tag); }}
                    class="text-[12px] text-vicert-blue hover:underline cursor-pointer"
                  >#{tag}</span>
                ))}
              </div>
            )}

            {/* Action bar */}
            <div class="flex items-center justify-between mt-1">
              <div class="flex items-center gap-1.5 -ml-1.5 px-1.5 py-1 rounded-full hover:bg-blue-50 transition-colors group/a cursor-pointer">
                <svg class="w-4 h-4 text-gray-400 group-hover/a:text-vicert-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span class={`text-[12px] transition-colors ${post.replies.length > 0 ? "font-semibold text-gray-600" : "text-gray-400"}`}>
                  {post.replies.length > 0 ? post.replies.length : "Replies"}
                </span>
              </div>
              {post.url && (
                <a href={post.url} target="_blank" rel="noopener noreferrer" onClick={(e: MouseEvent) => e.stopPropagation()}
                  class="flex items-center gap-1.5 px-1.5 py-1 rounded-full hover:bg-blue-50 transition-colors group/a">
                  <svg class="w-4 h-4 text-gray-400 group-hover/a:text-vicert-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span class="text-[12px] text-gray-400 group-hover/a:text-vicert-blue transition-colors">Open</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// Detail panel — shown on the right on xl screens (Slack-style thread view)
function DetailPanel({
  post,
  onClose,
  onAuthorClick,
  onTagClick,
}: {
  post: Post;
  onClose: () => void;
  onAuthorClick: (author: string) => void;
  onTagClick: (tag: string) => void;
}) {
  const bodyHtml = useMemo(() => marked(post.body) as string, [post.body]);
  const meta = TYPE_META[post.type] || TYPE_META.post;
  const handle = post.author.toLowerCase().replace(/\s+/g, ".");
  const dateFormatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div class="h-full flex flex-col">
      {/* Panel header */}
      <div class="flex items-center justify-between px-5 py-3 border-b border-gray-200 flex-shrink-0">
        <h3 class="text-[14px] font-bold text-swiss-black">Thread</h3>
        <button onClick={onClose} class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div class="flex-1 overflow-y-auto sidebar-scroll">
        <div class="px-5 py-4">
          {/* Author header */}
          <div class="flex items-center gap-3 mb-3">
            <Avatar name={post.author} size="md" />
            <div>
              <div class="flex items-baseline gap-1.5">
                <span
                  onClick={() => onAuthorClick(post.author)}
                  class="text-[15px] font-bold text-swiss-black hover:underline cursor-pointer"
                >{post.author}</span>
                <span class="text-[13px] text-gray-400">@{handle}</span>
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="text-[12px] text-gray-400">{dateFormatted}</span>
                <span class="text-gray-300">·</span>
                <span class={`text-[12px] font-medium inline-flex items-center gap-1 ${meta.color}`}>
                  <TypeIcon type={post.type} size={12} />
                  {meta.label}
                </span>
              </div>
            </div>
          </div>

          {/* Full body */}
          <div
            class="markdown-content text-[15px] text-swiss-black leading-relaxed"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {/* Link */}
          {post.url && (
            <a href={post.url} target="_blank" rel="noopener noreferrer"
              class="block border border-gray-200 rounded-2xl mt-4 overflow-hidden hover:bg-gray-50 transition-colors group/link">
              <div class="flex items-center">
                <div class="w-[60px] h-[60px] bg-gray-100 flex items-center justify-center flex-shrink-0 border-r border-gray-200">
                  <svg class="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div class="min-w-0 flex-1 px-3 py-2">
                  <p class="text-[12px] text-gray-400">{getDomain(post.url)}</p>
                  <p class="text-[14px] text-swiss-black truncate mt-0.5 group-hover/link:text-vicert-blue">{post.title}</p>
                </div>
              </div>
            </a>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div class="flex items-center gap-1.5 mt-4 flex-wrap">
              {post.tags.map((tag) => (
                <span key={tag} onClick={() => onTagClick(tag)} class="text-[13px] text-vicert-blue hover:underline cursor-pointer">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Replies */}
        {post.replies.length > 0 && (
          <div class="border-t border-gray-200 px-5 py-4">
            <p class="text-[13px] font-bold text-swiss-black mb-3">
              {post.replies.length} {post.replies.length === 1 ? "reply" : "replies"}
            </p>
            <div class="space-y-0">
              {post.replies.map((reply, i) => (
                <div key={i} class={`flex gap-2.5 py-3 ${i < post.replies.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <Avatar name={reply.author} size="sm" />
                  <div class="min-w-0 flex-1">
                    <span class="text-[13px] font-bold text-swiss-black">{reply.author}</span>
                    <p class="text-[13px] text-gray-700 leading-[1.4] mt-0.5 whitespace-pre-wrap break-words">{reply.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogFeed({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [activeType, setActiveType] = useState<string>("");
  const [activeAuthor, setActiveAuthor] = useState<string>("");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const q = search.trim();

  // Collect unique tags with counts
  const tagStats = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => p.tags.forEach((t) => {
      map.set(t, (map.get(t) || 0) + 1);
    }));
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  // Collect unique authors with counts
  const authorStats = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => map.set(p.author, (map.get(p.author) || 0) + 1));
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([author, count]) => ({ author, count }));
  }, [posts]);

  // Collect unique types with counts
  const typeStats = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => map.set(p.type || "post", (map.get(p.type || "post") || 0) + 1));
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }));
  }, [posts]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const setAuthorFilter = (author: string) => {
    setActiveAuthor((prev) => (prev === author ? "" : author));
  };

  const clearFilters = () => {
    setActiveTags(new Set());
    setActiveType("");
    setActiveAuthor("");
    setSearch("");
  };

  const hasFilters = activeTags.size > 0 || activeType || activeAuthor || q;

  const filtered = useMemo(() => {
    let result = posts;

    if (activeType) {
      result = result.filter((p) => (p.type || "post") === activeType);
    }

    if (activeAuthor) {
      result = result.filter((p) => p.author === activeAuthor);
    }

    if (activeTags.size > 0) {
      result = result.filter((p) => p.tags.some((t) => activeTags.has(t)));
    }

    if (q) {
      const lower = q.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.body.toLowerCase().includes(lower) ||
          p.author.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower)) ||
          (p.url && p.url.toLowerCase().includes(lower))
      );
    }

    return result;
  }, [posts, activeTags, activeType, activeAuthor, q]);

  const visibleTags = showAllTags ? tagStats : tagStats.slice(0, 12);

  const selectedPost = expandedSlug ? filtered.find((p) => p.slug === expandedSlug) || posts.find((p) => p.slug === expandedSlug) : null;

  const [showGoTop, setShowGoTop] = useState(false);
  useEffect(() => {
    // The scroll container is <main> (parent with overflow-y-auto)
    const main = document.querySelector("main");
    if (!main) return;
    const onScroll = () => setShowGoTop(main.scrollTop > 600);
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const main = document.querySelector("main");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
    <div class="max-w-2xl">
      {/* Search bar */}
      <div class="relative">
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={searchRef}
          type="text"
          value={search}
          onInput={(e: Event) => setSearch((e.target as HTMLInputElement).value)}
          placeholder="Search posts..."
          class="w-full text-[14px] bg-gray-50 border border-gray-200 rounded-full py-2 pl-9 pr-9 text-swiss-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-swiss-black"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tab bar */}
      <div class="flex flex-wrap items-center border-b border-gray-200 mt-3">
        <button
          onClick={() => setActiveType("")}
          class={`relative text-[13px] font-semibold px-4 py-3 whitespace-nowrap transition-colors ${
            !activeType ? "text-swiss-black" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          All
          {!activeType && <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-vicert-blue rounded-full" />}
        </button>
        {typeStats.map(({ type, count }) => {
          const m = TYPE_META[type] || TYPE_META.post;
          const isActive = activeType === type;
          return (
            <button
              key={type}
              onClick={() => setActiveType(isActive ? "" : type)}
              class={`relative text-[13px] font-semibold px-4 py-3 whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                isActive ? "text-swiss-black" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <TypeIcon type={type} size={14} />
              {m.label}
              <span class="text-[11px] text-gray-400">{count}</span>
              {isActive && <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-vicert-blue rounded-full" />}
            </button>
          );
        })}
      </div>

      {/* Author avatars row */}
      <div class="flex flex-wrap items-center gap-1.5 py-3">
        {authorStats.map(({ author }) => {
          const isActive = activeAuthor === author;
          return (
            <button
              key={author}
              onClick={() => setAuthorFilter(author)}
              class={`flex-shrink-0 rounded-full transition-all ${
                isActive
                  ? "ring-2 ring-vicert-blue ring-offset-1"
                  : "opacity-60 hover:opacity-100"
              }`}
              title={`${author}`}
            >
              <Avatar name={author} size="sm" />
            </button>
          );
        })}
        {activeAuthor && (
          <button
            onClick={() => setActiveAuthor("")}
            class="flex-shrink-0 ml-1 text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1"
          >
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {activeAuthor.split(" ")[0]}
          </button>
        )}
      </div>

      {/* Tags — compact inline row, only show when tags exist */}
      {tagStats.length > 0 && (
        <div class="flex flex-wrap items-center gap-1.5 pb-3">
          {visibleTags.map(({ tag }) => {
            const isActive = activeTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                class={`flex-shrink-0 text-[11px] px-2.5 py-0.5 rounded-full transition-all ${
                  isActive
                    ? "bg-vicert-blue text-white font-semibold"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 font-medium"
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {tagStats.length > 12 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              class="flex-shrink-0 text-[11px] text-gray-400 hover:text-gray-600 ml-0.5"
            >
              {showAllTags ? "less" : `+${tagStats.length - 12}`}
            </button>
          )}
        </div>
      )}

      {/* Active filters / results summary */}
      {hasFilters && (
        <div class="flex items-center justify-between pb-2">
          <p class="text-[12px] text-gray-500">
            {filtered.length} of {posts.length} posts
          </p>
          <button
            onClick={clearFilters}
            class="text-[12px] text-vicert-blue hover:underline font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Post cards */}
      <div class="border-t border-gray-200">
        {filtered.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            query={q}
            isExpanded={expandedSlug === post.slug}
            isSelected={expandedSlug === post.slug}
            onToggle={() =>
              setExpandedSlug(expandedSlug === post.slug ? null : post.slug)
            }
            onAuthorClick={setAuthorFilter}
            onTagClick={toggleTag}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div class="border border-gray-200 rounded p-10 text-center">
          <p class="text-sm text-gray-500 font-medium mb-2">
            {q ? `No posts matching "${search}"` : "No posts match the current filters"}
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              class="text-xs font-bold text-vicert-blue hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>

    {/* Detail panel — fixed overlay, slides in from right */}
    <div
      class={`hidden xl:block fixed top-14 right-0 bottom-0 w-[560px] bg-white border-l border-gray-200 shadow-[-4px_0_24px_rgba(0,0,0,0.08)] z-30 transition-transform duration-300 ease-out ${
        selectedPost ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
      {selectedPost && (
        <DetailPanel
          post={selectedPost}
          onClose={() => setExpandedSlug(null)}
          onAuthorClick={setAuthorFilter}
          onTagClick={toggleTag}
        />
      )}
    </div>

    {/* Go to top button */}
    <button
      onClick={scrollToTop}
      class={`fixed bottom-6 right-6 lg:bottom-8 lg:right-8 w-10 h-10 bg-swiss-black text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-700 z-40 ${
        showGoTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } ${selectedPost ? "xl:right-[580px]" : ""}`}
      aria-label="Go to top"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
    </div>
  );
}
