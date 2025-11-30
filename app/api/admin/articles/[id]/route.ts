import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteArticle } from "@/lib/repositories/articleRepo.mongo";
import type { DefaultSession } from "next-auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
type SessionUser = DefaultSession["user"];

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;

  if (!session || !user?.email || user.email !== ADMIN_EMAIL) {
    return null;
  }
  return { session, user };
}

export async function DELETE(_req: Request, context: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const auth = await ensureAdmin();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = 'then' in context.params ? await context.params : context.params;
  const { id } = params;

  const ok = await deleteArticle(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
