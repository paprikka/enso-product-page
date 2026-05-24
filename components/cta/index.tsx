import { BuyButton } from "../buy-button/BuyButton";
import { HGroup } from "../h-group";
import styles from "./index.module.scss";

export const CTA = () => (
  <section className={styles.section}>
    <div className={styles.inner}>
      <h2 className={styles.title}>Write now, edit later.</h2>
      <p className={styles.subtitle}>Get that first draft done.</p>
      <HGroup align="middle">
        <BuyButton>
          <strong>Get Ensō</strong> for macOS
        </BuyButton>
      </HGroup>
    </div>
  </section>
);
