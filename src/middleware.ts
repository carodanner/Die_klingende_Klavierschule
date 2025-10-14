// middleware.ts
import { validateUser } from "@/lib/contentful/apis/user-api";
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

  try {
    if (await validateUser(user, pass)) {
      return NextResponse.next();
    }
    return requireAuth();
  } catch {
    // Fail closed on Contentful errors
    return requireAuth();
  }
}

// protect everything by default; tweak if you only want to guard certain paths
export const config = {
  matcher: ["/((?!api/health).*)"],
};
