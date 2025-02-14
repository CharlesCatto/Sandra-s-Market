import styles from "./Blog.module.css";
import BGBlog from "../../../public/img/BGblog.png";
import Hammer from "../../../public/img/hammer.svg"; // Assure-toi que l'image est bien là

const Blog = () => {
  return (
    <div className={styles.blogContainer}>
      {/* Ombre en arrière-plan */}
      <div className={styles.shadow} />
      {/* Image de fond */}
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${BGBlog})` }}
      />

      {/* Banderole "Under Construction" */}
      <div className={styles.banner}>🚧 UNDER CONSTRUCTION 🚧</div>

      {/* Marteaux animés */}
      <div className={styles.hammerContainer}>
        <img
          src={Hammer}
          alt="Hammer"
          className={`${styles.hammer} ${styles.hammer1}`}
        />
        <img
          src={Hammer}
          alt="Hammer"
          className={`${styles.hammer} ${styles.hammer2}`}
        />
        <img
          src={Hammer}
          alt="Hammer"
          className={`${styles.hammer} ${styles.hammer3}`}
        />
      </div>
    </div>
  );
};

export default Blog;
