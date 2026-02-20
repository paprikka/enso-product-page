import type { GetServerSideProps } from "next";
import Head from "next/head";
import Stripe from "stripe";
import styles from "../styles/Payment.module.scss";

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
    return {
      redirect: {
        destination: `/thank-you?email=${encodeURIComponent(email)}`,
        permanent: false,
      },
    };
  } catch {
    return { props: { error: true } };
  }
};

export default function Payment() {
  return (
    <>
      <Head>
        <title>Ensō</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className={styles.container}>
        <p>Something went wrong. Your payment may not have completed.</p>
        <a href="/">Back to home</a>
      </div>
    </>
  );
}
