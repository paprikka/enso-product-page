import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../button-link";
import { Text } from "../text";
import { Spacer } from "../spacer";
import { FC, MouseEventHandler, useState } from "react";
import classNames from "classnames";
import { Tracking } from "../tracking";

export const Download: FC<{ isVisible: boolean; onClose: () => void }> = ({
  onClose,
  isVisible,
}) => {
  const handleCloseClick = () => onClose();
  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as any).dataset?.overlay) handleCloseClick();
  };
  return (
    <div
      data-overlay="true"
      className={classNames({
        [styles.overlay]: true,
        [styles.isVisible]: isVisible,
      })}
      onClick={handleOverlayClick}
    >
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
            href="https://sonnet.gumroad.com/l/enso"
            label="Buy now"
            level="primaryOutline"
            noMargin
            size="s"
            onClick={() => Tracking.track("Download Modal: Buy now click")}
          />
          <Text dimmed size="s" align="center">
            - or -
          </Text>
          <ButtonLink
            href="https://write.sonnet.io"
            label="Get the web version"
            level="secondaryOutline"
            noMargin
            size="s"
            onClick={() => Tracking.track("Download Modal: Web click")}
          />
        </div>
        <Spacer size={1} />
        <Text size="s" inline>
          <strong>Not a trial</strong>, free and{" "}
          <Link href="https://github.com/paprikka/ulysses">always private</Link>
        </Text>
        <Spacer size={6} />
        <Text size="s" inline>
          Looking for Windows or Linux support?{" "}
          <Link href="https://sonnet.io/posts/hi">Get in touch</Link>.
        </Text>
        <button className={styles.closeButton} onClick={handleCloseClick} />
      </div>
    </div>
  );
};
