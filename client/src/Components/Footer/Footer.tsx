// import styles from "./Footer.module.css";
// import facebook from "/public/img/facebook.png";
// import facebookYellow from "/public/img/facebookYellow.png";
// import instagram from "/public/img/instagram.png";
// import instagramYellow from "/public/img/instagramYellow.png";
// import linkedin from "/public/img/linkedin.png";
// import linkedinYellow from "/public/img/linkedinYellow.png";
// import twitter from "/public/img/twitter.png";
// import twitterYellow from "/public/img/twitterYellow.png";

// function Footer() {
//   return (
//     <section>
//       <footer className={styles.footer}>
//         <div className={styles.container_icon}>
//           <a href="_">
//             <img
//               src={facebook}
//               alt="icon facebook"
//               className={styles.social_icon}
//               onMouseEnter={(e) => (e.currentTarget.src = facebookYellow)}
//               onMouseLeave={(e) => (e.currentTarget.src = facebook)}
//             />
//           </a>
//           <a href="_">
//             <img
//               src={instagram}
//               alt="icon instagram"
//               className={styles.social_icon}
//               onMouseEnter={(e) => (e.currentTarget.src = instagramYellow)}
//               onMouseLeave={(e) => (e.currentTarget.src = instagram)}
//             />
//           </a>
//           <a href="_">
//             <img
//               src={linkedin}
//               alt="icon linkedin"
//               className={styles.social_icon}
//               onMouseEnter={(e) => (e.currentTarget.src = linkedinYellow)}
//               onMouseLeave={(e) => (e.currentTarget.src = linkedin)}
//             />
//           </a>
//           <a href="_">
//             <img
//               src={twitter}
//               alt="icon twitter"
//               className={styles.social_icon}
//               onMouseEnter={(e) => (e.currentTarget.src = twitterYellow)}
//               onMouseLeave={(e) => (e.currentTarget.src = twitter)}
//             />
//           </a>
//         </div>
//         <p className={styles.creators}>Sandra's Market @2025</p>
//       </footer>
//     </section>
//   );
// }

// export default Footer;

import styles from "./Footer.module.css";
import facebook from "/public/img/facebook.png";
import facebookYellow from "/public/img/facebookYellow.png";
import instagram from "/public/img/instagram.png";
import instagramYellow from "/public/img/instagramYellow.png";
import linkedin from "/public/img/linkedin.png";
import linkedinYellow from "/public/img/linkedinYellow.png";
import twitter from "/public/img/twitter.png";
import twitterYellow from "/public/img/twitterYellow.png";

function Footer() {
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLImageElement>,
    newSrc: string,
  ) => {
    e.currentTarget.src = newSrc;
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLImageElement>,
    originalSrc: string,
  ) => {
    e.currentTarget.src = originalSrc;
  };

  return (
    <section>
      <footer className={styles.footer}>
        <div className={styles.container_icon}>
          <a href="_">
            <img
              src={facebook}
              alt="icon facebook"
              className={styles.social_icon}
              onMouseEnter={(e) => handleMouseEnter(e, facebookYellow)}
              onMouseLeave={(e) => handleMouseLeave(e, facebook)}
            />
          </a>
          <a href="_">
            <img
              src={instagram}
              alt="icon instagram"
              className={styles.social_icon}
              onMouseEnter={(e) => handleMouseEnter(e, instagramYellow)}
              onMouseLeave={(e) => handleMouseLeave(e, instagram)}
            />
          </a>
          <a href="_">
            <img
              src={linkedin}
              alt="icon linkedin"
              className={styles.social_icon}
              onMouseEnter={(e) => handleMouseEnter(e, linkedinYellow)}
              onMouseLeave={(e) => handleMouseLeave(e, linkedin)}
            />
          </a>
          <a href="_">
            <img
              src={twitter}
              alt="icon twitter"
              className={styles.social_icon}
              onMouseEnter={(e) => handleMouseEnter(e, twitterYellow)}
              onMouseLeave={(e) => handleMouseLeave(e, twitter)}
            />
          </a>
        </div>
        <p className={styles.creators}>Sandra's Market @2025</p>
      </footer>
    </section>
  );
}

export default Footer;
