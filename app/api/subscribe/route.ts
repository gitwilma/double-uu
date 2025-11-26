import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/repositories/subscriberRepo.mock";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const subscriber = await addSubscriber(email);
  return NextResponse.json({ ok: true, subscriber });
}
