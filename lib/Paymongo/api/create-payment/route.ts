import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount, currency, payment_method } = await req.json();

  const secretKey = process.env.PAYMONGO_SECRET_KEY!;

  const url = "https://api.paymongo.com/v1/payment_intents";

  const body = {
    amount,
    currency,
    payment_method_allowed: ["card"], //depends which methods you allow
    payment_method_options: {
      card: {
        request_three_d_secure: "any",
      },
    },
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
    },
    body: JSON.stringify(body),
  });

  const data = await resp.json();
  return NextResponse.json(data);
}
