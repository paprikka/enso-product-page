import c from "classnames";
import { FC, ReactNode } from "react";
import styles from "./index.module.scss";

export const Text: FC<{
  size?: "m" | "s" | "xs";
  dimmed?: boolean;
  inline?: boolean;
  children: ReactNode;
  align?: "start" | "center";
}> = ({ dimmed, inline, children, size = "m", align = "start" }) => {
  return (
    <p
      className={c({
        [styles.container]: true,
        [styles.dimmed]: dimmed,
        [styles.inline]: inline,
        [styles["align-" + align]]: true,
        [styles["size-" + size]]: true,
      })}
    >
      {children}
    </p>
  );
};
