import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import { fetchCatalog, OWNER, REPO } from "../lib/github-catalog";
import type { PluginMeta } from "../lib/github-catalog";

const REPO_OWNER = OWNER;
const REPO_NAME = REPO;
const CLIENT_ID = "Ov23li7vmJRWJ58UhThw";
const OAUTH_PROXY_URL = "https://vicert-oauth-proxy.vicert-claude-marketplace.workers.dev";

interface FileEntry {
  id: string;
  name: string;
  content: string;
}

interface PluginData {
  name: string;
  version: string;
  description: string;
  category: string;
  newCategory: string;
  authorName: string;
  keywords: string;
  license: string;
  skills: FileEntry[];
  agents: FileEntry[];
  commands: FileEntry[];
  extraFiles: FileEntry[];
  readme: string;
}

let _fileId = 0;
function nextId() {
  return `f_${++_fileId}`;
}

function makeFile(name: string, content: string): FileEntry {
  return { id: nextId(), name, content };
}

const SKILL_TEMPLATE = `---
description: Describe what this skill does
disable-model-invocation: true
---

Your skill instructions here.
`;

const AGENT_TEMPLATE = `---
name: agent-name
description: Describe what this agent specializes in
---

Detailed system prompt for the agent.
`;

const COMMAND_TEMPLATE = `---
description: Describe what this command does
disable-model-invocation: true
---

Your command instructions here.
`;

function FormField({ label, hint, required, children }: {
  label: string;
  hint?: string;
  required?: boolean;
  children: any;
}) {
  return (
    <div>
      <label class="swiss-label">
        {label}{required && <span class="text-vicert-blue ml-1">*</span>}
      </label>
      {children}
      {hint && <p class="text-xs text-gray-300 mt-1.5">{hint}</p>}
    </div>
  );
}

