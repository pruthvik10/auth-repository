import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value;
    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
