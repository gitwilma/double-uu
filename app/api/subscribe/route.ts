import { NextResponse } from "next/server";
import { createSubscriber } from "@/lib/repositories/subscriberRepo.mongo";

type SubscribeRequestBody = {
  email: string;
  consent?: boolean;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SubscribeRequestBody;
    const { email, consent } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Ogiltig e-postadress" },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Måste godkänna prenumeration" },
        { status: 400 },
      );
    }

    const subscriber = await createSubscriber(email);

    return NextResponse.json(
      {
        success: true,
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Subscribe POST error:", err);
    return NextResponse.json(
      { error: "Kunde inte spara prenumeration" },
      { status: 500 },
    );
  }
}
