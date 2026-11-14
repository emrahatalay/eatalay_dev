import { AmbientRails } from "./AmbientRails";
import styles from "./AmbientBackdrop.module.css";

/* Decorative only: a fixed backdrop behind the sheet. The dot grid and the warm
   glows are plain CSS; the busy side rails mount only on wide screens. */
export function AmbientBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.glow} />
      <AmbientRails />
    </div>
  );
}
