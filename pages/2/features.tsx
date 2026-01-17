import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import featureStyles from "../../styles/Features.module.scss";
import ballsImage from "./balls.webp";

export default function Features() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ensō — Quick Reference</title>
        <meta name="description" content="Ensō 2 features overview" />
        <link rel="icon" href="/favicon.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main
        className={`${styles.main} ${featureStyles.features}`}
        style={{ padding: "var(--page-margin)" }}
      >
        <nav>
          <Link href="/">← Back</Link>
        </nav>
        <h1 style={{ fontFamily: "var(--font-header)", fontSize: "2.5rem" }}>
          Quick Reference
        </h1>

        <Image
          src={ballsImage}
          alt=""
          className={featureStyles.heroImage}
        />

        <aside className={featureStyles.callout}>
          <p>
            Have a question, found a bug, or just want to say hi?
            <br />
            <strong>
              <a href="mailto:hello@sonnet.io?subject=Question%20about%20Ens%C5%8D">
                Email me
              </a>{" "}
              or{" "}
              <a href="https://calendly.com/hey_hey/enso">book a quick call</a>.
            </strong>
          </p>
        </aside>

        <section>
          <h2>Keyboard Shortcuts</h2>
          <table>
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>S</kbd>
                  </kbd>
                </td>
                <td>
                  Save note (export to <code>.md</code> file)
                </td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>C</kbd>
                  </kbd>
                </td>
                <td>Copy all text to clipboard</td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>K</kbd>
                  </kbd>
                </td>
                <td>Clear editor (with confirmation)</td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>Shift</kbd>
                    <kbd>C</kbd>
                  </kbd>
                </td>
                <td>Toggle Coffee Shop Mode (privacy)</td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>+</kbd>
                  </kbd>
                </td>
                <td>Increase text size</td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>-</kbd>
                  </kbd>
                </td>
                <td>Decrease text size</td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>0</kbd>
                  </kbd>
                </td>
                <td>Reset text size</td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>Shift</kbd>
                    <kbd>T</kbd>
                  </kbd>
                </td>
                <td>Toggle Theme Picker</td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌃</kbd>
                    <kbd>⌘</kbd>
                    <kbd>F</kbd>
                  </kbd>
                </td>
                <td>Toggle Full Screen</td>
              </tr>
              <tr>
                <td>
                  <kbd>
                    <kbd>⌘</kbd>
                    <kbd>Q</kbd>
                  </kbd>
                </td>
                <td>Quit application</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Writing Modes</h2>
          <dl>
            <dt>Typewriter Mode</dt>
            <dd>Cursor forced to end, no text selection, auto-scroll</dd>

            <dt>Coffee Shop Mode</dt>
            <dd>
              Privacy mode that replaces text with bullets (<samp>●</samp>)
            </dd>

            <dt>Auto-hide UI</dt>
            <dd>Interface fades after 2 seconds of inactivity</dd>
          </dl>
        </section>

        <section>
          <h2>Text Options</h2>
          <dl>
            <dt>Spellcheck</dt>
            <dd>
              Toggle on/off (default: <samp>OFF</samp>)
            </dd>

            <dt>Autocorrect</dt>
            <dd>
              Toggle on/off (default: <samp>ON</samp>)
            </dd>

            <dt>Autocapitalize</dt>
            <dd>
              Toggle on/off (default: <samp>OFF</samp>)
            </dd>

            <dt>Text scaling</dt>
            <dd>Adjustable text size</dd>

            <dt>Word count display</dt>
            <dd>Toggleable in View menu</dd>

            <dt>Caret styles</dt>
            <dd>Bar, Underline, or Hidden</dd>
          </dl>
        </section>

        <section>
          <h2>Themes</h2>
          <dl>
            <dt>Light</dt>
            <dd>
              Black and White, Light, Sepia <em>(default)</em>
            </dd>

            <dt>Dark</dt>
            <dd>
              Dark <em>(default)</em>, OLED, Midnight
            </dd>
          </dl>
          <ul>
            <li>Auto-switches based on system appearance</li>
            <li>Live preview in theme picker</li>
          </ul>
        </section>

        <section>
          <h2>File Operations</h2>
          <dl>
            <dt>Save</dt>
            <dd>
              Exports as <code>note-DD-MM-SS.md</code>
            </dd>

            <dt>Copy</dt>
            <dd>Copies all text to clipboard</dd>

            <dt>Clear</dt>
            <dd>Removes all content (with confirmation)</dd>
          </dl>
        </section>

        <section>
          <h2>Other Features</h2>
          <ul>
            <li>
              <abbr title="Right-to-Left">RTL</abbr>/
              <abbr title="Bidirectional">BIDI</abbr> text direction support
            </li>
            <li>
              Persistent settings via <code>localStorage</code>
            </li>
            <li>
              Settings reset option (<samp>Ensō &gt; Clear All Settings</samp>)
            </li>
            <li>Help menu with features overview and contact links</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

