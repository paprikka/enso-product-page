import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../button-link";
import { Text } from "../text";
import { Spacer } from "../spacer";
import { FC } from "react";

export const Download: FC<{ isVisible: boolean; onClose: () => void }> = ({
  onClose,
  isVisible,
}) => {
  const handleCloseClick = () => onClose();

  if (!isVisible) return null;

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
        <div className={styles.buttons}>
          <ButtonLink
            href="https://3689984635711.gumroad.com/l/ewckz"
            label="Buy now"
            level="primaryOutline"
            noMargin
            size="s"
          />
          <Text dimmed size="s" align="center">
            - or -
          </Text>
          <ButtonLink
            href="https://write.sonnet.io"
            label="Try the web version"
            level="secondaryOutline"
            noMargin
            size="s"
          />
        </div>
        <Spacer size={1} />
        <Text dimmed size="s" inline>
          free and{" "}
          <Link href="https://github.com/paprikka/ulysses">always private</Link>
        </Text>
        <Spacer size={6} />
        <Text size="s" inline>
          Looking for Windows or Linux support?{" "}
          <Link href="//">Get in touch</Link>.
        </Text>
        <button className={styles.closeButton} onClick={handleCloseClick} />
      </div>
    </div>
  );
};
