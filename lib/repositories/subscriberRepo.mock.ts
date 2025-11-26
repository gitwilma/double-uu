import { mockSubscribers } from "../mock-data";
import type { Subscriber } from "../types";

export async function addSubscriber(email: string): Promise<Subscriber> {
  const newSub: Subscriber = {
    id: `s${mockSubscribers.length + 1}`,
    email,
    createdAt: new Date().toISOString(),
    confirmed: true,
    unsubscribed: false,
  };
  mockSubscribers.push(newSub);
  return newSub;
}
