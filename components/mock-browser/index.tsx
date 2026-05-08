import { ReactNode } from "react";
import styles from "./index.module.scss";

type Props = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  children?: ReactNode;
  dark?: boolean;
};

export const MockBrowser = ({
  imageSrc,
  imageAlt,
  title,
  children,
  dark,
}: Props) => (
  <div className={`${styles.window}${dark ? ` ${styles.dark}` : ""}`}>
    <div className={styles.titleBar}>
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.title}>{title}</div>
      <div />
    </div>
    {children ?? (
      <img className={styles.image} src={imageSrc} alt={imageAlt} />
    )}
  </div>
);
