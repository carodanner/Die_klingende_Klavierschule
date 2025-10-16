// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REALM = process.env.BASIC_REALM || "Protected";
const AUTH_ENABLED = process.env.BASIC_AUTH_ENABLED === "true";

// public assets you do NOT want to protect
const PUBLIC_PATHS = [
  /^\/_next\//,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
  /^\/public\//,
  /^\/api\/auth/, // Allow auth API calls
];

function requireAuth() {
  const res = new NextResponse("Authentication required", { status: 401 });
  res.headers.set("WWW-Authenticate", `Basic realm="${REALM}"`);
  return res;
}

function decodeBasic(encoded: string): { user?: string; pass?: string } {
  try {
    // Edge runtime has atob()
    const decoded = atob(encoded);
    const idx = decoded.indexOf(":");
    if (idx < 0) return {};
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch {
    return {};
  }
}

async function validateUserWithContentful(
  user: string,
  pass: string,
  request: NextRequest
): Promise<boolean> {
  try {
    // Call our auth API route which can use Contentful
    // Use the same host as the current request
    const url = new URL("/api/auth", request.url);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user, password: pass }),
    });

    return response.ok;
  } catch (error) {
    console.error("Auth API call failed:", error);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  // If auth is disabled via env, pass everything through
  if (!AUTH_ENABLED) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some((r) => r.test(pathname))) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization") || "";
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic" || !encoded) {
    return requireAuth();
  }

  const { user, pass } = decodeBasic(encoded);
  if (!user || !pass) return requireAuth();

  if (await validateUserWithContentful(user, pass, req)) {
    return NextResponse.next();
  }

  return requireAuth();
}

// protect everything by default; tweak if you only want to guard certain paths
export const config = {
  matcher: ["/((?!api/health).*)"],
};
