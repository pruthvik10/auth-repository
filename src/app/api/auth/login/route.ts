import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "@/lib/auth";
import { cookieOptions } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const payload = { userId: user.id, tokenVersion: user.tokenVersion };
    const accessToken = signAccessToken(payload);   // 15m
    const refreshToken = signRefreshToken(payload); // 7d

    const res = NextResponse.json({ message: "Logged in" });
    res.cookies.set("access_token", accessToken, { ...cookieOptions, maxAge: 60 * 15 });
    res.cookies.set("refresh_token", refreshToken, { ...cookieOptions, maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
