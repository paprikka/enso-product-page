import { useEffect, useState } from "react";
import { MockBrowser } from "../mock-browser";
import styles from "./index.module.scss";

const slides = [
  "/language-slides/1.png",
  "/language-slides/2.png",
  "/language-slides/3.png",
  "/language-slides/4.png",
  "/language-slides/5.png",
  "/language-slides/6.png",
];

const INTERVAL_MS = 3500;

export const LanguageSlides = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <MockBrowser title="Ensō">
      <div className={styles.slides}>
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Language slide ${i + 1}`}
            className={`${styles.slide} ${i === active ? styles.slideActive : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className={styles.dots} role="tablist" aria-label="Language slides">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show slide ${i + 1}`}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </MockBrowser>
  );
};
