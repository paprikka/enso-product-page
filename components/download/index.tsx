import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../button-link";

export const Download = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <Image
            alt="Ensō"
            src={"/app-icon.png"}
            width={160}
            height={160}
            className={styles.icon}
          />
        </div>
        <h2 className={styles.title}>Ensō for Mac</h2>
        <ButtonLink
          href="https://3689984635711.gumroad.com/l/ewckz"
          label="Buy now"
          level="primaryOutline"
          noMargin
        />
        <hr className={styles.separator} />
        <ButtonLink
          href="https://write.sonnet.io"
          label="Try the web version"
          level="secondaryOutline"
          noMargin
        />
        <p className={styles.disclaimer}>
          free and{" "}
          <Link href="https://github.com/paprikka/ulysses">always private</Link>
        </p>
        <p className={styles.invite}>
          Looking for Windows or Linux support?{" "}
          <Link href="//">Get in touch</Link>.
        </p>
      </div>
    </div>
  );
};
