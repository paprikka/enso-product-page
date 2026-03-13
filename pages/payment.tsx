import type { GetServerSideProps } from "next";
import Stripe from "stripe";
import { encryptToken } from "../lib/download-token";
import { sendReceiptEmail } from "../lib/send-receipt-email";
import ErrorPage from "../components/error-page/ErrorPage";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string;
  if (!sessionId) return { props: { error: true } };

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-01-28.clover",
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") return { props: { error: true } };

    const email = session.customer_details?.email ?? "";
    const ref = encryptToken({ email, sessionId });
    const thankYouUrl = `/thank-you?email=${encodeURIComponent(email)}&ref=${ref}`;

    try {
      await sendReceiptEmail(email, thankYouUrl, sessionId);
    } catch (err) {
      console.error(JSON.stringify({ event: "receipt_email_error", email, error: String(err), ts: new Date().toISOString() }));
    }

    return {
      redirect: {
        destination: thankYouUrl,
        permanent: false,
      },
    };
  } catch (err) {
    console.error(JSON.stringify({ event: "payment_error", error: String(err), ts: new Date().toISOString() }));
    return { props: { error: true } };
  }
};

export default function Payment() {
  return <ErrorPage />;
}
