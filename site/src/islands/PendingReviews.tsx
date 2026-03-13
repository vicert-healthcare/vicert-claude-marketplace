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
  if (pr.merged_at) return { text: "Merged", cls: "bg-purple-900/50 text-purple-300" };
  if (pr.state === "closed") return { text: "Closed", cls: "bg-red-900/50 text-red-300" };
  if (pr.draft) return { text: "Draft", cls: "bg-gray-700 text-gray-300" };
  return { text: "Open", cls: "bg-green-900/50 text-green-300" };
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
      <div class="text-center py-12">
        <p class="text-gray-500">Loading pull requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div class="bg-red-900/30 border border-red-800 text-red-300 rounded-lg p-4 text-sm">
        Failed to load pull requests: {error}
      </div>
    );
  }

  return (
    <div>
      <div class="flex gap-2 mb-6">
        {(["open", "closed", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => {
              setLoading(true);
              setFilter(f);
            }}
            class={`text-sm px-4 py-2 rounded-lg transition-colors capitalize ${
              filter === f
                ? "bg-brand-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {prs.length === 0 ? (
        <div class="text-center py-12">
          <p class="text-gray-500">No {filter === "all" ? "" : filter} plugin pull requests found.</p>
        </div>
      ) : (
        <div class="space-y-3">
          {prs.map((pr) => {
            const badge = statusBadge(pr);
            return (
              <a
                key={pr.number}
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                class="block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class={`text-xs px-2 py-0.5 rounded ${badge.cls}`}>{badge.text}</span>
                      <span class="text-xs text-gray-500">#{pr.number}</span>
                    </div>
                    <h3 class="text-white font-medium truncate">{pr.title}</h3>
                    <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span class="flex items-center gap-1">
                        <img
                          src={pr.user.avatar_url}
                          alt=""
                          class="w-4 h-4 rounded-full"
                        />
                        {pr.user.login}
                      </span>
                      <span>opened {timeAgo(pr.created_at)}</span>
                      <span>updated {timeAgo(pr.updated_at)}</span>
                    </div>
                  </div>

                  {pr.labels.length > 0 && (
                    <div class="flex gap-1.5 flex-shrink-0">
                      {pr.labels.map((label) => (
                        <span
                          key={label.name}
                          class="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded"
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
