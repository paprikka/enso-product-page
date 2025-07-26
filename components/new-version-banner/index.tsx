import React from "react";
import styles from "./index.module.scss";

export const NewVersionBanner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <p>A smaller, more private, and more accessible version of Ensō is coming soon.</p>
        <p>Learn more <a href="https://untested.sonnet.io/notes/new-enso-first-public-beta/" className={styles.link}>here</a>.</p>
      </div>
    </section>
  );
};
