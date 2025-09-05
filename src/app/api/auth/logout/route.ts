import { NextResponse } from "next/server";
import { cookieOptions } from "@/lib/cookies";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("access_token", "", { ...cookieOptions, maxAge: 0 });
  res.cookies.set("refresh_token", "", { ...cookieOptions, maxAge: 0 });
  return res;
}
