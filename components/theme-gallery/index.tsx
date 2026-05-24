import { CSSProperties, ReactNode } from "react";
import styles from "./index.module.scss";

type Theme = {
  name: string;
  caption: ReactNode;
  sample: string;
  fg: string;
  bg: string;
};

const themes: Theme[] = [
  {
    name: "Black and White",
    caption: "bright sunlight",
    sample: "horse",
    fg: "black",
    bg: "white",
  },
  {
    name: "Light",
    caption: "familiar, readable",
    sample: "Pferd",
    fg: "#000",
    bg: "#FAFAFA",
  },
  {
    name: "Sepia",
    caption: "familiar, readable",
    sample: "cavalo",
    fg: "#444",
    bg: "#F9F0E7",
  },
  {
    name: "Dark",
    caption: (
      <>
        familiar, readable
        <br />
        matches default dark OS appearance
      </>
    ),
    sample: "اسب",
    fg: "#F8EFE6",
    bg: "#2C2C2C",
  },
  { name: "OLED", caption: "perfect black", sample: "סוס", fg: "#fff", bg: "#000" },
  {
    name: "Midnight",
    sample: "马",
    caption: (
      <>
        reduces overall light emissions
        <br />
        reduces blue light emissions
        <br />
        great for writing and{" "}
        <a
          href="https://untested.sonnet.io/notes/obsidian-for-vampires/#:~:text=Backlinks"
          target="_blank"
        >
          thinking late
        </a>
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
          {t.sample}
        </div>
        <dt className={styles.name}>{t.name}</dt>
        <dd className={styles.caption}>{t.caption}</dd>
      </div>
    ))}
  </dl>
);
