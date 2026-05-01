import { ReactNode } from "react";
import { MockBrowser } from "../mock-browser";
import styles from "./index.module.scss";

type StackItem = {
  imageSrc: string;
  imageAlt: string;
};

type ListItem = {
  name: ReactNode;
  description: ReactNode;
};

const stackItems: StackItem[] = [
  { imageSrc: "/themes/black-and-white.png", imageAlt: "White theme" },
  { imageSrc: "/themes/sepia-1.png", imageAlt: "Sepia theme" },
];

const listItems: ListItem[] = [
  { name: "e-Paper", description: "bright sunlight" },
  { name: "OLED", description: "perfect black" },
  {
    name: (
      <span style={{ color: "var(--color-primary)" }}>Midnight ☉</span>
    ),
    description: (
      <>
        reduces blue light emissions
        <br />
        great for writing and thinking late
      </>
    ),
  },
  { name: "White, Dark, and Sepia", description: "familiar, readable" },
];

export const ThemeGallery = () => (
  <div className={styles.grid}>
    <div className={styles.stack}>
      {stackItems.map((item) => (
        <MockBrowser
          key={item.imageSrc}
          imageSrc={item.imageSrc}
          imageAlt={item.imageAlt}
          title="Ensō"
        />
      ))}
    </div>
    <ul className={styles.list}>
      {listItems.map((item, i) => (
        <li key={i} className={styles.item}>
          <strong>{item.name}</strong>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  </div>
);
