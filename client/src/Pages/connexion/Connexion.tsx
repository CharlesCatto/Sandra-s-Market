import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eyeClosed from "../../assets/Icons/eye-slash.svg";
import eye from "../../assets/Icons/eye.svg";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../helpers/api";
import { errorToast, successToast } from "../../services/toast";
import styles from "./connexion.module.css";
import christmasClothing from "../../../public/img/christmas-clothing.png";

// Interfaces pour typer les réponses de l'API
interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
  };
}

interface RegisterResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  };
}

// Déclarez une interface pour étendre les propriétés CSS
interface CustomCSSProperties extends React.CSSProperties {
  "--i": number;
}

function Connexion() {
  const [isLogin, setIsLogin] = useState(true);
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  // Gestion des changements dans les champs de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isLogin) {
      setLogin((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isLogin) {
        // Connexion
        const response = await api.post<LoginResponse>("/api/login", login);
        handleLogin(response.data.user);
        successToast(`Bienvenue, ${response.data.user.username} !`);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        if (register.password !== register.confirmPassword) {
          errorToast("Les mots de passe ne correspondent pas.");
          setErrorMessage("Les mots de passe ne correspondent pas.");
          return;
        }
        // Inscription
        await api.post<RegisterResponse>("/api/register", register);
        // Si l'inscription réussit, connecte automatiquement l'utilisateur
        const loginResponse = await api.post<LoginResponse>("/api/login", {
          email: register.email,
          password: register.password,
        });
        handleLogin(loginResponse.data.user);
        setWelcomeMessage(
          `Bienvenue, ${loginResponse.data.user.username} ! Votre compte a été créé.`,
        );
        successToast(
          `Bienvenue, ${loginResponse.data.user.username} ! Votre compte a été créé.`,
        );
        setTimeout(() => {
          navigate("/account");
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur lors de l'opération:", error);
      setErrorMessage("Email ou pseudo invalide");
      errorToast("Email ou pseudo invalide");
    }
  };

  // Basculer entre les formulaires de connexion et d'inscription
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const passwordsMatch =
    register.password === register.confirmPassword && register.password !== "";

  return (
    <div className={styles.container}>
      {/* Tasse de chocolat chaud */}
      <div className={styles.hotChocolate}>
        <div className={styles.plate} />
        <div className={styles.cup}>
          <div className={styles.top}>
            <div className={styles.vapour}>
              {[...Array(20)].map((_, i) => (
                <span
                  key={`vapour-element-${i}`}
                  style={{ "--i": i + 1 } as CustomCSSProperties}
                />
              ))}
            </div>
            <div className={styles.circle}>
              <div className={styles.tea} />
            </div>
          </div>
          {/* Ajoutez l'image ici */}
          <img
            src={christmasClothing}
            alt="Christmas Clothing"
            className={styles.christmasClothing}
            title="Christmas Clothing"
          />
        </div>
      </div>
      <div className={styles.Connexion}>
        {welcomeMessage && (
          <div className={styles.WelcomeMessage}>{welcomeMessage}</div>
        )}
        {errorMessage && (
          <div className={styles.ErrorMessage}>{errorMessage}</div>
        )}
        {isLogin ? (
          <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Email"
                  type="email"
                  id="login-email"
                  name="email"
                  required
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              <div>
                <div className={styles.pwdLook}>
                  <input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className={styles.inputClass}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className={styles.eyes}
                  >
                    <img
                      src={showPassword ? eyeClosed : eye}
                      alt={showPassword ? "Cacher" : "Montrer"}
                    />
                  </button>
                </div>
              </div>
              <button type="submit" className={styles.submit}>
                <strong>Connection</strong>
              </button>
            </form>
            <p className={`${styles.submit} ${styles.yet}`}>
              No account yet?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className={`${styles.toggleForm} ${styles.yet}`}
              >
                Register
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Surname"
                  type="text"
                  id="register-lastname"
                  name="lastname"
                  required
                  onChange={handleChange}
                  autoComplete="lastname"
                />
              </div>
              <div>
                <input
                  placeholder="Firstname"
                  type="text"
                  id="register-firstname"
                  name="firstname"
                  required
                  onChange={handleChange}
                  autoComplete="firstname"
                />
              </div>
              <div>
                <input
                  placeholder="Nickname"
                  type="text"
                  id="register-username"
                  name="username"
                  required
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
              <div>
                <input
                  placeholder="Email"
                  type="email"
                  id="register-email"
                  name="email"
                  required
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="register-password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  autoComplete="new-password"
                  className={`${styles.inputClass2} ${
                    passwordsMatch
                      ? styles.PasswordMatch
                      : styles.PasswordMismatch
                  }`}
                />
              </div>
              <div>
                <div className={styles.pwdLook}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-confirm-password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                    onChange={handleChange}
                    autoComplete="new-password"
                    className={`${styles.inputClass} ${
                      passwordsMatch
                        ? styles.PasswordMatch
                        : styles.PasswordMismatch
                    }`}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className={styles.eyes}
                  >
                    <img
                      src={showPassword ? eyeClosed : eye}
                      alt={showPassword ? "Cacher" : "Montrer"}
                    />
                  </button>
                </div>
              </div>
              <button type="submit" className={styles.submit}>
                Register
              </button>
            </form>
            <p>
              Already an account?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className={`${styles.toggleForm} ${styles.submit}`}
              >
                Connection
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connexion;
