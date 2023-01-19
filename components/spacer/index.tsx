import classNames from "classnames";
import { FC } from "react";
import styles from "./index.module.scss";

export const Spacer: FC<{
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}> = ({ size = 1 }) => (
  <div
    className={classNames({
      [styles.container]: true,
      [styles[`size-${size}`]]: true,
    })}
  />
);
