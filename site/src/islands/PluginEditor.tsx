import { useState, useCallback, useEffect } from "preact/hooks";

const REPO_OWNER = "VicertDev";
const REPO_NAME = "vicert-claude-marketplace";
const CLIENT_ID = ""; // Set your GitHub OAuth App client ID here

interface Props {
  categories: string[];
}

type Step = "auth" | "metadata" | "components" | "preview" | "submitting" | "done";

interface PluginData {
  name: string;
  version: string;
  description: string;
  category: string;
  newCategory: string;
  authorName: string;
  keywords: string;
  license: string;
  skillContent: string;
  agentContent: string;
  commandContent: string;
  readme: string;
}

const DEFAULT_SKILL = `---
description: Describe what this skill does
disable-model-invocation: true
---

Your skill instructions here.
`;

const DEFAULT_AGENT = `---
name: agent-name
description: Describe what this agent specializes in
---

Detailed system prompt for the agent.
`;

const DEFAULT_COMMAND = `---
description: Describe what this command does
disable-model-invocation: true
---

Your command instructions here.
`;

export default function PluginEditor({ categories }: Props) {
  const editSlug =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("plugin")
      : null;
  const isEditing = !!editSlug;

  const [step, setStep] = useState<Step>("metadata");
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("gh_token") : null
  );
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditing);

  const [data, setData] = useState<PluginData>({
    name: "",
    version: "1.0.0",
    description: "",
    category: categories[0] || "",
    newCategory: "",
    authorName: "",
    keywords: "",
    license: "MIT",
    skillContent: "",
    agentContent: "",
    commandContent: "",
    readme: "",
  });

  useEffect(() => {
    if (!editSlug) return;

    const load = async () => {
      try {
        const base = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/plugins/${editSlug}`;

        const [pluginRes, readmeRes, skillRes, agentRes, commandRes] = await Promise.allSettled([
          fetch(`${base}/.claude-plugin/plugin.json`),
          fetch(`${base}/README.md`),
          fetch(`${base}/skills/${editSlug.split("/")[1]}/SKILL.md`),
          fetch(`${base}/agents/${editSlug.split("/")[1]}.md`),
          fetch(`${base}/commands/${editSlug.split("/")[1]}.md`),
        ]);

        const getText = async (r: PromiseSettledResult<Response>) =>
          r.status === "fulfilled" && r.value.ok ? r.value.text() : "";

        const pluginText = await getText(pluginRes);
        const plugin = pluginText ? JSON.parse(pluginText) : {};

        setData({
          name: plugin.name || editSlug.split("/")[1] || "",
          version: plugin.version || "1.0.0",
          description: plugin.description || "",
          category: editSlug.split("/")[0] || categories[0] || "",
          newCategory: "",
          authorName: plugin.author?.name || "",
          keywords: (plugin.keywords || []).join(", "),
          license: plugin.license || "MIT",
          skillContent: await getText(skillRes),
          agentContent: await getText(agentRes),
          commandContent: await getText(commandRes),
          readme: await getText(readmeRes),
        });
      } catch (err: any) {
        setError(`Failed to load plugin: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [editSlug]);

  const update = useCallback(
    (field: keyof PluginData) => (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      setData((prev) => ({ ...prev, [field]: target.value }));
    },
    []
  );

  const effectiveCategory = data.category === "__new__" ? data.newCategory : data.category;

  const buildFiles = useCallback(() => {
    const files: Record<string, string> = {};
    const prefix = `plugins/${effectiveCategory}/${data.name}`;

    const pluginJson = {
      name: data.name,
      version: data.version,
      description: data.description,
      author: { name: data.authorName || "Anonymous" },
      keywords: data.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      license: data.license || "MIT",
    };

    files[`${prefix}/.claude-plugin/plugin.json`] = JSON.stringify(pluginJson, null, 2) + "\n";

    if (data.skillContent.trim()) {
      files[`${prefix}/skills/${data.name}/SKILL.md`] = data.skillContent;
    }

    if (data.agentContent.trim()) {
      files[`${prefix}/agents/${data.name}.md`] = data.agentContent;
    }

    if (data.commandContent.trim()) {
      files[`${prefix}/commands/${data.name}.md`] = data.commandContent;
    }

    files[`${prefix}/README.md`] =
      data.readme.trim() ||
      `# ${data.name}\n\n${data.description}\n\n## Install\n\n\`\`\`bash\n/plugin install ${data.name}@vicert-marketplace\n\`\`\`\n`;

    return files;
  }, [data, effectiveCategory]);

  const handleDeviceFlow = useCallback(async () => {
    if (!CLIENT_ID) {
      setError(
        "GitHub OAuth App not configured. Please set the CLIENT_ID in the editor component, or contribute via GitHub directly."
      );
      return;
    }

    try {
      setError(null);
      const codeRes = await fetch("https://github.com/login/device/code", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          scope: "public_repo",
        }),
      });

      const codeData = await codeRes.json();
      const { device_code, user_code, verification_uri, interval } = codeData;

      window.open(verification_uri, "_blank");
      alert(`Enter this code on GitHub: ${user_code}\n\nA new tab has been opened.`);

      const pollForToken = async (): Promise<string> => {
        while (true) {
          await new Promise((r) => setTimeout(r, (interval || 5) * 1000));

          const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: CLIENT_ID,
              device_code,
              grant_type: "urn:ietf:params:oauth:grant-type:device_code",
            }),
          });

          const tokenData = await tokenRes.json();

          if (tokenData.access_token) return tokenData.access_token;
          if (tokenData.error === "authorization_pending") continue;
          if (tokenData.error === "slow_down") {
            await new Promise((r) => setTimeout(r, 5000));
            continue;
          }

          throw new Error(tokenData.error_description || tokenData.error);
        }
      };

      const accessToken = await pollForToken();
      localStorage.setItem("gh_token", accessToken);
      setToken(accessToken);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!token) {
      setStep("auth");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const headers = {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      };

      const userRes = await fetch("https://api.github.com/user", { headers });
      const user = await userRes.json();

      let forkOwner = user.login;
      try {
        await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/forks`, {
          method: "POST",
          headers,
        });
        await new Promise((r) => setTimeout(r, 3000));
      } catch {
        // fork may already exist
      }

      const mainRef = await fetch(
        `https://api.github.com/repos/${forkOwner}/${REPO_NAME}/git/ref/heads/main`,
        { headers }
      );
      const mainData = await mainRef.json();
      const baseSha = mainData.object.sha;

      const branchPrefix = isEditing ? "update-plugin" : "add-plugin";
      const branchName = `${branchPrefix}/${data.name}`;
      try {
        await fetch(
          `https://api.github.com/repos/${forkOwner}/${REPO_NAME}/git/refs`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              ref: `refs/heads/${branchName}`,
              sha: baseSha,
            }),
          }
        );
      } catch {
        // branch may exist
      }

      const files = buildFiles();

      for (const [path, content] of Object.entries(files)) {
        let sha: string | undefined;
        if (isEditing) {
          try {
            const existing = await fetch(
              `https://api.github.com/repos/${forkOwner}/${REPO_NAME}/contents/${path}?ref=${branchName}`,
              { headers }
            );
            if (existing.ok) {
              const d = await existing.json();
              sha = d.sha;
            }
          } catch {}
        }

        const body: any = {
          message: `${isEditing ? "Update" : "Add"} plugin: ${data.name}`,
          content: btoa(unescape(encodeURIComponent(content))),
          branch: branchName,
        };
        if (sha) body.sha = sha;

        await fetch(
          `https://api.github.com/repos/${forkOwner}/${REPO_NAME}/contents/${path}`,
          { method: "PUT", headers, body: JSON.stringify(body) }
        );
      }

      // If editing and category changed, delete old files to avoid duplicates
      if (isEditing && editSlug) {
        const oldCategory = editSlug.split("/")[0];
        if (oldCategory !== effectiveCategory) {
          const oldDir = `plugins/${editSlug}`;
          const deleteTree = async (dirPath: string) => {
            const listRes = await fetch(
              `https://api.github.com/repos/${forkOwner}/${REPO_NAME}/contents/${dirPath}?ref=${branchName}`,
              { headers }
            );
            if (!listRes.ok) return;
            const items = await listRes.json();
            for (const item of items) {
              if (item.type === "dir") {
                await deleteTree(item.path);
              } else {
                await fetch(
                  `https://api.github.com/repos/${forkOwner}/${REPO_NAME}/contents/${item.path}`,
                  {
                    method: "DELETE",
                    headers,
                    body: JSON.stringify({
                      message: `Move plugin ${data.name}: remove from ${oldCategory}`,
                      sha: item.sha,
                      branch: branchName,
                    }),
                  }
                );
              }
            }
          };
          await deleteTree(oldDir);
        }
      }

      const categoryChanged = isEditing && editSlug && editSlug.split("/")[0] !== effectiveCategory;
      const prTitle = isEditing
        ? categoryChanged
          ? `Move & update plugin: ${data.name} (v${data.version})`
          : `Update plugin: ${data.name} (v${data.version})`
        : `Add plugin: ${data.name}`;
      const prBody = isEditing
        ? `## Plugin Update\n\n**Name:** ${data.name}\n**Version:** ${data.version}\n**Category:** ${effectiveCategory}${categoryChanged ? `\n**Moved from:** ${editSlug!.split("/")[0]}` : ""}\n\n---\n\n*Submitted via the Vicert Marketplace web editor.*`
        : `## New Plugin Submission\n\n**Name:** ${data.name}\n**Category:** ${effectiveCategory}\n**Description:** ${data.description}\n\n---\n\n*Submitted via the Vicert Marketplace web editor.*`;

      const prRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            title: prTitle,
            body: prBody,
            head: `${forkOwner}:${branchName}`,
            base: "main",
          }),
        }
      );

      const pr = await prRes.json();
      if (pr.html_url) {
        setPrUrl(pr.html_url);
        setStep("done");
      } else {
        throw new Error(pr.message || "Failed to create pull request");
      }
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }, [token, data, effectiveCategory, buildFiles, isEditing, editSlug]);

  const isMetadataValid =
    data.name.trim() &&
    /^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.name) &&
    data.description.trim() &&
    (data.category !== "__new__" || data.newCategory.trim());

  const hasComponents =
    data.skillContent.trim() || data.agentContent.trim() || data.commandContent.trim();

  if (loading) {
    return (
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
        <p class="text-gray-400">Loading plugin data...</p>
      </div>
    );
  }

  if (step === "done" && prUrl) {
    return (
      <div class="bg-gray-900 border border-green-800 rounded-xl p-8 text-center">
        <div class="text-4xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-white mb-2">Plugin Submitted!</h2>
        <p class="text-gray-400 mb-6">Your pull request has been created and is awaiting review.</p>
        <a
          href={prUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          View Pull Request →
        </a>
      </div>
    );
  }

  return (
    <div class="space-y-8">
      {isEditing && (
        <div class="bg-blue-900/30 border border-blue-800 text-blue-300 rounded-lg p-4 text-sm">
          Editing <strong>{editSlug}</strong> — remember to bump the version before submitting.
        </div>
      )}

      {error && (
        <div class="bg-red-900/30 border border-red-800 text-red-300 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Metadata */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">1. Plugin Metadata</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-1">Plugin Name *</label>
            <input
              type="text"
              value={data.name}
              onInput={update("name")}
              placeholder="my-awesome-plugin"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
            <p class="text-xs text-gray-500 mt-1">kebab-case only (e.g., my-plugin-name)</p>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Version</label>
            <input
              type="text"
              value={data.version}
              onInput={update("version")}
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm text-gray-400 mb-1">Description *</label>
            <input
              type="text"
              value={data.description}
              onInput={update("description")}
              placeholder="Brief description of what this plugin does"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Category *</label>
            <select
              value={data.category}
              onChange={update("category")}
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            >
              {categories.map((c) => (
                <option value={c}>{c}</option>
              ))}
              <option value="__new__">+ Create new category</option>
            </select>
          </div>
          {data.category === "__new__" && (
            <div>
              <label class="block text-sm text-gray-400 mb-1">New Category Name *</label>
              <input
                type="text"
                value={data.newCategory}
                onInput={update("newCategory")}
                placeholder="my-category"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>
          )}
          <div>
            <label class="block text-sm text-gray-400 mb-1">Author</label>
            <input
              type="text"
              value={data.authorName}
              onInput={update("authorName")}
              placeholder="Your name or GitHub username"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Keywords (comma-separated)</label>
            <input
              type="text"
              value={data.keywords}
              onInput={update("keywords")}
              placeholder="git, workflow, productivity"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">License</label>
            <input
              type="text"
              value={data.license}
              onInput={update("license")}
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Components */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">2. Components</h2>
        <p class="text-sm text-gray-400 mb-4">
          Add at least one component. Leave blank any type you don't need.
        </p>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-1">⚡ Skill (SKILL.md)</label>
            <textarea
              value={data.skillContent}
              onInput={update("skillContent")}
              placeholder={DEFAULT_SKILL}
              rows={8}
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-mono text-sm placeholder-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">🤖 Agent (.md)</label>
            <textarea
              value={data.agentContent}
              onInput={update("agentContent")}
              placeholder={DEFAULT_AGENT}
              rows={6}
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-mono text-sm placeholder-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">⌨️ Command (.md)</label>
            <textarea
              value={data.commandContent}
              onInput={update("commandContent")}
              placeholder={DEFAULT_COMMAND}
              rows={6}
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-mono text-sm placeholder-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Step 3: README */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">3. README</h2>
        <textarea
          value={data.readme}
          onInput={update("readme")}
          placeholder={`# ${data.name || "my-plugin"}\n\nDescribe your plugin here.\n\n## Usage\n\nExplain how to use it.\n\n## Install\n\n\`\`\`bash\n/plugin install ${data.name || "my-plugin"}@vicert-marketplace\n\`\`\``}
          rows={10}
          class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-mono text-sm placeholder-gray-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
        />
      </div>

      {/* Step 4: Preview & Submit */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">4. Preview & Submit</h2>

        {isMetadataValid && hasComponents ? (
          <div>
            <h3 class="text-sm text-gray-400 mb-2">Files that will be created:</h3>
            <ul class="text-sm font-mono text-gray-300 space-y-1 mb-6 bg-gray-800 rounded-lg p-4">
              {Object.keys(buildFiles()).map((path) => (
                <li key={path}>📄 {path}</li>
              ))}
            </ul>

            {!token ? (
              <div class="space-y-3">
                <p class="text-sm text-gray-400">
                  Sign in with GitHub to submit your plugin as a pull request.
                </p>
                <div class="flex gap-3">
                  <button
                    onClick={handleDeviceFlow}
                    class="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-lg transition-colors text-sm font-medium"
                  >
                    Sign in with GitHub
                  </button>
                  <span class="text-gray-500 text-sm self-center">or</span>
                  <input
                    type="password"
                    placeholder="Paste a GitHub token"
                    class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:border-brand-500 outline-none flex-1"
                    onInput={(e: Event) => {
                      const val = (e.target as HTMLInputElement).value;
                      if (val.length > 20) {
                        localStorage.setItem("gh_token", val);
                        setToken(val);
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div class="flex items-center gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  class="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg transition-colors text-sm font-medium"
                >
                  {submitting
                    ? "Submitting..."
                    : isEditing
                      ? "Submit Update (Open PR)"
                      : "Submit Plugin (Open PR)"}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("gh_token");
                    setToken(null);
                  }}
                  class="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div class="text-sm text-gray-500">
            <p>Complete the required fields above to preview your plugin:</p>
            <ul class="mt-2 space-y-1">
              {!data.name.trim() && <li>• Plugin name is required</li>}
              {data.name.trim() && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.name) && (
                <li>• Plugin name must be kebab-case</li>
              )}
              {!data.description.trim() && <li>• Description is required</li>}
              {data.category === "__new__" && !data.newCategory.trim() && (
                <li>• New category name is required</li>
              )}
              {!hasComponents && <li>• At least one component (skill, agent, or command) is required</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
