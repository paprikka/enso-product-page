import { readFile } from "fs/promises";
import path from "path";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import featureStyles from "../styles/Features.module.scss";
import changelogStyles from "../styles/Changelog.module.scss";

type Props = { html: string };

// Content lives in content/changelog.html, rendered as-is
export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), "content", "changelog.html");
  const html = await readFile(file, "utf8");
  return { props: { html } };
};

// Leading "(feature)", "(fix)" etc. → pill at the end of the item
const dimTags = (html: string) =>
  html.replace(
    /<li>\(([^)]+)\)\s*([\s\S]*?)\s*<\/li>/g,
    `<li>$2 <span class="${changelogStyles.tag}">$1</span></li>`
  );

// "⌘O" / "⌘ + Backspace" → nested <kbd>, styled like the features page
const markShortcuts = (html: string) =>
  html.replace(
    /⌘(?: \+ )?(\w+)/g,
    "<kbd><kbd>⌘</kbd><kbd>$1</kbd></kbd>"
  );

export default function Changelog({ html }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ensō — Changelog</title>
        <meta name="description" content="What's new in Ensō." />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <main
        className={`${styles.main} ${featureStyles.features}`}
        style={{ padding: "var(--page-margin)" }}
      >
        <nav>
          <Link href="/">← Back</Link>
        </nav>
        <h1 style={{ fontFamily: "var(--font-header)" }}>Changelog</h1>

        <div
          className={changelogStyles.content}
          dangerouslySetInnerHTML={{ __html: markShortcuts(dimTags(html)) }}
        />
      </main>
    </div>
  );
}
