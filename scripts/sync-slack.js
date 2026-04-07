#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const POSTS_DIR = join(ROOT, 'site', 'src', 'content', 'posts');

// --- Environment loading ---
// Supports both .env file (local dev) and process.env (CI)

function loadEnv() {
  const envPath = join(ROOT, '.env');
  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

loadEnv();
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CHANNEL_NAME = process.env.SLACK_CHANNEL_NAME || 'gen-ai';

if (!SLACK_BOT_TOKEN) {
  console.error('Error: SLACK_BOT_TOKEN must be set (via .env or environment variable)');
  process.exit(1);
}

// --- Slack API helpers ---

async function slackApi(method, params = {}) {
  const url = new URL(`https://slack.com/api/${method}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) url.searchParams.set(k, String(v));
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}` },
  });
  const data = await res.json();
  if (!data.ok) {
    throw new Error(`Slack API ${method} failed: ${data.error}`);
  }
  return data;
}

async function findChannelId(name) {
  const cleanName = name.replace(/^#/, '');
  let cursor;
  while (true) {
    const data = await slackApi('conversations.list', {
      types: 'public_channel',
      limit: 200,
      cursor,
    });
    const channel = data.channels.find((c) => c.name === cleanName);
    if (channel) return channel.id;
    cursor = data.response_metadata?.next_cursor;
    if (!cursor) break;
  }
  throw new Error(`Channel "${cleanName}" not found`);
}

async function fetchAllMessages(channelId) {
  const messages = [];
  let cursor;
  while (true) {
    const data = await slackApi('conversations.history', {
      channel: channelId,
      limit: 200,
      cursor,
    });
    messages.push(...data.messages);
    cursor = data.response_metadata?.next_cursor;
    if (!cursor) break;
  }
  return messages;
}

async function fetchReplies(channelId, threadTs) {
  const replies = [];
  let cursor;
  while (true) {
    const data = await slackApi('conversations.replies', {
      channel: channelId,
      ts: threadTs,
      limit: 200,
      cursor,
    });
    // First message is the parent; skip it
    const threadReplies = data.messages.slice(1);
    replies.push(...threadReplies);
    cursor = data.response_metadata?.next_cursor;
    if (!cursor) break;
  }
  return replies;
}

async function fetchUsers() {
  const users = {};
  let cursor;
  while (true) {
    const data = await slackApi('users.list', { limit: 200, cursor });
    for (const u of data.members) {
      users[u.id] = u.real_name || u.profile?.real_name || u.name;
    }
    cursor = data.response_metadata?.next_cursor;
    if (!cursor) break;
  }
  return users;
}

// --- Emoji map ---

const EMOJI_MAP = {
  '+1': '👍', '-1': '👎', '100': '💯',
  'arrow_down': '⬇️', 'beers': '🍻', 'blush': '😊',
  'brain': '🧠', 'bulb': '💡', 'classical_building': '🏛️',
  'computer': '💻', 'cry': '😢', 'dodo': '🦤',
  'exploding_head': '🤯', 'eyes': '👀', 'fire': '🔥',
  'fist': '✊', 'gear': '⚙️', 'grimacing': '😬',
  'hatched_chick': '🐥', 'hatching_chick': '🐣',
  'heart': '❤️', 'heart_hands': '🫶', 'hospital': '🏥',
  'joy': '😂', 'ladybug': '🐞', 'laughing': '😆',
  'link': '🔗', 'mag': '🔍', 'microscope': '🔬',
  'moneybag': '💰', 'movie_camera': '🎥', 'muscle': '💪',
  'neutral_face': '😐', 'point_right': '👉', 'popcorn': '🍿',
  'pray': '🙏', 'raised_hands': '🙌', 'robot_face': '🤖',
  'rocket': '🚀', 'scientist': '🧑‍🔬', 'seedling': '🌱',
  'shrug': '🤷', 'smile': '😄', 'smiley': '😃',
  'slightly_smiling_face': '🙂', 'smiley_cat': '😺',
  'smiling_face_with_tear': '🥲',
  'speech_balloon': '💬', 'star': '⭐', 'star2': '🌟',
  'sweat_smile': '😅', 'thinking_face': '🤔',
  'thumbsup': '👍', 'thumbsdown': '👎',
  'v': '✌️', 'warning': '⚠️', 'wave': '👋',
  'wink': '😉', 'writing_hand': '✍️', 'x': '❌',
  'tada': '🎉', 'sparkles': '✨', 'clap': '👏',
  'ok_hand': '👌', 'check': '✅', 'heavy_check_mark': '✅',
  'white_check_mark': '✅', 'red_circle': '🔴',
  'large_blue_circle': '🔵', 'arrow_right': '➡️',
  'arrow_left': '⬅️', 'arrow_up': '⬆️',
  'studio_microphone': '🎙️', 'mega': '📣',
  'loudspeaker': '📢', 'bell': '🔔',
  'lock': '🔒', 'key': '🔑', 'shield': '🛡️',
  'chart_with_upwards_trend': '📈', 'bar_chart': '📊',
  'bookmark': '🔖', 'pushpin': '📌', 'memo': '📝',
  'clipboard': '📋', 'package': '📦', 'wrench': '🔧',
  'hammer_and_wrench': '🛠️', 'zap': '⚡',
  'globe_with_meridians': '🌐', 'earth_americas': '🌎',
};

function convertEmojis(text) {
  return text.replace(/:([a-z0-9_+-]+):/g, (match, name) => EMOJI_MAP[name] || match);
}

// --- Text conversion ---

function convertSlackMrkdwn(text, userMap) {
  if (!text) return '';
  let out = text;

  // <@USERID> → @RealName
  out = out.replace(/<@(\w+)>/g, (_, id) => `@${userMap[id] || id}`);

  // <URL|label> → [label](URL)
  out = out.replace(/<(https?:\/\/[^|>]+)\|([^>]+)>/g, '[$2]($1)');

  // <URL> → URL
  out = out.replace(/<(https?:\/\/[^>]+)>/g, '$1');

  // Slack bold *text* → **text** (avoid matching already-double stars)
  out = out.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '**$1**');

  // Slack italic _text_ → *text*
  out = out.replace(/(?<!_)_([^_\n]+)_(?!_)/g, '*$1*');

  // Convert emoji codes to unicode
  out = convertEmojis(out);

  return out;
}

