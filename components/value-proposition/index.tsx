import React, { ReactNode } from "react";
import styles from "./index.module.scss";

export const ValueProp = ({ children }: { children: ReactNode }) => (
  <section className={styles.main}>{children}</section>
);
