// Dog.tsx
import type React from "react";
import styles from "./Dog.module.css"; // Create a CSS module file for the dog styles

const Dog: React.FC = () => {
  return (
    <div className={styles.dog}>
      <div className={styles.ears} />
      <div className={styles.body}>
        <div className={styles.eyes} />
        <div className={styles.beard}>
          <div className={styles.mouth}>
            <div className={styles.tongue} />
          </div>
        </div>
        <div className={styles.stomach} />
        <div className={styles.legs}>
          <div className={styles.left} />
          <div className={styles.right} />
        </div>
      </div>
      <div className={styles.tail} />
    </div>
  );
};

export default Dog;
