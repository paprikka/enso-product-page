import React, { useState } from "react";
// import Image from "next/image";
import styles from "./index.module.scss";

type Mode = "light" | "minimal" | "dark";
const Image = ({ src, isActive }: { src: string; isActive: boolean }) => (
  <div
    className={isActive ? `${styles.image} ${styles.isActive}` : styles.image}
  >
    <img alt="Ulysses" src={src} />
  </div>
);

{
  /* <Image
width={2992}
height={2054}
src="/app-preview-light.png"
layout="responsive"
/> */
}
export const Preview = () => {
  const [mode, setMode] = useState<Mode>("minimal");

  const [isOver, setIsOver] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => setIsDark(!isDark);
  return (
    <section
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
      onClick={toggleDark}
    >
      <div className={styles.main}>
        <div
          className={`${styles.screen} ${isDark ? styles["screen--dark"] : ""}`}
        >
          <div className={styles.window}>
            <div className={styles.titleBar}>
              <div className={styles.dot} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </div>
            <div className={styles.windowContent}>
              <div
                className={`${styles.tip} ${isDark ? styles["tip--dark"] : ""}`}
                hidden={!isOver}
              >
                <button>{isDark ? "Disable" : "Enable"} dark mode</button>
              </div>
              <Image
                isActive={!isDark && isOver}
                src="/app-preview-light.png"
              />
              <Image
                isActive={!isDark && !isOver}
                src="/app-preview-minimal.png"
              />
              <Image isActive={isDark && isOver} src="/app-preview-dark.png" />
              <Image
                isActive={isDark && !isOver}
                src="/app-preview-dark-minimal.png"
              />
            </div>
          </div>
        </div>

        {/* <div className={styles.switcher} onClick={toggleDark} /> */}
      </div>
    </section>
  );
};
