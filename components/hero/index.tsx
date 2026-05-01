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
        <p>
          Give yourself permission to <em>think</em> before you <em>edit</em>.
          <br />
          Give your internal editor a break.
          <br />
          Get that first draft done!
        </p>

        <HGroup align="middle">
          <BuyButton><strong>Get Ensō</strong> for macOS</BuyButton>
        </HGroup>
      </section>
    </section>
  );
};
