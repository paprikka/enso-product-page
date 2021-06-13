import Head from "next/head";
import { FC } from "react";
import { Fade } from "../components/fade";
import { Footer } from "../components/footer";
import { Hero } from "../components/hero";
import { Preview } from "../components/preview";
import { ValueProp } from "../components/value-proposition";
import styles from "../styles/Home.module.css";

type SocialMetaProps = {
  description: string;
  title: string;
  url: string;
  image: string;
};

const SocialMeta: FC<SocialMetaProps> = (props: SocialMetaProps) => (
  <>
    <meta property="og:description" content={props.description} />
    <meta property="og:title" content={props.title} />
    <meta property="og:site_name" content="enso.sonnet.io" />
    <meta property="og:url" content="https://enso.sonnet.io" />
    <meta property="og:image" content={props.image} />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@rafalpast" />
    <meta name="twitter:creator" content="@rafalpast" />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.description} />
    <meta name="twitter:image" content={props.image} />
    <title> {props.title} </title>
    <script
      async
      defer
      data-website-id="09a5781d-26de-4f88-9d84-d6821ad0730d"
      src="https://sonnet-events.herokuapp.com/umami.js"></script>
    <meta
      name="description"
      content={props.description + " Click to learn more."}
    />
  </>
);

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ensō—write now, edit later.</title>
        <link rel="icon" href="/favicon.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <SocialMeta
          description="Ensō is a writing tool that helps you enter a state of flow."
          title="Ensō—write now, edit later."
          image="https://enso.sonnet.io/social-icon.png"
          url="https://enso.sonnet.io"
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
