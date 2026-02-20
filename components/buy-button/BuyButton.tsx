import React, { FC, ReactNode } from "react";
import styles from "./BuyButton.module.scss";

type BuyButtonProps = {
  children: ReactNode;
};

export const BuyButton: FC<BuyButtonProps> = ({ children }) => (
  <button className={styles.button}>{children}</button>
);
