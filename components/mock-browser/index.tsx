import styles from "./index.module.scss";

type Props = {
  imageSrc: string;
  imageAlt: string;
  title?: string;
};

export const MockBrowser = ({ imageSrc, imageAlt, title }: Props) => (
  <div className={styles.window}>
    <div className={styles.titleBar}>
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.title}>{title}</div>
      <div />
    </div>
    <img className={styles.image} src={imageSrc} alt={imageAlt} />
  </div>
);
