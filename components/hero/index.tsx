import React from "react";
import { BuyButton } from "../buy-button/BuyButton";
import { HGroup } from "../h-group";
import styles from "./index.module.scss";

export const Hero = () => {
  return (
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
          <BuyButton><strong>Get Ensō</strong> for macOS</BuyButton>
        </HGroup>
      </section>
    </section>
  );
};
