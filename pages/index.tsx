import Head from "next/head";
import { Fade } from "../components/fade";
import { FeatureSection } from "../components/feature-section";
import { Footer } from "../components/footer";
import { Hero } from "../components/hero";
import { MockBrowser } from "../components/mock-browser";
import { Preview } from "../components/preview";
import { ValueProp } from "../components/value-proposition";
import { PaperOverlay } from "../components/paper-overlay";
import styles from "../styles/Home.module.css";

type SocialMetaProps = {
  description: string;
  title: string;
  url: string;
  image: string;
};

const renderSocialMeta = (props: SocialMetaProps) => (
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
    <title>{props.title}</title>
    <script
      async
      defer
      data-website-id="09a5781d-26de-4f88-9d84-d6821ad0730d"
      src="https://sonnet-events.vercel.app/umami.js"
      data-domains="enso.sonnet.io"
    ></script>
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
        <link rel="icon" href="/favicon.jpg" />
        {renderSocialMeta({
          description:
            "Ensō is a writing tool that helps you enter a state of flow.",
          title: "Ensō—write now, edit later.",
          image: "https://enso.sonnet.io/social-icon.png",
          url: "https://enso.sonnet.io",
        })}
      </Head>

      <PaperOverlay />
      <main className={styles.main}>
        <Hero />
        <FeatureSection
          title="Writing-first"
          subtitle={
            <>
              Ensō is a writing tool that helps you enter a state of flow.
              <br />
              How? It forces you to <em>write</em> and <em>think</em> before
              editing. That makes it harder for you to <em>overthink</em> or{" "}
              <em>edit yourself</em>.
            </>
          }
        >
          <MockBrowser
            imageSrc="/light-1.png"
            imageAlt="Writing-first preview"
            title="Ensō"
          />
        </FeatureSection>
        <FeatureSection
          className={styles.coffeeshop}
          title="Coffeeshop Mode™"
          subtitle={
            <>
              Quickly toggle between visible and{" "}
              <span style={{ fontWeight: 700, letterSpacing: "0.125rem" }}>
                ݀ · · · · ·
              </span>{" "}
              text.
              <br />
              Excellent for writing in crowded or small spaces.
              <br />
              (or just giving you more privacy)
            </>
          }
        >
          <MockBrowser
            imageSrc="/coffeeshop.png"
            imageAlt="Coffeeshop Mode preview"
            title="Ensō"
          />
        </FeatureSection>
        <FeatureSection
          title="6 Accessible Themes"
          subtitle="Six carefully tuned colour schemes — including high-contrast and low-light options — meet WCAG contrast standards out of the box."
        >
          <img
            src="https://placehold.co/1200x600?text=Accessible+Themes"
            alt="Accessible themes preview"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </FeatureSection>
        <FeatureSection
          title="RTL language support"
          subtitle="Full right-to-left typesetting for Arabic, Hebrew, Persian and more — with mirrored UI affordances and proper bidi handling."
        >
          <img
            src="https://placehold.co/1200x600?text=RTL+Support"
            alt="RTL language support preview"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </FeatureSection>
        <ValueProp>
          <section>
            <h2>It’s writing-focused.</h2>
            <p>
              The text <Fade text="fades away" /> as you type so you can focus
              on what you want to say instead of how you want to say it.
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
              even without internet connection.
            </p>
          </section>
        </ValueProp>
      </main>

      <Footer />
    </div>
  );
}
