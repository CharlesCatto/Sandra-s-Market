import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./NavBar.module.css";
import logo from "../../public/img/christmas-market-logo.png";

function NavBar() {
  const [click, setClick] = React.useState(false);
  const { user, handleLogout } = useAuth(); // Récupérer l'utilisateur et la fonction de déconnexion

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const handleAuthAction = () => {
    if (user) {
      handleLogout(); // Déconnexion si un utilisateur est connecté
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      Close();
    }
  };

  return (
    <div>
      {/* Accessible clickable div */}
      <div
        className={click ? styles.mainContainer : ""}
        onClick={Close}
        role="button"
        tabIndex={0} // Make the div focusable and act as a button for closing the menu
        onKeyDown={handleKeyDown} // Handle keyboard events
      />
      <nav
        className={styles.navbar}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.navContainer}>
          <NavLink to="/home" className={styles.navLogo}>
            <div className={styles.logoContainer}>
              <span>Sandra's Market</span>
              <img
                className={styles.logo}
                src={logo}
                alt="Sandra's Market logo"
              />
            </div>
          </NavLink>

          <ul
            className={
              click ? `${styles.navMenu} ${styles.active}` : styles.navMenu
            }
          >
            <li className={styles.navItem}>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinks} ${styles.active}`
                    : styles.navLinks
                }
                onClick={click ? handleClick : undefined}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinks} ${styles.active}`
                    : styles.navLinks
                }
                onClick={click ? handleClick : undefined}
              >
                About
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinks} ${styles.active}`
                    : styles.navLinks
                }
                onClick={click ? handleClick : undefined}
              >
                Blog
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinks} ${styles.active}`
                    : styles.navLinks
                }
                onClick={click ? handleClick : undefined}
              >
                Contact Us
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/finder"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinks} ${styles.active}`
                    : styles.navLinks
                }
                onClick={click ? handleClick : undefined}
              >
                Finder
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/connection"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinks} ${styles.active}`
                    : styles.navLinks
                }
                onClick={click ? handleClick : undefined}
              >
                {user ? (
                  <button
                    type="button"
                    onClick={handleAuthAction}
                    className={styles.navButton} // Appliquez une classe spécifique pour le bouton
                  >
                    Logout
                  </button>
                ) : (
                  "Connexion"
                )}
              </NavLink>
            </li>
          </ul>

          <button
            type="button"
            className={styles.navIcon}
            onClick={handleClick}
            aria-label="Toggle navigation menu"
          >
            <div
              className={
                click ? `${styles.hamburger} ${styles.open}` : styles.hamburger
              }
            >
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
