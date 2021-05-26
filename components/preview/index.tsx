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

  return (
    <section
      className={styles["mode-" + mode]}
      onMouseOver={() => setMode("light")}
      onMouseOut={() => setMode("minimal")}
      onMouseDown={() => setMode("dark")}
    >
      <div className={styles.main}>
        <Image isActive={mode === "light"} src="/app-preview-light.png" />
        <Image isActive={mode === "minimal"} src="/app-preview-minimal.png" />
        <Image isActive={mode === "dark"} src="/app-preview-dark.png" />
      </div>
    </section>
  );
};
