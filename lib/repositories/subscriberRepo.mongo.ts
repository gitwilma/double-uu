import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import type { Subscriber } from "@/lib/types";

type SubscriberDoc = {
  _id: ObjectId;
  email: string;
  createdAt: string;
  confirmed: boolean;
  unsubscribed: boolean;
};

function mapDocToSubscriber(doc: SubscriberDoc): Subscriber {
  return {
    id: doc._id.toHexString(),
    email: doc.email,
    createdAt: doc.createdAt,
    confirmed: doc.confirmed,
    unsubscribed: doc.unsubscribed,
  };
}

export async function createSubscriber(email: string): Promise<Subscriber> {
  const client = await clientPromise;
  const db = client.db("test");
  const col = db.collection<SubscriberDoc>("subscribers");

  const normalizedEmail = email.trim().toLowerCase();

  const existing = (await col.findOne({
    email: normalizedEmail,
  })) as SubscriberDoc | null;

  if (existing) {
    return mapDocToSubscriber(existing);
  }

  const now = new Date().toISOString();

  const toInsert: Omit<SubscriberDoc, "_id"> = {
    email: normalizedEmail,
    createdAt: now,
    confirmed: true,
    unsubscribed: false,
  };

  const result = await col.insertOne(toInsert as any);

  return {
    id: result.insertedId.toHexString(),
    ...toInsert,
  };
}

export async function getAllSubscribers(): Promise<Subscriber[]> {
  const client = await clientPromise;
  const db = client.db("test");
  const col = db.collection<SubscriberDoc>("subscribers");

  const docs = (await col
    .find({})
    .sort({ createdAt: -1 })
    .toArray()) as SubscriberDoc[];

  return docs.map(mapDocToSubscriber);
}
