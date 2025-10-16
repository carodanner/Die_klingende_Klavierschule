import { NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/lib/contentful/apis/user-api";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const user = await validateUser(username, password);

    if (user) {
      return NextResponse.json({
        success: true,
        user: { id: user.id, name: user.name },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
