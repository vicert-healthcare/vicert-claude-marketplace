import { useState, useEffect } from "preact/hooks";

const REPO_OWNER = "vicert-healthcare";
const REPO_NAME = "vicert-claude-marketplace";

interface PR {
  number: number;
  title: string;
  html_url: string;
  user: { login: string; avatar_url: string };
  created_at: string;
  updated_at: string;
  labels: { name: string; color: string }[];
  draft: boolean;
  state: string;
  merged_at: string | null;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function statusBadge(pr: PR) {
  if (pr.merged_at) return { text: "Merged", cls: "bg-purple-100 text-purple-800" };
  if (pr.state === "closed") return { text: "Closed", cls: "bg-red-100 text-red-800" };
  if (pr.draft) return { text: "Draft", cls: "bg-gray-200 text-gray-800" };
  return { text: "Open", cls: "bg-green-100 text-green-800" };
}

export default function PendingReviews() {
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"open" | "closed" | "all">("open");

  useEffect(() => {
    (async () => {
      try {
        const state = filter === "all" ? "all" : filter;
        const res = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=${state}&per_page=30&sort=updated&direction=desc`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );

        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

        const data = await res.json();
        const pluginPrs = data.filter((pr: PR) =>
          pr.title.toLowerCase().includes("plugin")
        );
        setPrs(pluginPrs);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [filter]);

  if (loading) {
    return (
      <div class="text-center py-16">
        <p class="text-gray-600 font-medium">Loading pull requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div class="border-2 border-vicert-blue-dark bg-red-50 text-vicert-blue-dark p-4 text-sm font-medium">
        Failed to load pull requests: {error}
      </div>
    );
  }

  return (
    <div>
      {/* Filter tabs */}
      <div class="flex gap-2 mb-8">
        {(["open", "closed", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => {
              setLoading(true);
              setFilter(f);
            }}
            class={`text-sm font-bold py-2 px-5 rounded transition-all duration-200 capitalize ${
              filter === f
                ? "bg-swiss-black text-swiss-white"
                : "bg-swiss-white text-swiss-black border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {prs.length === 0 ? (
        <div class="text-center py-16">
          <p class="text-gray-600 font-medium">No {filter === "all" ? "" : filter} plugin pull requests found.</p>
        </div>
      ) : (
        <div class="space-y-4">
          {prs.map((pr) => {
            const badge = statusBadge(pr);
            return (
              <a
                key={pr.number}
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                class="block bg-swiss-white border border-gray-300 rounded p-5 cursor-pointer transition-all duration-200 hover:shadow-md"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-3 mb-2">
                      <span class={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${badge.cls}`}>
                        {badge.text}
                      </span>
                      <span class="text-xs text-gray-600 font-mono">#{pr.number}</span>
                    </div>
                    <h3 class="text-swiss-black font-bold text-sm">{pr.title}</h3>
                    <div class="flex items-center gap-4 mt-2 text-xs text-gray-600">
                      <span class="flex items-center gap-1.5">
                        <img
                          src={pr.user.avatar_url}
                          alt=""
                          class="w-4 h-4 rounded-full border border-gray-200"
                        />
                        <span class="font-medium">{pr.user.login}</span>
                      </span>
                      <span>opened {timeAgo(pr.created_at)}</span>
                      <span>updated {timeAgo(pr.updated_at)}</span>
                    </div>
                  </div>

                  {pr.labels.length > 0 && (
                    <div class="flex gap-2 flex-shrink-0">
                      {pr.labels.map((label) => (
                        <span
                          key={label.name}
                          class="text-[10px] font-bold uppercase tracking-wider bg-gray-200 text-gray-800 px-2 py-0.5"
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
