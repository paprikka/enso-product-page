import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function AppPrivacy() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Privacy Policy - Ensō</title>
        <meta name="description" content="Ensō app privacy policy" />
        <link rel="icon" href="/favicon.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main} style={{ padding: "var(--page-margin)" }}>
        <h1 style={{ fontFamily: "var(--font-header)", fontSize: "2.5rem" }}>
          Privacy Policy
        </h1>
        <p>The Ensō app does not collect any user data.</p>
        <p>
          All your writing is stored locally on your device and never
          transmitted to our servers.
        </p>
        <p>
          If you have any questions, please contact us at{" "}
          <a
            href="mailto:hello@sonnet.io"
            style={{
              textDecoration: "underline",
              color: "var(--color-primary)",
            }}
          >
            hello@sonnet.io
          </a>
          .
        </p>
        <img
          src="/social-icon.png"
          alt="Ensō icon"
          style={{ maxWidth: "3rem", height: "auto" }}
        />
      </main>
    </div>
  );
}
