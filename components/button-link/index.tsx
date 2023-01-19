import React, { FC } from "react";
import { getClasses, SharedButtonProps } from "../button";

type ButtonLinkProps = SharedButtonProps & {
  href: string;
};
export const ButtonLink: FC<ButtonLinkProps> = ({
  label,
  level,
  href,
  noMargin,
  size = "m",
}) => (
  <a
    className={getClasses({ level, noMargin, size })}
    target="_blank"
    href={href}
  >
    {label}
  </a>
);
