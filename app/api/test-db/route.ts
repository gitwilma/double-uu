import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const collections = await db.collections();
    const collectionNames = collections.map((c) => c.collectionName);

    return NextResponse.json({ success: true, collections: collectionNames });
  } catch {
    return NextResponse.json({
      success: false,
      error: "Could not connect to DB",
    });
  }
}
