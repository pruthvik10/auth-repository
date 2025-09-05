import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "@/lib/auth";
import { cookieOptions } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  try {
    const r = req.cookies.get("refresh_token")?.value;
    if (!r) return NextResponse.json({ error: "No refresh token" }, { status: 401 });

    const payload = verifyRefreshToken(r);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    const newAccess = signAccessToken({ userId: user.id, tokenVersion: user.tokenVersion });
    const newRefresh = signRefreshToken({ userId: user.id, tokenVersion: user.tokenVersion });

    const res = NextResponse.json({ message: "Refreshed" });
    res.cookies.set("access_token", newAccess, { ...cookieOptions, maxAge: 60 * 15 });
    res.cookies.set("refresh_token", newRefresh, { ...cookieOptions, maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
