import styles from "./slide-tabs.module.scss";

type Props = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  label?: string;
};

export const SlideTabs = ({
  count,
  active,
  onSelect,
  label = "Slides",
}: Props) => (
  <div className={styles.dots} role="tablist" aria-label={label}>
    {Array.from({ length: count }, (_, i) => (
      <button
        key={i}
        type="button"
        role="tab"
        aria-selected={i === active}
        aria-label={`Show slide ${i + 1}`}
        className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
        onClick={() => onSelect(i)}
      />
    ))}
  </div>
);
