import { ReactNode } from "react";
import styles from "./index.module.scss";

type Props = {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  spacious?: boolean;
};

export const FeatureSection = ({
  title,
  subtitle,
  children,
  className,
  spacious,
}: Props) => (
  <section
    className={`${spacious ? styles.sectionSpacious : styles.section}${className ? ` ${className}` : ""}`}
  >
    <div className={styles.inner}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      {children}
    </div>
  </section>
);
