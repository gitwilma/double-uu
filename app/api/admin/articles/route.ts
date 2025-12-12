import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { DefaultSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllArticles, createArticle } from "@/lib/repositories/articleRepo.mongo";
import { revalidatePath } from "next/cache";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
type SessionUser = DefaultSession["user"];

type CreateArticleRequest = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags?: string[];
};

function isAdmin(session: any, user?: SessionUser) {
  return !!session && !!user?.email && !!ADMIN_EMAIL && user.email === ADMIN_EMAIL;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;

  if (!isAdmin(session, user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const articles = await getAllArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;

  if (!isAdmin(session, user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CreateArticleRequest;
  const { title, slug, excerpt, content, coverImage, tags } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const article = await createArticle({
    title,
    slug,
    excerpt: excerpt ?? "",
    content,
    coverImage,
    tags,
    authorId: user!.email!,
  });

  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);
  revalidatePath("/admin");

  return NextResponse.json(article, { status: 201 });
}
