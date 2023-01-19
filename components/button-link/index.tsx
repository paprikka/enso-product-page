import React, { FC } from "react";
import styles from "./index.module.scss";
import c from "classnames";

type ButtonLinkProps = {
  level?: "primary" | "secondary" | "secondaryOutline" | "primaryOutline";
  label: string;
  href: string;
  noMargin?: boolean;
};
export const ButtonLink: FC<ButtonLinkProps> = ({
  label,
  level,
  href,
  noMargin,
}: ButtonLinkProps) => (
  <a
    className={c({
      [styles.buttonLink]: true,
      [styles.buttonLinkPrimary]: level === "primary",
      [styles.buttonLinkSecondary]: level === "secondary",
      [styles.buttonLinkSecondaryOutline]: level === "secondaryOutline",
      [styles.buttonLinkPrimaryOutline]: level === "primaryOutline",
      [styles.noMargin]: !!noMargin,
    })}
    target="_blank"
    href={href}
  >
    {label}
  </a>
);
