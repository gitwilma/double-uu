import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { DefaultSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllArticles, createArticle } from "@/lib/repositories/articleRepo.mongo";
import { revalidatePath } from "next/cache";
import { ArticleSection } from "@/lib/types";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
type SessionUser = DefaultSession["user"];

type CreateArticleRequest = {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  sections: ArticleSection[];

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

  const {
    title,
    slug,
    excerpt,
    coverImage,
    tags,
    sections,
  } = body;

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!Array.isArray(sections) || sections.length < 1 || sections.length > 3) {
    return NextResponse.json(
      { error: "Sections must be 1–3 items" },
      { status: 400 }
    );
  }

  const hasAtLeastOneImage = sections.some(
    (s) => !!s.image?.trim()
  );
  if (!hasAtLeastOneImage) {
    return NextResponse.json(
      { error: "At least one section must include an image" },
      { status: 400 }
    );
  }

  for (const s of sections) {
    if (!s.subtitle?.trim() || !s.body?.trim()) {
      return NextResponse.json(
        { error: "Each section needs subtitle + body" },
        { status: 400 }
      );
    }
  }

  const article = await createArticle({
    title,
    slug,
    excerpt: excerpt ?? "",
    coverImage,
    tags,
    sections,
    authorId: user!.email!,
  });

  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);
  revalidatePath("/admin");

  return NextResponse.json(article, { status: 201 });
}
