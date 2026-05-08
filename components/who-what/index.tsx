import classNames from "classnames";
import styles from "./index.module.scss";

export const WhoWhat = () => (
  <section className={styles.section}>
    <div className={styles.inner}>
      <div className={styles.who}>
        <h2 className={styles.title}>Who uses Ensō?</h2>
        <p>
          Writers, bloggers, engineers, poets, overthinkers, journalers,
          neurospicy, and allegedly neurovanilla.
        </p>
        <p className={styles.more}>
          More on:{" "}
          <a
            href="https://untested.sonnet.io/notes/how-people-use-enso/"
            target="_blank"
            rel="noreferrer"
          >
            <em>untested.sonnet.io/notes/how-people-use-enso</em>
          </a>
        </p>
      </div>

      <p className={styles.think}>
        If you <em>write to think</em> or{" "}
        <em>think too much when writing</em> <strong>Ensō</strong> might be for
        you.
      </p>

      <img className={styles.tree} src="/red-sun.png" alt="" />

      <h2 className={classNames(styles.title, styles.what)}>What for?</h2>

      <p className={styles.whatBody}>
        <strong>Journaling</strong>, <strong>expressive</strong> writing,{" "}
        <strong>first drafts</strong>, therapy-related homework,{" "}
        <strong>meditation</strong>, thinking out loud (in writing), writing
        with eyes closed, writing <strong>musicals</strong>, writing{" "}
        <strong>novels about squirrels</strong>, drafting{" "}
        <strong>blog posts</strong>, writing YouTube{" "}
        <strong>video scripts</strong>, taking <strong>notes</strong>, and
        writing <strong>poetry</strong>.
      </p>
    </div>
  </section>
);
