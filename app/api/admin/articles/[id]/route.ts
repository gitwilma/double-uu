import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteArticle, getArticleById } from "@/lib/repositories/articleRepo.mongo";
import type { DefaultSession } from "next-auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
type SessionUser = DefaultSession["user"];

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;

  if (!session || !user?.email || !ADMIN_EMAIL || user.email !== ADMIN_EMAIL) {
    return null;
  }
  return { session, user };
}

export async function DELETE(
  _req: Request,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  const auth = await ensureAdmin();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = "then" in context.params ? await context.params : context.params;
  const { id } = params;

  const articleBeforeDelete = await getArticleById(id);

  const ok = await deleteArticle(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath("/articles");
  if (articleBeforeDelete?.slug) {
    revalidatePath(`/articles/${articleBeforeDelete.slug}`);
  }
  revalidatePath("/admin");

  return NextResponse.json({ success: true });
}
