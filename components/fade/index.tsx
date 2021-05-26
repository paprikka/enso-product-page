import React, { FC } from "react";
import styles from "./index.module.scss";

type Props = {
  text: string;
};
export const Fade: FC<Props> = ({ text }: Props) => (
  <span className={styles.main}>
    {text.split("").map((char, ind) => (
      <span key={ind}>{char}</span>
    ))}
  </span>
);