function extractFirstUrl(text) {
  if (!text) return '';
  const match = text.match(/<(https?:\/\/[^|>]+)/);
  return match ? match[1] : '';
}

// --- Tag & type detection ---

const TAG_RULES = [
  // AI tools & platforms
  { tag: 'claude',       pattern: /\bclaude\b/i },
  { tag: 'cursor',       pattern: /\bcursor\b/i },
  { tag: 'chatgpt',      pattern: /\bchatgpt\b|\bgpt[-\s]?[345]\b|\bopenai\b/i },
  { tag: 'gemini',       pattern: /\bgemini\b/i },
  { tag: 'deepseek',     pattern: /\bdeepseek\b/i },
  { tag: 'copilot',      pattern: /\bcopilot\b/i },
  { tag: 'codex',        pattern: /\bcodex\b/i },

  // Concepts & tech
  { tag: 'mcp',          pattern: /\bmcp\b/i },
  { tag: 'agents',       pattern: /\bagent[s]?\b|\bagentic\b/i },
  { tag: 'rag',          pattern: /\brag\b/i },
  { tag: 'llm',          pattern: /\bllm[s]?\b|\blarge language model/i },
  { tag: 'prompt-engineering', pattern: /\bprompt(?:ing|s)?\b.*\b(?:engineer|technique|tip|trick)/i },
  { tag: 'fine-tuning',  pattern: /\bfine[-\s]?tun/i },

  // Dev topics
  { tag: 'security',     pattern: /\bsecurity\b|\bvulnerab|\bcve[-\s]?\d|\bowasp\b|\brce\b|\bexploit\b|\bransomware\b/i },
  { tag: 'devops',       pattern: /\bdevops\b|\bci\/cd\b|\bdocker\b|\bkubernetes\b|\baws\b/i },
  { tag: 'testing',      pattern: /\btest(?:ing|s)?\b|\btdd\b|\bqa\b/i },
  { tag: 'refactoring',  pattern: /\brefactor/i },
  { tag: 'plugins',      pattern: /\bplugin[s]?\b|\bskill[s]?\b|\bhook[s]?\b/i },
  { tag: 'api',          pattern: /\bapi[s]?\b|\brest\b|\bgraphql\b|\bsdk\b/i },
  { tag: 'mobile',       pattern: /\bmobile\b|\bios\b|\bandroid\b|\breact[\s-]?native\b|\bflutter\b/i },

  // Healthcare & domain
  { tag: 'healthcare-ai', pattern: /\bhealthcare\b|\bhealth[-\s]?tech\b|\bclinical\b|\bfhir\b|\behr\b|\bmedical\b/i },
  { tag: 'education',    pattern: /\bcertificat|\bcours[e]|\blearn|\budemy\b|\bcoursera\b|\bstanford\b|\bacademy\b/i },
  { tag: 'career',       pattern: /\bhir(?:ing|ed)\b|\bjob\b|\bposition\b|\bfired\b|\bengineer(?:s|ing)?\b.*\b(?:role|position)/i },

  // Content type hints
  { tag: 'video',        pattern: /\bvideo\b|\byoutube\.com\b|\byoutu\.be\b/i },
  { tag: 'article',      pattern: /\barticle\b|\bblog\s?post\b|\bread\b/i },
  { tag: 'demo',         pattern: /\bdemo\b|\bshowcase\b|\bshow\s?(?:and|&)\s?tell\b/i },
  { tag: 'announcement', pattern: /\bannounce|\breleas(?:e[ds]?|ing)\b|\blaunche[ds]?\b|\bjust\s+(?:dropped|shipped|released)/i },
  { tag: 'tools',        pattern: /github\.com|npmjs\.com|\btool[s]?\b|\blibrary\b|\bframework\b/i },
];