function FileListEditor({
  label,
  icon,
  files,
  onChange,
  placeholder,
  nameHelp,
  description,
}: {
  label: string;
  icon: string;
  files: FileEntry[];
  onChange: (files: FileEntry[]) => void;
  placeholder: string;
  nameHelp: string;
  description: string;
}) {
  const addFile = () => {
    onChange([...files, makeFile("", "")]);
  };

  const removeFile = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
  };

  const updateFile = (id: string, field: "name" | "content", value: string) => {
    onChange(files.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  return (
    <div>
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-base">{icon}</span>
          <span class="text-sm font-bold">{label}</span>
          <span class="text-xs text-gray-300 font-medium">({files.length})</span>
        </div>
        <button
          type="button"
          onClick={addFile}
          class="text-xs font-bold text-vicert-blue hover:text-vicert-blue-dark transition-colors flex items-center gap-1"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>

      {files.length === 0 ? (
        <button
          type="button"
          onClick={addFile}
          class="w-full border-2 border-dashed border-gray-200 p-4 text-center hover:border-vicert-blue hover:bg-swiss-cream transition-all group"
        >
          <p class="text-sm text-gray-300 group-hover:text-vicert-blue transition-colors">{description}</p>
        </button>
      ) : (
        <div class="space-y-3">
          {files.map((file, index) => (
            <div key={file.id} class="border border-gray-200 bg-white">
              <div class="flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200">
                <span class="text-[10px] font-bold text-gray-300 uppercase tracking-wider w-5">{String(index + 1).padStart(2, "0")}</span>
                <input
                  type="text"
                  value={file.name}
                  onInput={(e: Event) =>
                    updateFile(file.id, "name", (e.target as HTMLInputElement).value)
                  }
                  placeholder={nameHelp}
                  class="flex-1 bg-transparent text-sm font-medium placeholder-gray-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  class="text-gray-300 hover:text-red-500 transition-colors p-0.5"
                  title="Remove"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <textarea
                value={file.content}
                onInput={(e: Event) =>
                  updateFile(file.id, "content", (e.target as HTMLTextAreaElement).value)
                }
                placeholder={placeholder}
                rows={6}
                class="w-full py-3 px-4 text-sm font-mono placeholder-gray-300 focus:outline-none resize-y"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FolderUploader({ onFilesLoaded }: { onFilesLoaded: (files: Record<string, string>) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFileList = async (items: FileList | File[]) => {
    const result: Record<string, string> = {};
    const fileArray = Array.from(items);

    for (const file of fileArray) {
      const path = (file as any).webkitRelativePath || file.name;
      try {
        const text = await file.text();
        result[path] = text;
      } catch {
        // skip binary files
      }
    }

    if (Object.keys(result).length > 0) onFilesLoaded(result);
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!e.dataTransfer?.files) return;
    await processFileList(e.dataTransfer.files);
  };

  return (
    <div
      class={`border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
        dragOver ? "border-vicert-blue bg-swiss-cream" : "border-gray-200 hover:border-swiss-black hover:bg-gray-100"
      }`}
      onDragOver={(e: DragEvent) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        // @ts-ignore webkitdirectory is valid but not in TS types
        webkitdirectory=""
        class="hidden"
        onChange={(e: Event) => {
          const input = e.target as HTMLInputElement;
          if (input.files) processFileList(input.files);
        }}
      />
      <div>
        <svg class="w-8 h-8 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <p class="text-sm font-bold text-swiss-black mb-1">Drop a plugin folder here</p>
        <p class="text-xs text-gray-300">
          or click to browse — auto-detects skills, agents, commands & plugin.json
        </p>
      </div>
    </div>
  );
}

function SectionHeader({ step, title, description }: { step: string; title: string; description?: string }) {
  return (
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-1">
        <span class="text-xs font-bold text-vicert-blue uppercase tracking-widest">{step}</span>
        <h2 class="text-lg font-black">{title}</h2>
      </div>
      {description && <p class="text-sm text-gray-600">{description}</p>}
    </div>
  );
}

export default function PluginEditor() {
  const oauthReturnRef = useRef<boolean | undefined>(undefined);
  if (oauthReturnRef.current === undefined) {
    oauthReturnRef.current =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("code") &&
      !!sessionStorage.getItem("plugin_editor_data");
  }
  const isOAuthReturn = oauthReturnRef.current;

  const [categories, setCategories] = useState<string[]>([]);
  const [plugins, setPlugins] = useState<PluginMeta[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  const [resolvedSlug] = useState<string | undefined>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("plugin") || undefined;
    }
    return undefined;
  });
  const editSlug = resolvedSlug;

  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("gh_token") : null
  );
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!isOAuthReturn && !!editSlug);
  const isEditing = !!editSlug;

  const [data, setData] = useState<PluginData>(() => {
    const defaults: PluginData = {
      name: "",
      version: "1.0.0",
      description: "",
      category: "",
      newCategory: "",
      authorName: "",
      keywords: "",
      license: "MIT",
      skills: [],
      agents: [],
      commands: [],
      extraFiles: [],
      readme: "",
    };

    if (isOAuthReturn) {
      const saved = sessionStorage.getItem("plugin_editor_data");
      if (saved) {
        try {
          return { ...defaults, ...JSON.parse(saved) };
        } catch {}
      }
    }

    return defaults;
  });

  useEffect(() => {
    fetchCatalog()
      .then((catalog) => {
        const cats = catalog.categories.map((c) => c.name);
        setCategories(cats);
        setPlugins(catalog.plugins);
        setData((prev) => (prev.category ? prev : { ...prev, category: cats[0] || "" }));
      })
      .catch(() => {})
      .finally(() => setCatalogLoading(false));
  }, []);

  const update = useCallback(
    (field: keyof PluginData) => (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      setData((prev) => ({ ...prev, [field]: target.value }));
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    if (!code || !state) return;

    const savedState = sessionStorage.getItem("oauth_state");
    sessionStorage.removeItem("oauth_state");
    sessionStorage.removeItem("plugin_editor_data");

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("code");
    cleanUrl.searchParams.delete("state");
    window.history.replaceState({}, "", cleanUrl.toString());

    if (state !== savedState) {
      setError("OAuth state mismatch. Please try signing in again.");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${OAUTH_PROXY_URL}/api/auth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        if (!res.ok) throw new Error("Token exchange failed");
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        localStorage.setItem("gh_token", result.access_token);
        setToken(result.access_token);
      } catch (err: any) {
        setError(err.message || "Authentication failed");
      }
    })();
  }, []);

  useEffect(() => {
    if (!editSlug || catalogLoading || isOAuthReturn) return;

    const catalogEntry = plugins.find((p) => p.slug === editSlug);
    if (catalogEntry) {
      const authorName =
        catalogEntry.author && typeof catalogEntry.author === "object"
          ? catalogEntry.author.name
          : typeof catalogEntry.author === "string"
            ? catalogEntry.author
            : "";

      setData((prev) => ({
        ...prev,
        name: catalogEntry.name,
        version: catalogEntry.version,
        description: catalogEntry.description,
        category: catalogEntry.category,
        authorName,
        keywords: (catalogEntry.tags || []).join(", "),
      }));
    }

    (async () => {
      try {
        const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/plugins/${editSlug}`;
        const res = await fetch(apiUrl, {
          headers: { Accept: "application/vnd.github.v3+json" },
        });
        if (!res.ok) throw new Error("Failed to fetch plugin files");
        const tree = await res.json();

        const fetchFile = async (path: string): Promise<string> => {
          const r = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
            { headers: { Accept: "application/vnd.github.v3+json" } }
          );
          const data = await r.json();
          if (data.content) return atob(data.content.replace(/\n/g, ""));
          return "";
        };

        const recurse = async (items: any[], basePath: string): Promise<Record<string, string>> => {
          const result: Record<string, string> = {};
          for (const item of items) {
            const relPath = item.path.replace(`plugins/${editSlug}/`, "");
            if (item.type === "file") {
              result[relPath] = await fetchFile(item.path);
            } else if (item.type === "dir") {
              const subRes = await fetch(
                `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${item.path}`,
                { headers: { Accept: "application/vnd.github.v3+json" } }
              );
              const subItems = await subRes.json();
              Object.assign(result, await recurse(subItems, item.path));
            }
          }
          return result;
        };

        const allFiles = await recurse(tree, `plugins/${editSlug}`);
        populateFromFiles(allFiles);
      } catch (e: any) {
        setError(`Failed to load plugin for editing: ${e.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [editSlug, catalogLoading, plugins]);

  const populateFromFiles = useCallback((files: Record<string, string>) => {
    const skills: FileEntry[] = [];
    const agents: FileEntry[] = [];
    const commands: FileEntry[] = [];
    const extras: FileEntry[] = [];
    let readme = "";
    let pluginJson: any = null;

    for (const [path, content] of Object.entries(files)) {
      const normalized = path.replace(/\\/g, "/");
      const parts = normalized.split("/");

      if (normalized === "README.md" || (normalized.endsWith("/README.md") && parts.length === 1)) {
        readme = content;
      } else if (normalized === ".claude-plugin/plugin.json") {
        try {
          pluginJson = JSON.parse(content);
        } catch {}
      } else if (normalized.startsWith("skills/")) {
        const skillPath = normalized.replace("skills/", "");
        const skillParts = skillPath.split("/");
        if (skillParts.length === 2 && skillParts[1] === "SKILL.md") {
          skills.push(makeFile(skillParts[0], content));
        } else {
          extras.push(makeFile(normalized, content));
        }
      } else if (normalized.startsWith("agents/") && normalized.endsWith(".md")) {
        const agentName = normalized.replace("agents/", "").replace(".md", "");
        agents.push(makeFile(agentName, content));
      } else if (normalized.startsWith("commands/") && normalized.endsWith(".md")) {
        const cmdName = normalized.replace("commands/", "").replace(".md", "");
        commands.push(makeFile(cmdName, content));
      } else if (normalized !== ".claude-plugin/plugin.json") {
        extras.push(makeFile(normalized, content));
      }
    }

    setData((prev) => {
      const updated = { ...prev };
      if (skills.length) updated.skills = skills;
      if (agents.length) updated.agents = agents;
      if (commands.length) updated.commands = commands;
      if (extras.length) updated.extraFiles = [...prev.extraFiles, ...extras];
      if (readme) updated.readme = readme;

      if (pluginJson) {
        if (pluginJson.name) updated.name = pluginJson.name;
        if (pluginJson.version) updated.version = pluginJson.version;
        if (pluginJson.description) updated.description = pluginJson.description;
        if (pluginJson.license) updated.license = pluginJson.license;
        if (pluginJson.keywords) updated.keywords = pluginJson.keywords.join(", ");
        if (pluginJson.author?.name) updated.authorName = pluginJson.author.name;
      }

      return updated;
    });
  }, []);

  const handleFolderUpload = useCallback(
    (rawFiles: Record<string, string>) => {
      const stripped: Record<string, string> = {};
      const paths = Object.keys(rawFiles);
      const commonPrefix =
        paths.length > 1
          ? paths.reduce((a, b) => {
              let i = 0;
              while (i < a.length && i < b.length && a[i] === b[i]) i++;
              return a.substring(0, a.lastIndexOf("/", i) + 1);
            })
          : "";

      for (const [path, content] of Object.entries(rawFiles)) {
        stripped[path.replace(commonPrefix, "")] = content;
      }

      populateFromFiles(stripped);
    },
    [populateFromFiles]
  );

  const effectiveCategory = data.category === "__new__" ? data.newCategory : data.category;

  const buildFiles = useCallback(() => {
    const files: Record<string, string> = {};
    const prefix = `plugins/${effectiveCategory}/${data.name}`;

    const pluginJson: any = {
      name: data.name,
      version: data.version,
      description: data.description,
      author: { name: data.authorName || "Anonymous" },
      keywords: data.keywords
        .split(",")
        .map((k: string) => k.trim())
        .filter(Boolean),
      license: data.license || "MIT",
    };

    files[`${prefix}/.claude-plugin/plugin.json`] = JSON.stringify(pluginJson, null, 2) + "\n";

    for (const skill of data.skills) {
      if (skill.content.trim()) {
        const skillName = skill.name.trim() || data.name;
        files[`${prefix}/skills/${skillName}/SKILL.md`] = skill.content;
      }
    }

    for (const agent of data.agents) {
      if (agent.content.trim()) {
        const agentName = agent.name.trim() || "agent";
        files[`${prefix}/agents/${agentName}.md`] = agent.content;
      }
    }

    for (const cmd of data.commands) {
      if (cmd.content.trim()) {
        const cmdName = cmd.name.trim() || "command";
        files[`${prefix}/commands/${cmdName}.md`] = cmd.content;
      }
    }

    for (const extra of data.extraFiles) {
      if (extra.content.trim() && extra.name.trim()) {
        files[`${prefix}/${extra.name}`] = extra.content;
      }
    }

    files[`${prefix}/README.md`] =
      data.readme.trim() ||
      `# ${data.name}\n\n${data.description}\n\n## Install\n\n\`\`\`bash\n/plugin install ${data.name}@vicert-marketplace\n\`\`\`\n`;

    return files;
  }, [data, effectiveCategory]);

  const handleOAuthLogin = useCallback(() => {
    if (!CLIENT_ID || !OAUTH_PROXY_URL) {
      setError(
        "GitHub OAuth is not configured. Please deploy the OAuth proxy and set OAUTH_PROXY_URL, or contribute via GitHub directly."
      );
      return;
    }

    sessionStorage.setItem("plugin_editor_data", JSON.stringify(data));

    const state = crypto.randomUUID();
    sessionStorage.setItem("oauth_state", state);

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("code");
    currentUrl.searchParams.delete("state");
    const redirectUri = currentUrl.toString();

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: redirectUri,
      scope: "public_repo",
      state,
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  }, [data]);

  const handleSubmit = useCallback(async () => {
    if (!token) return;

    setSubmitting(true);
    setError(null);

    try {
      const headers = {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      };

      const userRes = await fetch("https://api.github.com/user", { headers });
      if (!userRes.ok) throw new Error("Failed to fetch GitHub user — is your token valid?");
      const user = await userRes.json();

      const mainRef = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/ref/heads/main`,
        { headers }
      );
      if (!mainRef.ok) throw new Error("Failed to read main branch");
      const mainData = await mainRef.json();
      const baseSha = mainData.object.sha;

      const branchPrefix = isEditing ? "update-plugin" : "add-plugin";
      const branchName = `${branchPrefix}/${user.login}/${data.name}`;

      const branchRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
        }
      );
      if (!branchRes.ok) {
        const existing = await branchRes.json();
        if (existing.message?.includes("Reference already exists")) {
          await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${branchName}`,
            {
              method: "PATCH",
              headers,
              body: JSON.stringify({ sha: baseSha, force: true }),
            }
          );
        } else {
          throw new Error(existing.message || "Failed to create branch");
        }
      }

      const files = buildFiles();

      for (const [path, content] of Object.entries(files)) {
        let sha: string | undefined;
        try {
          const existing = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${branchName}`,
            { headers }
          );
          if (existing.ok) {
            const d = await existing.json();
            sha = d.sha;
          }
        } catch {}

        const body: any = {
          message: `${isEditing ? "Update" : "Add"} plugin: ${data.name}`,
          content: btoa(unescape(encodeURIComponent(content))),
          branch: branchName,
        };
        if (sha) body.sha = sha;

        const putRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
          { method: "PUT", headers, body: JSON.stringify(body) }
        );
        if (!putRes.ok) {
          const err = await putRes.json();
          throw new Error(err.message || `Failed to write ${path}`);
        }
      }

      if (isEditing && editSlug) {
        const oldCategory = editSlug.split("/")[0];
        if (oldCategory !== effectiveCategory) {
          const oldDir = `plugins/${editSlug}`;
          const deleteTree = async (dirPath: string) => {
            const listRes = await fetch(
              `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${dirPath}?ref=${branchName}`,
              { headers }
            );
            if (!listRes.ok) return;
            const items = await listRes.json();
            for (const item of items) {
              if (item.type === "dir") {
                await deleteTree(item.path);
              } else {
                await fetch(
                  `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${item.path}`,
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
        ? `## Plugin Update\n\n**Name:** ${data.name}\n**Version:** ${data.version}\n**Category:** ${effectiveCategory}${categoryChanged ? `\n**Moved from:** ${editSlug!.split("/")[0]}` : ""}\n\n---\n\n*Submitted via the Vicert Marketplace web editor by @${user.login}.*`
        : `## New Plugin Submission\n\n**Name:** ${data.name}\n**Category:** ${effectiveCategory}\n**Description:** ${data.description}\n\n---\n\n*Submitted via the Vicert Marketplace web editor by @${user.login}.*`;

      const prRes = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            title: prTitle,
            body: prBody,
            head: branchName,
            base: "main",
          }),
        }
      );

      const pr = await prRes.json();
      if (pr.html_url) {
        setPrUrl(pr.html_url);
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
    data.skills.some((f) => f.content.trim()) ||
    data.agents.some((f) => f.content.trim()) ||
    data.commands.some((f) => f.content.trim()) ||
    data.extraFiles.some((f) => f.content.trim());

  if (prUrl) {
    return (
      <div class="border border-gray-300 rounded p-10 text-center">
        <div class="w-12 h-12 bg-green-100 mx-auto mb-4 flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-black mb-2">
          Plugin {isEditing ? "Updated" : "Submitted"}
        </h2>
        <p class="text-sm text-gray-600 mb-6">Your pull request has been created and is awaiting review.</p>
        <a
          href={prUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-swiss-black text-white font-bold text-sm py-3 px-8 hover:bg-gray-800 transition-colors"
        >
          View Pull Request
        </a>
      </div>
    );
  }

  if (loading || catalogLoading) {
    return (
      <div class="border border-gray-200 p-10 text-center">
        <p class="text-sm text-gray-600 font-medium">Loading plugin data...</p>
      </div>
    );
  }

  const completionSteps = [
    { done: !!data.name.trim() && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.name), label: "Name" },
    { done: !!data.description.trim(), label: "Description" },
    { done: hasComponents, label: "Components" },
  ];
  const completedCount = completionSteps.filter((s) => s.done).length;

  return (
    <div class="space-y-6">
      {/* Progress indicator */}
      <div class="flex items-center gap-4">
        {completionSteps.map((step, i) => (
          <div key={i} class="flex items-center gap-2">
            <div class={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
              step.done ? "bg-swiss-black text-white" : "border border-gray-200 text-gray-300"
            }`}>
              {step.done ? (
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span class={`text-xs font-bold uppercase tracking-wider ${step.done ? "text-swiss-black" : "text-gray-300"}`}>
              {step.label}
            </span>
            {i < completionSteps.length - 1 && <div class="w-8 h-px bg-gray-200 ml-2" />}
          </div>
        ))}
      </div>

      {isEditing && (
        <div class="flex items-center gap-3 bg-swiss-cream border-2 border-vicert-blue p-4">
          <svg class="w-4 h-4 text-vicert-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm font-medium">
            Editing <strong>{editSlug}</strong> — remember to bump the version.
          </p>
        </div>
      )}

      {error && (
        <div class="flex items-center gap-3 bg-red-50 border-2 border-red-400 p-4">
          <svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      {/* Upload */}
      <FolderUploader onFilesLoaded={handleFolderUpload} />

      {/* Metadata */}
      <div class="border border-gray-300 rounded bg-white p-6">
        <SectionHeader step="01" title="Metadata" description="Basic information about your plugin." />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Plugin Name" required hint="lowercase, kebab-case (e.g. my-plugin)">
            <input
              type="text"
              value={data.name}
              onInput={update("name")}
              placeholder="my-awesome-plugin"
              disabled={isEditing}
              class="swiss-input"
            />
          </FormField>
          <FormField label="Version" required>
            <input type="text" value={data.version} onInput={update("version")} class="swiss-input" />
          </FormField>
          <div class="md:col-span-2">
            <FormField label="Description" required>
              <input
                type="text"
                value={data.description}
                onInput={update("description")}
                placeholder="What does this plugin do?"
                class="swiss-input"
              />
            </FormField>
          </div>
          <FormField label="Category" required>
            <select value={data.category} onChange={update("category")} class="swiss-input">
              {categories.map((c) => (
                <option value={c}>{c}</option>
              ))}
              <option value="__new__">+ New category</option>
            </select>
          </FormField>
          {data.category === "__new__" && (
            <FormField label="New Category" required>
              <input
                type="text"
                value={data.newCategory}
                onInput={update("newCategory")}
                placeholder="my-category"
                class="swiss-input"
              />
            </FormField>
          )}
          <FormField label="Author">
            <input
              type="text"
              value={data.authorName}
              onInput={update("authorName")}
              placeholder="Your name or GitHub username"
              class="swiss-input"
            />
          </FormField>
          <FormField label="Keywords" hint="Comma separated">
            <input
              type="text"
              value={data.keywords}
              onInput={update("keywords")}
              placeholder="git, workflow, productivity"
              class="swiss-input"
            />
          </FormField>
          <FormField label="License">
            <input type="text" value={data.license} onInput={update("license")} class="swiss-input" />
          </FormField>
        </div>
      </div>

      {/* Components */}
      <div class="border border-gray-300 rounded bg-white p-6 space-y-6">
        <SectionHeader step="02" title="Components" description="Add skills, agents, commands, or other files." />

        <FileListEditor
          label="Skills"
          icon="S"
          files={data.skills}
          onChange={(skills) => setData((prev) => ({ ...prev, skills }))}
          placeholder={SKILL_TEMPLATE}
          nameHelp="skill-name"
          description="Click to add a skill (skills/<name>/SKILL.md)"
        />

        <div class="border-t border-gray-200" />

        <FileListEditor
          label="Agents"
          icon="A"
          files={data.agents}
          onChange={(agents) => setData((prev) => ({ ...prev, agents }))}
          placeholder={AGENT_TEMPLATE}
          nameHelp="agent-name"
          description="Click to add an agent (agents/<name>.md)"
        />

        <div class="border-t border-gray-200" />

        <FileListEditor
          label="Commands"
          icon="C"
          files={data.commands}
          onChange={(commands) => setData((prev) => ({ ...prev, commands }))}
          placeholder={COMMAND_TEMPLATE}
          nameHelp="command-name"
          description="Click to add a command (commands/<name>.md)"
        />

        <div class="border-t border-gray-200" />

        <FileListEditor
          label="Other Files"
          icon="F"
          files={data.extraFiles}
          onChange={(extraFiles) => setData((prev) => ({ ...prev, extraFiles }))}
          placeholder="File content..."
          nameHelp="relative/path.ext"
          description="Click to add other files (.mcp.json, hooks, etc.)"
        />
      </div>

      {/* README */}
      <div class="border border-gray-300 rounded bg-white p-6">
        <SectionHeader step="03" title="README" description="Documentation shown on the plugin detail page. Markdown supported." />
        <textarea
          value={data.readme}
          onInput={update("readme")}
          placeholder={`# ${data.name || "my-plugin"}\n\nDescribe your plugin here.\n\n## Usage\n\nExplain how to use it.`}
          rows={10}
          class="swiss-input font-mono text-sm"
        />
      </div>

      {/* Submit */}
      <div class="border border-gray-300 rounded bg-white p-6">
        <SectionHeader step="04" title="Submit" />

        {isMetadataValid && hasComponents ? (
          <div>
            <div class="mb-6">
              <p class="swiss-label">Files to be created</p>
              <div class="bg-swiss-black text-gray-300 p-4 font-mono text-xs max-h-48 overflow-y-auto space-y-0.5">
                {Object.keys(buildFiles()).map((path) => (
                  <div key={path} class="flex items-center gap-2">
                    <span class="text-green-400">+</span>
                    <span>{path}</span>
                  </div>
                ))}
              </div>
            </div>

            {!token ? (
              <div>
                <p class="text-sm text-gray-600 mb-4">
                  Authenticate with GitHub to submit your plugin as a pull request.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <button
                    onClick={handleOAuthLogin}
                    class="bg-swiss-black text-white font-bold text-sm py-3 px-6 hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Sign in with GitHub
                  </button>
                  <span class="text-xs text-gray-300 font-bold uppercase tracking-wider">or</span>
                  <input
                    type="password"
                    placeholder="Paste a personal access token"
                    class="swiss-input flex-1 min-w-0"
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
                  class="bg-vicert-blue text-white font-bold text-sm py-3 px-8 hover:bg-vicert-blue-dark transition-colors disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Submitting..."
                    : isEditing
                      ? "Submit Update"
                      : "Submit Plugin"}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("gh_token");
                    setToken(null);
                  }}
                  class="text-xs text-gray-300 hover:text-swiss-black font-bold transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div class="space-y-2">
            {!data.name.trim() && (
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-gray-300 flex-shrink-0" />
                Plugin name is required
              </p>
            )}
            {data.name.trim() && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.name) && (
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-gray-300 flex-shrink-0" />
                Plugin name must be kebab-case
              </p>
            )}
            {!data.description.trim() && (
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-gray-300 flex-shrink-0" />
                Description is required
              </p>
            )}
            {data.category === "__new__" && !data.newCategory.trim() && (
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-gray-300 flex-shrink-0" />
                New category name is required
              </p>
            )}
            {!hasComponents && (
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-gray-300 flex-shrink-0" />
                At least one component is required
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
