import React, { FC } from "react";
import styles from "./index.module.scss";

type ButtonLinkProps = {
  level?: "primary" | "secondary";
  label: string;
  href: string;
};
export const ButtonLink: FC<ButtonLinkProps> = ({
  label,
  level,
  href,
}: ButtonLinkProps) => (
  <a
    className={
      level === "primary"
        ? `${styles.buttonLink} ${styles.buttonLinkPrimary}`
        : `${styles.buttonLink} ${styles.buttonLinkSecondary}`
    }
    target="_blank"
    href={href}
  >
    {label}
  </a>
);
