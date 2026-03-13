import { useState, useEffect } from "preact/hooks";

const REPO_OWNER = "vicert-healthcare";
const REPO_NAME = "vicert-claude-marketplace";

interface Commit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

interface Props {
  pluginSlug: string;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function ChangeHistory({ pluginSlug }: Props) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?path=plugins/${pluginSlug}&per_page=20`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );

        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        const data = await res.json();
        setCommits(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [pluginSlug]);

  if (loading) {
    return <p class="text-xs text-gray-600">Loading history...</p>;
  }

  if (error || commits.length === 0) {
    return null;
  }

  const visibleCommits = expanded ? commits : commits.slice(0, 5);

  return (
    <div>
      <div class="space-y-3">
        {visibleCommits.map((commit) => {
          const firstLine = commit.commit.message.split("\n")[0];
          return (
            <div key={commit.sha} class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-gray-600 mt-1.5 flex-shrink-0" />
              <div class="min-w-0 flex-1">
                <a
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-gray-300 hover:text-white transition-colors block truncate"
                  title={firstLine}
                >
                  {firstLine}
                </a>
                <div class="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                  {commit.author && (
                    <span class="flex items-center gap-1">
                      <img
                        src={commit.author.avatar_url}
                        alt=""
                        class="w-3 h-3 rounded-full"
                      />
                      {commit.author.login}
                    </span>
                  )}
                  <span>{timeAgo(commit.commit.author.date)}</span>
                  <span class="font-mono text-gray-600">{commit.sha.substring(0, 7)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {commits.length > 5 && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          class="mt-3 text-xs text-brand-400 hover:text-brand-300 transition-colors"
        >
          Show {commits.length - 5} more...
        </button>
      )}
    </div>
  );
}
