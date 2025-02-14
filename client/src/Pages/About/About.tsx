import sandraImage from "/public/img/sandra.png";
import edgarImage from "/public/img/edgar.png";
import cookieImage from "/public/img/cookie.jpg";
import styles from "./About.module.css";
import SnowEffect from "./SnowEffect";
import Dog from "./Dog/Dog";

function About() {
  return (
    <div className={styles.aboutContainer}>
      {/* Effet de neige */}
      <SnowEffect />

      {/* Lune en haut à droite */}
      <div className={styles.moon} />

      {/* Sol de neige en bas */}
      <div className={styles.snowGround} />

      {/* Carte Sandra */}
      <div className={`${styles.card} ${styles.sandraCard}`}>
        <div className={styles.imageContainer}>
          <img src={sandraImage} alt="Sandra" className={styles.cardImage} />
        </div>
        <div className={styles.textContainer}>
          <h2>About Sandra</h2>
          <p>
            Sandra loves Christmas and enjoys exploring village markets. She has
            a particular fondness for the festive Christmas Markets in France,
            which inspired her to create this platform. Her goal is to help
            others with similar interests easily find Christmas markets near
            them.
          </p>
        </div>
      </div>

      {/* Carte Edgar */}
      <div className={`${styles.card} ${styles.edgarCard}`}>
        <div className={styles.imageContainer}>
          <img
            src={edgarImage}
            alt="Edgar, the French Bulldog"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.textContainer}>
          <h2>Meet Edgar</h2>
          <p>
            Edgar, Sandra's adorable French Bulldog, is a big fan of Christmas
            too! He loves wearing his festive hat and spreading holiday cheer
            wherever he goes. Just say Christmas and watch his tail going
            crazy!!
          </p>
        </div>
      </div>

      {/* Carte Cookie */}
      <div className={`${styles.card} ${styles.cookieCard}`}>
        <div className={styles.imageContainer}>
          <img
            src={cookieImage}
            alt="Cookie, the Dog"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.textContainer}>
          <h2>Meet Cookie</h2>
          <p>
            Cookie, the playful companion of Sandra, has a very sweet nature. He
            loves cuddles and has a special affinity for snow. In fact, every
            winter, he gets excited as soon as the first snowflake falls, and he
            loves to run around in the cold, watching the world turn white.
          </p>
        </div>
      </div>

      {/* Sapin de Noël */}
      <div className={`${styles.christmasTree} ${styles.hideOnMobile}`}>
        <span className={`${styles.deco} ${styles.etoile}`} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b1} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b2} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b3} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b4} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b5} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b6} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b7} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b8} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b9} />
        <span className={`${styles.deco} ${styles.boule}`} id={styles.b10} />
        <div className={styles.etage} />
        <div className={styles.etage} />
        <div className={styles.etage} />
        <div className={styles.etage} />
        <div className={styles.bas}>
          <div className={styles.tronc} />
        </div>
      </div>
      <div className={styles.dog}>
        <Dog />
      </div>
    </div>
  );
}

export default About;
