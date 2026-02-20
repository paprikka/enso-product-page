import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/ThankYou.module.scss";

type Props = {
  email: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const email = (query.email as string) ?? "";
  return { props: { email } };
};

export default function ThankYou({ email }: Props) {
  return (
    <>
      <Head>
        <title>Thank you — Ensō</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className={styles.container}>
        <Image
          src="/app-icon.png"
          alt="Ensō"
          width={96}
          height={96}
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
        <a href="/" className={styles.back}>
          Back to home
        </a>
      </div>
    </>
  );
}
