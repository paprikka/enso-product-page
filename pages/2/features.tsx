import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function Features() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Enso 2 Features - Ensō</title>
        <meta name="description" content="Ensō 2 features overview" />
        <link rel="icon" href="/favicon.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main} style={{ padding: "var(--page-margin)" }}>
        <h1 style={{ fontFamily: "var(--font-header)", fontSize: "2.5rem" }}>
          Enso 2 features overview
        </h1>
        <p>TODO</p>
      </main>
    </div>
  );
}