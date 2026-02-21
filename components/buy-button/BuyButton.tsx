import React, { FC, ReactNode } from "react";
import styles from "./BuyButton.module.scss";

type BuyButtonProps = {
  children: ReactNode;
};

const PAYMENT_URL = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!;

export const BuyButton: FC<BuyButtonProps> = ({ children }) => (
  <a href={PAYMENT_URL} className={styles.button}>{children}</a>
);
