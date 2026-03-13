interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  ALLOWED_ORIGINS: string;
}

function corsHeaders(env: Env, request: Request): Record<string, string> {
  const origin = request.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim());
  const matched = allowed.includes(origin) ? origin : "";

  return {
    "Access-Control-Allow-Origin": matched,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function handleTokenExchange(
  request: Request,
  env: Env,
): Promise<Response> {
  const headers = {
    ...corsHeaders(env, request),
    "Content-Type": "application/json",
  };

  try {
    const body = await request.json<{ code?: string }>();

    if (!body.code) {
      return new Response(
        JSON.stringify({ error: "Missing authorization code" }),
        { status: 400, headers },
      );
    }

    const ghRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: body.code,
      }),
    });

    const ghData = await ghRes.json<Record<string, string>>();

    if (ghData.error) {
      return new Response(
        JSON.stringify({
          error: ghData.error_description || ghData.error,
        }),
        { status: 400, headers },
      );
    }

    return new Response(
      JSON.stringify({
        access_token: ghData.access_token,
        token_type: ghData.token_type,
        scope: ghData.scope,
      }),
      { headers },
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers },
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(env, request),
      });
    }

    const url = new URL(request.url);

    if (url.pathname === "/api/auth/token" && request.method === "POST") {
      return handleTokenExchange(request, env);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  },
} satisfies ExportedHandler<Env>;
