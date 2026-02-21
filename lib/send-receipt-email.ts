export async function sendReceiptEmail(
  email: string,
  thankYouUrl: string,
  sessionId: string
): Promise<void> {
  const isEnabled =
    process.env.ENABLE_TRANSACTIONAL_EMAIL !== "false" &&
    !!process.env.ENABLE_TRANSACTIONAL_EMAIL;
  const fullThankYouUrl = `${process.env.SITE_URL}${thankYouUrl}`;
  const logCtx = { sessionId, emailDomain: email.split("@")[1], enabled: isEnabled };

  if (!isEnabled) {
    console.log("[send-receipt] skipped (disabled)", logCtx);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Idempotency-Key": sessionId,
      },
      body: JSON.stringify({
        from: process.env.RECEIPT_FROM_EMAIL,
        reply_to: process.env.RECEIPT_REPLY_TO,
        to: email,
        template: {
          id: "enso-receipt",
          variables: { thankYouUrl: fullThankYouUrl },
        },
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("[send-receipt] failed", { ...logCtx, status: res.status, data });
      return;
    }

    console.log("[send-receipt] sent", { ...logCtx, resendId: data?.id });
  } catch (error) {
    console.error("[send-receipt] failed", { ...logCtx, error });
  }
}
