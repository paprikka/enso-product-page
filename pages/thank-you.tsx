import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { decryptToken } from "../lib/download-token";
import ErrorPage from "../components/error-page/ErrorPage";
import styles from "../styles/ThankYou.module.scss";

type Props =
  | { error: true }
  | { error?: false; email: string; downloadRef: string };

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  req,
}) => {
  const email = (query.email as string) ?? "";
  const downloadRef = (query.ref as string) ?? "";

  if (downloadRef) {
    const payload = decryptToken(downloadRef);
    if (!payload || payload.email !== email) {
      console.warn(
        JSON.stringify({
          event: "thank_you_token_mismatch",
          tokenEmail: payload?.email ?? null,
          queryEmail: email,
          ip: req.headers["x-forwarded-for"] ?? req.socket.remoteAddress,
          ua: req.headers["user-agent"],
          ts: new Date().toISOString(),
        })
      );
      return { props: { error: true } };
    }
  }

  return { props: { email, downloadRef } };
};

export default function ThankYou(props: Props) {
  if (props.error) return <ErrorPage />;

  const { email, downloadRef } = props;

  return (
    <>
      <Head>
        <title>Thank you — Ensō</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className={styles.container}>
        <Image
          src="/enso-sigma-icon.png"
          alt="Ensō"
          width={150}
          height={150}
          quality={100}
          className={styles.icon}
        />
        <h1 className={styles.heading}>Thank you!</h1>
        {email ? (
          <p className={styles.receipt}>
            Your receipt will be sent to{" "}
            <span className={styles.email}>{email}</span>.
          </p>
        ) : (
          <p className={styles.receipt}>Your purchase is confirmed.</p>
        )}
        <a
          href={downloadRef ? `/download?ref=${downloadRef}&email=${encodeURIComponent(email)}` : "/download"}
          className={styles.download}
        >
          Download Ensō for Mac
        </a>
        <a href="/" className={styles.back}>
          Back to home
        </a>
      </div>
    </>
  );
}