function detectTags(text) {
  if (!text) return [];
  const tags = [];
  for (const { tag, pattern } of TAG_RULES) {
    if (pattern.test(text)) tags.push(tag);
  }
  // Limit to 5 most relevant (first matched = most specific in our ordered list)
  return [...new Set(tags)].slice(0, 5);
}

function detectType(text) {
  if (!text) return 'post';
  const lower = text.toLowerCase();
  const urlCount = (text.match(/https?:\/\//g) || []).length;
  const plainText = text.replace(/<[^>]+>/g, '').replace(/https?:\/\/\S+/g, '').trim();
  const plainLen = plainText.length;

  // Demo / showcase
  if (/\bdemo\b|\bshowcase\b|\bshow\s?(?:and|&)\s?tell\b/i.test(lower)) return 'demo';

  // Tool share — primarily a link with short commentary
  if (urlCount > 0 && plainLen < 120 && /github\.com|npmjs\.com|\.dev\/|\.io\//.test(text)) return 'tool';

  // Link share — URL-heavy with minimal text
  if (urlCount > 0 && plainLen < 80) return 'link';

  // News — external news, weekly roundups
  if (/\bnews\b|\bweekly\b|\bscoop\b|\bthis week\b|\bbreaking\b/i.test(lower)) return 'news';

  // Tip — short actionable advice
  if ((/\btips?\b|\btricks?\b|\bprotip\b|\bhack\b/i.test(lower) || /^(?:tip|pro.?tip|fyi|btw)[:\s]/i.test(plainText)) && plainLen < 400) return 'tip';

  // Discussion — questions, calls for input
  if (/\?/.test(plainText) && (/\bwhat\b|\bhow\b|\bwhy\b|\bdo you\b|\bdoes\b|\bhas anyone\b|\bda li\b|\bsta mislite\b|\bimate li\b/i.test(lower))) return 'discussion';

  // Announcement
  if (/\bannounce|\breleas(?:e[ds]?|ing)\b|\bjust\s+(?:dropped|shipped|released|launched)/i.test(lower)) return 'news';

  return 'post';
}

// --- Slug / filename ---

function toSlug(text) {
  let s = text
    .replace(/<[^>]+>/g, '') // strip Slack links
    .replace(/https?:\/\/\S+/g, '') // strip URLs
    .replace(/:[a-z0-9_+-]+:/g, '') // strip emoji codes
    .replace(/[@#]/g, '') // strip @ and #
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  // Take meaningful words, up to ~50 chars
  const words = s.split('-').filter(w => w.length > 1);
  let slug = '';
  for (const w of words) {
    const next = slug ? slug + '-' + w : w;
    if (next.length > 50) break;
    slug = next;
  }
  return slug || s.slice(0, 50).replace(/-+$/, '');
}

function tsToDate(ts) {
  return new Date(parseFloat(ts) * 1000);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function buildFilename(ts, text) {
  const date = formatDate(tsToDate(ts));
  let slug = toSlug(text);
  if (!slug) slug = `post-${ts.replace('.', '-')}`;
  return `${date}-${slug}.md`;
}

// --- Frontmatter ---

// Generic greetings/openers to skip when building title
const GREETING_PATTERNS = /^(hi\s+(all|everyone|team|folks|svima|ljudi)|hello\s*(all|everyone)?|hey\s*(all|everyone|team|folks|ljudi)?|zdravo\s*(svima)?|cao\s*(svima)?|pozdrav\s*(svima|kolege)?|ao\s*(svima)?|wave)\s*[,!.\s]*/i;

function buildTitle(text) {
  if (!text) return 'Untitled';

  // Clean up the text
  let clean = text
    .replace(/<([^|>]+)\|([^>]+)>/g, '$2') // <url|label> → label
    .replace(/<(https?:\/\/[^>]+)>/g, '')   // <url> → remove
    .replace(/https?:\/\/\S+/g, '')          // bare urls → remove
    .replace(/:[a-z0-9_+-]+:/g, '')          // :emoji: → remove
    .replace(/[*_~`]/g, '')                   // markdown formatting
    .replace(/<@[\w.]+>/g, '')                  // Slack <@USER> mentions
    .replace(/@[\w.]+/g, '')                     // plain @mentions
    .replace(/\s+/g, ' ')
    .trim();

  // Strip leading greetings
  clean = clean.replace(GREETING_PATTERNS, '').trim();

  // If nothing left after stripping, try second line
  if (!clean || clean.length < 10) {
    const lines = text.replace(/:[a-z0-9_+-]+:/g, '').replace(/<[^>]+>/g, '').replace(/[*_~`]/g, '').trim().split('\n').filter(l => l.trim().length > 10);
    if (lines.length > 1) {
      clean = lines[1].trim().replace(GREETING_PATTERNS, '').trim();
    }
    if (!clean || clean.length < 10) {
      clean = lines[0]?.trim() || 'Untitled';
    }
  }

  // Take first meaningful sentence
  const sentences = clean.split(/(?<=[.!?])\s+/);
  let title = sentences[0];

  // If first sentence is too short and there's more, combine
  if (title.length < 20 && sentences.length > 1) {
    title = sentences.slice(0, 2).join(' ');
  }

  if (!title || title.length < 3) return 'Untitled';

  // Capitalize first letter
  title = title.charAt(0).toUpperCase() + title.slice(1);

  if (title.length <= 80) return title;
  // Truncate at word boundary
  const truncated = title.slice(0, 77).replace(/\s+\S*$/, '');
  return truncated + '...';
}

function buildFrontmatter(msg, userMap) {
  const fileInfo = getFileInfo(msg);
  const textForTitle = msg.text && msg.text.trim().length >= 10 ? msg.text : (fileInfo ? fileInfo.name : '');
  const textForTags = [msg.text || '', fileInfo ? fileInfo.name : ''].join(' ');

  const title = buildTitle(textForTitle).replace(/"/g, '\\"');
  const author = userMap[msg.user] || 'Unknown';
  const date = formatDate(tsToDate(msg.ts));
  const tags = detectTags(textForTags);
  const type = detectType(textForTags);
  const url = extractFirstUrl(msg.text) || (fileInfo ? fileInfo.url : '');

  let fm = '---\n';
  fm += `title: "${title}"\n`;
  fm += `author: "${author}"\n`;
  fm += `date: "${date}"\n`;
  fm += `tags: [${tags.map((t) => `"${t}"`).join(', ')}]\n`;
  fm += `type: ${type}\n`;
  if (url) fm += `url: "${url}"\n`;
  fm += '---\n';
  return fm;
}

// --- Skip logic ---

const SKIP_SUBTYPES = new Set([
  'bot_message',
  'channel_join',
  'channel_leave',
  'channel_topic',
  'channel_purpose',
  'channel_name',
  'channel_archive',
  'channel_unarchive',
  'group_join',
  'group_leave',
  'pinned_item',
  'unpinned_item',
]);

function getFileInfo(msg) {
  if (!msg.files || msg.files.length === 0) return null;
  const f = msg.files[0];
  return {
    name: (f.title || f.name || '').replace(/:[a-z0-9_+-]+:/g, '').trim(),
    type: f.pretty_type || f.filetype || 'file',
    url: f.url_private || f.permalink || '',
  };
}

function shouldSkip(msg) {
  if (msg.subtype && SKIP_SUBTYPES.has(msg.subtype)) return true;
  if (msg.bot_id) return true;
  const hasText = msg.text && msg.text.trim().length >= 20;
  const hasFiles = msg.files && msg.files.length > 0;
  if (!hasText && !hasFiles) return true;
  return false;
}

// --- Main ---

async function main() {
  console.log(`Finding channel: ${SLACK_CHANNEL_NAME}`);
  const channelId = await findChannelId(SLACK_CHANNEL_NAME);
  console.log(`Channel ID: ${channelId}`);

  console.log('Fetching users...');
  const userMap = await fetchUsers();
  console.log(`Cached ${Object.keys(userMap).length} users`);

  console.log('Fetching messages...');
  const allMessages = await fetchAllMessages(channelId);
  console.log(`Fetched ${allMessages.length} messages`);

  // Sort by timestamp ascending
  allMessages.sort((a, b) => parseFloat(a.ts) - parseFloat(b.ts));

  if (!existsSync(POSTS_DIR)) {
    mkdirSync(POSTS_DIR, { recursive: true });
  }

  let created = 0;
  let updated = 0;
  let unchanged = 0;
  let skipped = 0;

  for (const msg of allMessages) {
    if (shouldSkip(msg)) {
      skipped++;
      continue;
    }

    const fileInfo = getFileInfo(msg);
    const textForSlug = msg.text && msg.text.trim().length >= 10 ? msg.text : (fileInfo ? fileInfo.name : '');
    const filename = buildFilename(msg.ts, textForSlug);
    const filepath = join(POSTS_DIR, filename);

    const alreadyExists = existsSync(filepath);

    // For existing posts, only re-process if thread has replies (to catch new ones)
    if (alreadyExists && (!msg.reply_count || msg.reply_count === 0)) {
      unchanged++;
      continue;
    }

    // Build post content
    const frontmatter = buildFrontmatter(msg, userMap);
    let body = convertSlackMrkdwn(msg.text || '', userMap);

    // If message has files, add file references to body
    if (fileInfo && fileInfo.name) {
      if (body) body += '\n\n';
      body += `*[Shared ${fileInfo.type}: ${fileInfo.name}]*`;
    }

    // Fetch thread replies if any
    if (msg.reply_count && msg.reply_count > 0) {
      try {
        const replies = await fetchReplies(channelId, msg.ts);
        if (replies.length > 0) {
          body += '\n\n---\n';
          for (const reply of replies) {
            const replyAuthor = userMap[reply.user] || 'Unknown';
            const replyText = convertSlackMrkdwn(reply.text, userMap);
            body += `\n**Reply from ${replyAuthor}:**\n${replyText}\n`;
          }
        }
      } catch (err) {
        console.warn(`  Warning: Could not fetch replies for thread ${msg.ts}: ${err.message}`);
      }
    }

    const content = frontmatter + '\n' + body + '\n';

    // Skip write if content is identical (avoids unnecessary git diffs)
    if (alreadyExists) {
      const existing = readFileSync(filepath, 'utf-8');
      if (existing === content) {
        unchanged++;
        continue;
      }
      writeFileSync(filepath, content, 'utf-8');
      console.log(`  Updated: ${filename} (new replies)`);
      updated++;
    } else {
      writeFileSync(filepath, content, 'utf-8');
      console.log(`  Created: ${filename}`);
      created++;
    }
  }

  console.log(`\nSynced: ${created} new, ${updated} updated, ${unchanged} unchanged, ${skipped} skipped`);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
