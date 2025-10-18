"use client";

import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    const resp = await fetch("/api/paymongo/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 5000,
        currecy: "PHP",
      }),
    });

    const data = await resp.json();
    console.log(data);

    // if PayMongo returns a "next_action" URL (redirection)
    if (data.data.next_action?.redirect) {
      window.location.href = data.data.next_action.redirect.url;
    }

    setLoading(false);
  }

  return (
    <div>
      <button onClick={handlePay} disabled={loading}>
        {loading ? "Processing..." : "Pay ₱50.00"}
      </button>
    </div>
  );
}
