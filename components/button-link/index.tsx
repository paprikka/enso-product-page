import React, { FC } from "react";
import { getClasses, SharedButtonProps } from "../button";

type ButtonLinkProps = SharedButtonProps & {
  href: string;
  target?: string;
  onClick?: () => void;
};
export const ButtonLink: FC<ButtonLinkProps> = ({
  label,
  level,
  href,
  target = "_blank",
  noMargin,
  size = "m",
  onClick,
}) => (
  <a
    className={getClasses({ level, noMargin, size })}
    target={target}
    href={href}
    onClick={onClick}
  >
    {label}
  </a>
);
