import styles from "./index.module.scss";

type Props = {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
};

export const FeatureSection = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: Props) => (
  <section className={styles.section}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.subtitle}>{subtitle}</p>
    <img className={styles.image} src={imageSrc} alt={imageAlt} />
  </section>
);
