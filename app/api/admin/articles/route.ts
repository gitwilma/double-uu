import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { DefaultSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getAllArticles,
  createArticle,
} from "@/lib/repositories/articleRepo.mongo";
import type { ArticleStatus } from "@/lib/types";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

type SessionUser = DefaultSession["user"];

type CreateArticleRequest = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  status?: ArticleStatus;
};

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;

  if (!session || !user?.email || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const articles = await getAllArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;

  if (!session || !user?.email || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CreateArticleRequest;
  const { title, slug, excerpt, content, coverImage, tags, status } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const article = await createArticle({
    title,
    slug,
    excerpt: excerpt ?? "",
    content,
    coverImage,
    tags,
    status,
    authorId: user.email,
  });

  return NextResponse.json(article, { status: 201 });
}
