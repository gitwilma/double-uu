import clientPromise from "@/lib/mongodb";
import type { Article } from "@/lib/types";
import { ObjectId } from "mongodb";

type ArticleDoc = Omit<Article, "id"> & {
  _id: ObjectId;
};

function mapDocToArticle(doc: ArticleDoc): Article {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    coverImage: doc.coverImage,
    tags: doc.tags,
    publishedAt: doc.publishedAt,
    authorId: doc.authorId,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const client = await clientPromise;
  const db = client.db("test");

  const docs = (await db
    .collection<ArticleDoc>("articles")
    .find({})
    .sort({ publishedAt: -1, _id: -1 })
    .toArray()) as ArticleDoc[];

  return docs.map(mapDocToArticle);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const client = await clientPromise;
  const db = client.db("test");

  const _id = new ObjectId(id);

  const doc = (await db
    .collection<ArticleDoc>("articles")
    .findOne({ _id })) as ArticleDoc | null;

  return doc ? mapDocToArticle(doc) : null;
}

type CreateArticleParams = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  authorId: string;
};

export async function createArticle(input: CreateArticleParams): Promise<Article> {
  const client = await clientPromise;
  const db = client.db("test");

  const now = new Date().toISOString();

  const toInsert: Omit<Article, "id"> = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    coverImage: input.coverImage,
    tags: input.tags ?? [],
    publishedAt: now,
    authorId: input.authorId,
  };

  const result = await db
    .collection<Omit<ArticleDoc, "_id">>("articles")
    .insertOne(toInsert);

  return {
    id: result.insertedId.toHexString(),
    ...toInsert,
  };
}

type UpdateArticleInput = Partial<Omit<Article, "id" | "authorId">>;

export async function updateArticle(
  id: string,
  input: UpdateArticleInput
): Promise<Article | null> {
  const client = await clientPromise;
  const db = client.db("test");
  const _id = new ObjectId(id);

  const update: Partial<ArticleDoc> = { ...input } as Partial<ArticleDoc>;

  await db
    .collection<ArticleDoc>("articles")
    .updateOne({ _id }, { $set: update });

  const updated = (await db
    .collection<ArticleDoc>("articles")
    .findOne({ _id })) as ArticleDoc | null;

  return updated ? mapDocToArticle(updated) : null;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db("test");

  try {
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch {
      return false;
    }

    const res = await db.collection<ArticleDoc>("articles").deleteOne({ _id });
    return res.deletedCount === 1;
  } catch {
    return false;
  }
}

export async function getPublishedArticles(): Promise<Article[]> {
  return getAllArticles();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const client = await clientPromise;
  const db = client.db("test");

  const doc = await db
    .collection<ArticleDoc>("articles")
    .findOne({ slug });

  return doc ? mapDocToArticle(doc) : null;
}


