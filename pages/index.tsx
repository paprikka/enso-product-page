import Head from "next/head";
import { Fade } from "../components/fade";
import { Footer } from "../components/footer";
import { Hero } from "../components/hero";
import { Preview } from "../components/preview";
import { ValueProp } from "../components/value-proposition";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ensō—write now, edit later.</title>
        <meta
          name="description"
          content="Ensō is a writing tool that helps you enter a state of flow. Click to learn more."
        />
        <link rel="icon" href="/favicon.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <Hero />
        <Preview />
        <ValueProp>
          <section>
            <h2>It’s writing-focused.</h2>
            <p>
              The text <Fade text="fades away" /> as you type so you can focus
              on what you want to say istead of how you want to say it.
            </p>
            <p>
              You can’t select or edit text, but you can download and review it
              once you’re done.
            </p>
          </section>
          <section>
            <h2>It's easy.</h2>
          </section>
          <section>
            <h2>It's private.</h2>
            <p>
              All of your changes are saved locally. Ensō works perfectly fine
              even without internet connecton.
            </p>
          </section>
        </ValueProp>
      </main>

      <Footer />
    </div>
  );
}
