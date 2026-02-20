import type { GetServerSideProps } from "next";
import Stripe from "stripe";
import { encryptToken } from "../lib/download-token";
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
    return {
      redirect: {
        destination: `/thank-you?email=${encodeURIComponent(email)}&ref=${ref}`,
        permanent: false,
      },
    };
  } catch {
    return { props: { error: true } };
  }
};

export default function Payment() {
  return <ErrorPage />;
}
