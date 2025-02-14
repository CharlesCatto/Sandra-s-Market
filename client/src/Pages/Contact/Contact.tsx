import { useState } from "react";
import styles from "./Contact.module.css";
import contactBG from "../../assets/contactBG.jpg";

function Contact() {
  const [findUs, setFindUs] = useState("");
  const [market, setMarket] = useState("");
  const [authorize, setAuthorize] = useState("");
  const [personalInfo, setPersonalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!findUs.trim()) {
      alert("Please tell us how you found us.");
      return;
    }

    if (!market.trim()) {
      alert("Please specify which Christmas Market you have.");
      return;
    }

    setIsSuccessful(authorize.toLowerCase() === "yes");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 2000);
  };

  const handlePlaceholderClick = (value: string) => {
    setFindUs(value);
  };

  return (
    <div
      className={styles.contactContainer}
      style={{ backgroundImage: `url(${contactBG})` }}
    >
      <h1 className={styles.h1title}>Share Your Christmas Market Story!</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="findUs">How did you find us?</label>
        <div className={styles.principles}>
          {[
            "Surfing the Internet",
            "By Conversation",
            "Social Media",
            "Advertisement",
            "Other",
          ].map((option) => (
            <button
              key={option}
              className={styles.placeholder}
              onClick={() => handlePlaceholderClick(option)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                handlePlaceholderClick(option)
              }
              type="button"
            >
              {option}
            </button>
          ))}
        </div>

        <input
          type="text"
          id="findUs"
          value={findUs}
          onChange={(e) => setFindUs(e.target.value)}
          placeholder="Enter how you found us"
          required
          className={styles.input}
        />

        <label htmlFor="market">What Christmas Market do you have?</label>
        <textarea
          id="market"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          placeholder="Describe your Christmas Market"
          required
          className={styles.textarea}
        />

        <label htmlFor="authorize">
          Do you authorize us to use your information?
        </label>
        <input
          type="text"
          id="authorize"
          value={authorize}
          onChange={(e) => setAuthorize(e.target.value)}
          placeholder="Yes or No"
          required
          className={styles.input}
        />

        <label htmlFor="personalInfo">Your Information</label>
        <textarea
          id="personalInfo"
          value={personalInfo}
          onChange={(e) => setPersonalInfo(e.target.value)}
          placeholder="Please share any additional information"
          required
          className={styles.textarea}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {isSubmitted && (
        <div className={styles.response}>
          {isSuccessful ? (
            <div className={styles.successAnimation}>
              <img
                src="https://c.tenor.com/Ln1NdYosAO0AAAAd/tenor.gif"
                alt="Success Animation"
              />
              <p>
                Thank you for your submission! We will review your Christmas
                Market story soon.
              </p>
            </div>
          ) : (
            <div className={styles.failureAnimation}>
              <img
                src="https://c.tenor.com/Ln1NdYosAO0AAAAd/tenor.gif"
                alt="Failure Animation"
              />
              <p>Oops! Something went wrong. Please try again later.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Contact;
