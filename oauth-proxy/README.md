# OAuth Proxy for Vicert Marketplace

A Cloudflare Worker that handles the GitHub OAuth token exchange for the marketplace plugin editor. This is needed because GitHub's OAuth token endpoint does not support CORS, so browsers cannot call it directly.

## How It Works

1. User clicks "Sign in with GitHub" on the editor page
2. Browser redirects to GitHub's authorization page
3. User authorizes the app on GitHub
4. GitHub redirects back to the editor with a `?code=...` parameter
5. The editor sends the code to this proxy (`POST /api/auth/token`)
6. The proxy exchanges the code for an access token using the `client_secret` (kept server-side)
7. The token is returned to the browser — PRs are opened under the user's GitHub account

## Setup

### 1. Register a GitHub OAuth App (if not already done)

Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**:

| Field | Value |
|-------|-------|
| Application name | Vicert Marketplace |
| Homepage URL | `https://vicert-healthcare.github.io/vicert-claude-marketplace/` |
| Authorization callback URL | `https://vicert-healthcare.github.io/vicert-claude-marketplace/editor/` |

Save the **Client ID** and generate a **Client Secret**.

### 2. Deploy the Worker

```bash
cd oauth-proxy
npm install
```

Set the client secret (this is stored encrypted in Cloudflare, never in code):

```bash
npx wrangler secret put GITHUB_CLIENT_SECRET
# Paste the secret when prompted
```

Deploy:

```bash
npm run deploy
```

Note the worker URL (e.g. `https://vicert-oauth-proxy.<your-subdomain>.workers.dev`).

### 3. Update the Frontend

In `site/src/islands/PluginEditor.tsx`, set `OAUTH_PROXY_URL` to your deployed worker URL:

```typescript
const OAUTH_PROXY_URL = "https://vicert-oauth-proxy.<your-subdomain>.workers.dev";
```

### 4. Update CORS Origins (if needed)

The `ALLOWED_ORIGINS` variable in `wrangler.toml` controls which origins can call the proxy. Update it if your site is hosted at a different URL:

```toml
[vars]
ALLOWED_ORIGINS = "https://vicert-healthcare.github.io,http://localhost:4321"
```

## Local Development

```bash
npm run dev
```

This starts the worker locally (default: `http://localhost:8787`). Set `OAUTH_PROXY_URL` to this address in the editor for local testing.

## API

### `POST /api/auth/token`

Exchanges a GitHub authorization code for an access token.

**Request:**

```json
{ "code": "github_authorization_code" }
```

**Response (success):**

```json
{
  "access_token": "gho_...",
  "token_type": "bearer",
  "scope": "public_repo"
}
```

**Response (error):**

```json
{ "error": "bad_verification_code" }
```
