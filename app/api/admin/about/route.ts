import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAboutContent, upsertAboutContent } from "@/lib/repositories/aboutRepo.mongo";
import { revalidatePath } from "next/cache";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

function isAdmin(session: any) {
  return session?.user?.email === ADMIN_EMAIL;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const about = await getAboutContent();
  return NextResponse.json(about);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, coverImage, sections } = body;

  if (!title || !Array.isArray(sections) || sections.length < 1 || sections.length > 3) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  for (const s of sections) {
    if (!s.subtitle?.trim() || !s.body?.trim()) {
      return NextResponse.json(
        { error: "Each section needs subtitle and body" },
        { status: 400 }
      );
    }
  }

  const saved = await upsertAboutContent({ title, coverImage, sections });

revalidatePath("/about");

  return NextResponse.json(saved);
}
