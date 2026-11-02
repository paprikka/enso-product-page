import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import featureStyles from "../styles/Features.module.scss";
import changelogStyles from "../styles/Changelog.module.scss";

type ItemProps = { tag?: "feature" | "fix"; children: ReactNode };

const Item = ({ tag, children }: ItemProps) => (
  <li>
    {children}
    {tag && (
      <>
        {" "}
        <span className={changelogStyles.tag}>{tag}</span>
      </>
    )}
  </li>
);

const Cmd = ({ k }: { k: string }) => (
  <kbd>
    <kbd>⌘</kbd>
    <kbd>{k}</kbd>
  </kbd>
);

export default function Changelog() {
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

        <div className={changelogStyles.content}>
          <h3 id="november-2026">2 November 2026</h3>
          <ul>
            <Item tag="feature">
              File → Import… (<Cmd k="O" />) opens a .txt or .md file.
            </Item>
            <Item tag="feature">
              Remove the macOS Writing Tools button + block OS AI integrations
            </Item>
            <Item tag="feature">
              Show changelog link in the update notification toast
            </Item>
            <Item>Ensō now needs macOS 13 or later</Item>
            <Item tag="fix">More responsive typing on macOS Golden Gate</Item>
          </ul>
          <h3 id="march-2026">1 March 2026</h3>
          <ul>
            <Item tag="feature">Gentler/quieter automatic updates</Item>
          </ul>
          <h3 id="february-2026">28 February 2026</h3>
          <ul>
            <Item tag="feature">Automatic updates</Item>
          </ul>
          <h3 id="february-2026-1">13 February 2026</h3>
          <ul>
            <Item tag="feature">Gentler update notice</Item>
            <Item tag="fix">Better update reliability + error handling</Item>
          </ul>
          <h3 id="february-2026-2">10 February 2026</h3>
          <ul>
            <Item tag="feature">Drop window title</Item>
          </ul>
          <h3 id="february-2026-3">8 February 2026</h3>
          <ul>
            <Item tag="feature">
              Cleaner title bar that blends into the page
            </Item>
            <Item tag="feature">Clearer manual update progress UI</Item>
          </ul>
          <h3 id="february-2026-4">7 February 2026</h3>
          <ul>
            <Item tag="fix">Editor font missing</Item>
          </ul>
          <h3 id="february-2026-5">6 February 2026</h3>
          <ul>
            <Item tag="feature">Manual updates</Item>
            <Item tag="feature">Bye-bye App Store. Self-hosted.</Item>
            <Item tag="feature">New DMG installer</Item>
          </ul>
          <h3 id="january-2026">31 January 2026</h3>
          <ul>
            <Item tag="feature">Warmer Midnight theme</Item>
            <Item tag="fix">
              Clearing a note no longer opens several dialogs and locks the app
            </Item>
          </ul>
          <h3 id="september-2025">September 2025</h3>
          <ul>
            <Item tag="feature">Tidier theme picker</Item>
            <Item tag="feature">Removed “Write me a Poem”</Item>
          </ul>
          <h3 id="august-2025">August 2025</h3>
          <ul>
            <Item tag="feature">
              Right-to-left writing carries on into the next paragraph
            </Item>
            <Item tag="feature">
              <Cmd k="Backspace" /> deletes the whole line
            </Item>
            <Item tag="fix">
              Better Chinese input: Pinyin and other input methods no longer add
              stray line breaks.
            </Item>
            <Item tag="fix">Correct colours (sRGB) on macOS 14</Item>
          </ul>
          <h3 id="december-2019---july-2025">December 2019 – July 2025</h3>
          <p>
            Check <a href="https://sonnet.io/posts/ulysses/">sonnet.io</a> and{" "}
            <a href="https://untested.sonnet.io">untested.sonnet.io</a> for the
            full history (what, how).
          </p>
        </div>
      </main>
    </div>
  );
}
