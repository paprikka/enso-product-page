import { CSSProperties, ReactNode } from "react";
import styles from "./index.module.scss";

type Theme = {
  name: string;
  caption: ReactNode;
  fg: string;
  bg: string;
};

const themes: Theme[] = [
  { name: "Black and White", caption: "bright sunlight", fg: "black", bg: "white" },
  { name: "Light", caption: "familiar, readable", fg: "#000", bg: "#FAFAFA" },
  { name: "Sepia", caption: "familiar, readable", fg: "#444", bg: "#F9F0E7" },
  {
    name: "Dark",
    caption: (
      <>
        familiar, readable
        <br />
        matches default dark OS appearance
      </>
    ),
    fg: "#F8EFE6",
    bg: "#2C2C2C",
  },
  { name: "OLED", caption: "perfect black", fg: "#fff", bg: "#000" },
  {
    name: "Midnight",
    caption: (
      <>
        reduces blue light emissions
        <br />
        great for writing and thinking late
      </>
    ),
    fg: "#C5261B",
    bg: "#000",
  },
];

export const ThemeGallery = () => (
  <dl className={styles.grid}>
    {themes.map((t) => (
      <div key={t.name} className={styles.chip}>
        <div
          className={styles.sample}
          style={{ "--bg": t.bg, "--fg": t.fg } as CSSProperties}
        >
          Aa
        </div>
        <dt className={styles.name}>{t.name}</dt>
        <dd className={styles.caption}>{t.caption}</dd>
      </div>
    ))}
  </dl>
);
