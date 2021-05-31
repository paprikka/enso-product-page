import React, { FC } from "react";
import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
  align?: "middle" | "default";
};
export const HGroup: FC<Props> = ({ children, align }: Props) => (
  <div
    className={`${styles.container} ${
      styles["container--" + (align || "default")]
    }`}
  >
    {children}
  </div>
);
