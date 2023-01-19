import styles from "./index.module.scss";
import c from "classnames";
import { FC } from "react";

export type StyledButtonProps = {
  level?: "primary" | "secondary" | "secondaryOutline" | "primaryOutline";
  noMargin?: boolean;
  size?: "m" | "s";
};
export type SharedButtonProps = StyledButtonProps & {
  label: string;
};

export type ButtonProps = SharedButtonProps & {
  onClick: () => void;
};

export const getClasses = ({
  level = "primary",
  noMargin,
  size = "m",
}: StyledButtonProps) =>
  c({
    [styles.button]: true,
    [styles.buttonPrimary]: level === "primary",
    [styles.buttonSecondary]: level === "secondary",
    [styles.buttonSecondaryOutline]: level === "secondaryOutline",
    [styles.buttonPrimaryOutline]: level === "primaryOutline",
    [styles.noMargin]: !!noMargin,
    [styles[size]]: true,
  });

export const Button: FC<ButtonProps> = ({
  label,
  level,
  onClick,
  noMargin,
  size = "m",
}) => (
  <button className={getClasses({ level, noMargin, size })} onClick={onClick}>
    {label}
  </button>
);
