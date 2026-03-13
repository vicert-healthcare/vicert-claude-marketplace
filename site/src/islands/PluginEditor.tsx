import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import { fetchCatalog, OWNER, REPO } from "../lib/github-catalog";
import type { PluginMeta } from "../lib/github-catalog";

const REPO_OWNER = OWNER;
const REPO_NAME = REPO;
const CLIENT_ID = "Ov23li7vmJRWJ58UhThw";

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

function inputCls() {
  return "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none";
}

function textareaCls() {
  return `${inputCls()} font-mono text-sm placeholder-gray-600`;
}

function btnCls(variant: "brand" | "green" | "gray" | "red" = "brand") {
  const colors: Record<string, string> = {
    brand: "bg-brand-600 hover:bg-brand-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    gray: "bg-gray-700 hover:bg-gray-600 text-gray-200",
    red: "bg-red-900/50 hover:bg-red-900 text-red-300",
  };
  return `${colors[variant]} px-4 py-2 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`;
}

function FileListEditor({
  label,
  icon,
  files,
  onChange,
  placeholder,
  nameHelp,
}: {
  label: string;
  icon: string;
  files: FileEntry[];
  onChange: (files: FileEntry[]) => void;
  placeholder: string;
  nameHelp: string;
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
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <label class="text-sm text-gray-400">
          {icon} {label}
        </label>
        <button type="button" onClick={addFile} class={btnCls("gray")}>
          + Add {label.replace(/s$/, "")}
        </button>
      </div>

      {files.length === 0 && (
        <p class="text-xs text-gray-600 italic">No {label.toLowerCase()} added yet.</p>
      )}

      {files.map((file) => (
        <div key={file.id} class="border border-gray-700 rounded-lg p-3 space-y-2">
          <div class="flex items-center gap-2">
            <input
              type="text"
              value={file.name}
              onInput={(e: Event) =>
                updateFile(file.id, "name", (e.target as HTMLInputElement).value)
              }
              placeholder={nameHelp}
              class="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-white text-sm placeholder-gray-500 focus:border-brand-500 outline-none"
            />
            <button
              type="button"
              onClick={() => removeFile(file.id)}
              class="text-gray-500 hover:text-red-400 transition-colors p-1"
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
            class={textareaCls()}
          />
        </div>
      ))}
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
      class={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
        dragOver ? "border-brand-500 bg-brand-500/5" : "border-gray-700 hover:border-gray-600"
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
      <div class="text-gray-500 text-sm">
        <p class="mb-1">Drag & drop files or a folder here, or click to browse</p>
        <p class="text-xs text-gray-600">
          Upload an entire plugin folder to auto-detect skills, agents, commands, and other files
        </p>
      </div>
    </div>
  );
}

export default function PluginEditor() {
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
  const [loading, setLoading] = useState(!!editSlug);
  const isEditing = !!editSlug;

  const [data, setData] = useState<PluginData>({
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
    if (!editSlug || catalogLoading) return;

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
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: CLIENT_ID, scope: "public_repo" }),
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
            headers: { Accept: "application/json", "Content-Type": "application/json" },
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
      const user = await userRes.json();
      const forkOwner = user.login;

      try {
        await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/forks`, {
          method: "POST",
          headers,
        });
        await new Promise((r) => setTimeout(r, 3000));
      } catch {}

      const mainRef = await fetch(
        `https://api.github.com/repos/${forkOwner}/${REPO_NAME}/git/ref/heads/main`,
        { headers }
      );
      const mainData = await mainRef.json();
      const baseSha = mainData.object.sha;

      const branchPrefix = isEditing ? "update-plugin" : "add-plugin";
      const branchName = `${branchPrefix}/${data.name}`;
      try {
        await fetch(`https://api.github.com/repos/${forkOwner}/${REPO_NAME}/git/refs`, {
          method: "POST",
          headers,
          body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
        });
      } catch {}

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
      <div class="bg-gray-900 border border-green-800 rounded-xl p-8 text-center">
        <div class="text-4xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-white mb-2">
          Plugin {isEditing ? "Updated" : "Submitted"}!
        </h2>
        <p class="text-gray-400 mb-6">Your pull request has been created and is awaiting review.</p>
        <a
          href={prUrl}
          target="_blank"
          rel="noopener noreferrer"
          class={`inline-block ${btnCls("brand")} px-6 py-3`}
        >
          View Pull Request →
        </a>
      </div>
    );
  }

  if (loading || catalogLoading) {
    return (
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
        <p class="text-gray-400">Loading plugin data...</p>
      </div>
    );
  }

  return (
    <div class="space-y-8">
      {isEditing && (
        <div class="bg-blue-900/20 border border-blue-800 text-blue-300 rounded-lg p-4 text-sm">
          Editing <strong>{editSlug}</strong> — remember to bump the version before submitting.
        </div>
      )}

      {error && (
        <div class="bg-red-900/30 border border-red-800 text-red-300 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* Upload */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Upload Plugin Folder</h2>
        <p class="text-sm text-gray-400 mb-4">
          Upload an existing plugin folder to auto-populate all fields, or fill them in manually below.
        </p>
        <FolderUploader onFilesLoaded={handleFolderUpload} />
      </div>

      {/* Metadata */}
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
              disabled={isEditing}
              class={inputCls()}
            />
            <p class="text-xs text-gray-500 mt-1">kebab-case only</p>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Version *</label>
            <input type="text" value={data.version} onInput={update("version")} class={inputCls()} />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm text-gray-400 mb-1">Description *</label>
            <input
              type="text"
              value={data.description}
              onInput={update("description")}
              placeholder="Brief description of what this plugin does"
              class={inputCls()}
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Category *</label>
            <select value={data.category} onChange={update("category")} class={inputCls()}>
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
                class={inputCls()}
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
              class={inputCls()}
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Keywords (comma-separated)</label>
            <input
              type="text"
              value={data.keywords}
              onInput={update("keywords")}
              placeholder="git, workflow, productivity"
              class={inputCls()}
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">License</label>
            <input type="text" value={data.license} onInput={update("license")} class={inputCls()} />
          </div>
        </div>
      </div>

      {/* Components */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
        <h2 class="text-lg font-semibold text-white">2. Components</h2>
        <p class="text-sm text-gray-400">
          Add skills, agents, and commands. Each type supports multiple files.
        </p>

        <FileListEditor
          label="Skills"
          icon="⚡"
          files={data.skills}
          onChange={(skills) => setData((prev) => ({ ...prev, skills }))}
          placeholder={SKILL_TEMPLATE}
          nameHelp="skill-name (becomes skills/<name>/SKILL.md)"
        />

        <FileListEditor
          label="Agents"
          icon="🤖"
          files={data.agents}
          onChange={(agents) => setData((prev) => ({ ...prev, agents }))}
          placeholder={AGENT_TEMPLATE}
          nameHelp="agent-name (becomes agents/<name>.md)"
        />

        <FileListEditor
          label="Commands"
          icon="⌨️"
          files={data.commands}
          onChange={(commands) => setData((prev) => ({ ...prev, commands }))}
          placeholder={COMMAND_TEMPLATE}
          nameHelp="command-name (becomes commands/<name>.md)"
        />

        <FileListEditor
          label="Other Files"
          icon="📁"
          files={data.extraFiles}
          onChange={(extraFiles) => setData((prev) => ({ ...prev, extraFiles }))}
          placeholder="File content..."
          nameHelp="relative path (e.g., .mcp.json, hooks/hooks.json, scripts/run.sh)"
        />
      </div>

      {/* README */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">3. README</h2>
        <textarea
          value={data.readme}
          onInput={update("readme")}
          placeholder={`# ${data.name || "my-plugin"}\n\nDescribe your plugin here.\n\n## Usage\n\nExplain how to use it.\n\n## Install\n\n\`\`\`bash\n/plugin install ${data.name || "my-plugin"}@vicert-marketplace\n\`\`\``}
          rows={10}
          class={textareaCls()}
        />
      </div>

      {/* Preview & Submit */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-white mb-4">4. Preview & Submit</h2>

        {isMetadataValid && hasComponents ? (
          <div>
            <h3 class="text-sm text-gray-400 mb-2">Files that will be created:</h3>
            <ul class="text-sm font-mono text-gray-300 space-y-1 mb-6 bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
              {Object.keys(buildFiles()).map((path) => (
                <li key={path}>📄 {path}</li>
              ))}
            </ul>

            {!token ? (
              <div class="space-y-3">
                <p class="text-sm text-gray-400">
                  Sign in with GitHub to submit your plugin as a pull request.
                </p>
                <div class="flex flex-wrap gap-3">
                  <button onClick={handleDeviceFlow} class={btnCls("brand")}>
                    Sign in with GitHub
                  </button>
                  <span class="text-gray-500 text-sm self-center">or</span>
                  <input
                    type="password"
                    placeholder="Paste a GitHub personal access token"
                    class={`${inputCls()} flex-1 min-w-[200px]`}
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
                <button onClick={handleSubmit} disabled={submitting} class={btnCls("green")}>
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
            <p>Complete the required fields to preview:</p>
            <ul class="mt-2 space-y-1">
              {!data.name.trim() && <li>- Plugin name is required</li>}
              {data.name.trim() && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.name) && (
                <li>- Plugin name must be kebab-case</li>
              )}
              {!data.description.trim() && <li>- Description is required</li>}
              {data.category === "__new__" && !data.newCategory.trim() && (
                <li>- New category name is required</li>
              )}
              {!hasComponents && (
                <li>- At least one component (skill, agent, command, or other file) is required</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
