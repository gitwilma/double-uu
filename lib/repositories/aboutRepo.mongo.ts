import clientPromise from "@/lib/mongodb";
import type { ArticleSection } from "@/lib/types";

export type AboutContent = {
  title: string;
  sections: ArticleSection[];
};

export async function getAboutContent(): Promise<AboutContent | null> {
  const client = await clientPromise;
  const db = client.db("test");

  return await db.collection<AboutContent>("about").findOne({});
}

export async function upsertAboutContent(data: AboutContent) {
  const client = await clientPromise;
  const db = client.db("test");

  await db.collection("about").updateOne(
    {},
    { $set: data },
    { upsert: true }
  );

  return data;
}
