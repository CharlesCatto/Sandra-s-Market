// import { useEffect, useRef } from "react";
// import styles from "./NotFound.module.css"; // Import the CSS module

// const NotFound = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Generate snowflakes
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const createSnowflake = () => {
//       const snowflake = document.createElement("div");
//       snowflake.className = styles.snowflake;
//       snowflake.style.left = `${Math.random() * 100}vw`;
//       snowflake.style.animationDuration = `${3 + Math.random() * 5}s`;
//       snowflake.style.animationDelay = `${Math.random() * 5}s`;
//       container.appendChild(snowflake);

//       // Remove snowflake after it falls
//       setTimeout(() => {
//         snowflake.remove();
//       }, 10000); // Adjust based on animation duration
//     };

//     // Create snowflakes at regular intervals
//     const interval = setInterval(createSnowflake, 500);

//     // Cleanup
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div ref={containerRef} className={styles.notFound}>
//       <div className={styles.lights} />
//       <h1 className={styles.title}>404</h1>
//       <p className={styles.message}>Oops! Santa’s sleigh took a wrong turn!</p>
//       <a href="/home" className={styles.link}>
//         Take me Home
//       </a>
//     </div>
//   );
// };

// export default NotFound;
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./NotFound.module.css"; // Import the CSS module

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate snowflakes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.className = styles.snowflake;
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${3 + Math.random() * 5}s`;
      snowflake.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(snowflake);

      // Remove snowflake after it falls
      setTimeout(() => {
        snowflake.remove();
      }, 10000); // Adjust based on animation duration
    };

    // Create snowflakes at regular intervals
    const interval = setInterval(createSnowflake, 500);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className={styles.notFound}>
      <div className={styles.lights} />
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! Santa’s sleigh took a wrong turn!</p>
      <Link to="/home" className={styles.link}>
        Take me Home
      </Link>
    </div>
  );
};

export default NotFound;
