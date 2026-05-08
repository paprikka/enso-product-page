import styles from "./index.module.scss";

export const PrivateByDesign = () => (
  <section className={styles.section}>
    <div className={styles.inner}>
      <img src="/thinking-balls.png" alt="" className={styles.imageLeft} />
      <div className={styles.content}>
        <h2 className={styles.title}>Private by design</h2>
        <p>
          Ensō has <strong>no analytics or telemetry</strong>.<br />
          Everything you do stays on your device.
        </p>
        <p>
          7 years, millions of words, and thousands of users later I still talk
          with users directly. It’s not that hard.
        </p>
        <p className={styles.more}>
          More on:{" "}
          <a
            href="https://untested.sonnet.io/notes/kind-software"
            target="_blank"
            rel="noreferrer"
          >
            <em>untested.sonnet.io/notes/kind-software</em>
          </a>
        </p>
        <div className={styles.imageMe}>
          <img src="/me-private-footer.png" alt="" />
        </div>
      </div>
    </div>
  </section>
);
