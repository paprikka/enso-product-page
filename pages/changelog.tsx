import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Changelog() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Changelog – Ensō</title>
        <meta name="description" content="What's new in Ensō" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <main className={styles.main} style={{ padding: "var(--page-margin)" }}>
        <h1 style={{ fontFamily: "var(--font-header)", fontSize: "2.5rem" }}>
          Changelog
        </h1>
        <p>hello changelog</p>
      </main>
    </div>
  );
}
