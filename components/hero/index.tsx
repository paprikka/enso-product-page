import React from "react";
import { ButtonLink } from "../button-link";
import { HGroup } from "../h-group";
import styles from "./index.module.scss";

export const Hero = () => (
  <section className={styles.container}>
    <h1 className={styles.headline}>
      Write now, <br />
      edit later.
    </h1>
    <section className={styles.description}>
      <p>Ensō is a writing tool that helps you enter a state of flow.</p>

      <p>
        It does this by separating writing from editing and thus making it
        harder for you to edit yourself.
      </p>

      <HGroup>
        <ButtonLink
          level="primary"
          href="https://enso.sonnet.io"
          label="try it for yourself"
        />
        <ButtonLink href="https://sonnet.io/posts/ulysses" label="learn more" />
      </HGroup>
    </section>
  </section>
);
