import React, { FC } from "react";
import { getClasses, SharedButtonProps } from "../button";

type ButtonLinkProps = SharedButtonProps & {
  href: string;
  onClick?: () => void;
};
export const ButtonLink: FC<ButtonLinkProps> = ({
  label,
  level,
  href,
  noMargin,
  size = "m",
  onClick,
}) => (
  <a
    className={getClasses({ level, noMargin, size })}
    target="_blank"
    href={href}
    onClick={onClick}
  >
    {label}
  </a>
);
