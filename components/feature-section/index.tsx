import { ReactNode } from "react";
import styles from "./index.module.scss";

type Props = {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
};

export const FeatureSection = ({ title, subtitle, children }: Props) => (
  <section className={styles.section}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.subtitle}>{subtitle}</p>
    {children}
  </section>
);
