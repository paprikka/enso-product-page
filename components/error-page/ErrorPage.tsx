import Head from "next/head";
import Image from "next/image";
import styles from "./ErrorPage.module.scss";

type Props = {
  description?: React.ReactNode;
};

export default function ErrorPage({ description }: Props) {
  const defaultDescription = (
    <>
      We couldn&apos;t verify your purchase. If you&apos;ve completed payment,
      please{" "}
      <a href="mailto:hello@sonnet.io" className={styles.emailLink}>
        get in touch
      </a>{" "}
      and we&apos;ll sort it out.
    </>
  );

  return (
    <>
      <Head>
        <title>Something went wrong — Ensō</title>
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
        <h1 className={styles.heading}>Something went wrong</h1>
        <p className={styles.message}>{description ?? defaultDescription}</p>
        <a href="/" className={styles.back}>
          Back to home
        </a>
      </div>
    </>
  );
}
