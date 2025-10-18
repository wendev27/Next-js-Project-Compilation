import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const event = await req.json();

  // You migh want to verify signature (Paymongo sends "Signature" header)
  // and then switch on event.type

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    // Mark your order as paid in your database
    // e.g update orders table in Appwrite
  }

  return NextResponse.json({
    received: true,
  });
}
