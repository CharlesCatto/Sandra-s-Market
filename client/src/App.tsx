import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { useEffect } from "react";
import "./App.css";

function App() {
  const location = useLocation();

  const knownPaths: string[] = ["/home", "/about", "/contact", "/quiz"]; // Constant

  useEffect(() => {
    document.body.className = "body-default";

    if (location.pathname === "/") {
      document.body.classList.add("body-home");
    } else if (!knownPaths.some((path) => location.pathname.startsWith(path))) {
      document.body.classList.add("body-error");
    }
  }, [location]);

  // Check if the current route is the Finder page
  const isFinderPage = location.pathname === "/finder";

  return (
    <div className="appContainer">
      {" "}
      {/* Use the CSS module class */}
      <NavBar />
      <main className="pages">
        <Outlet /> {/* This renders the matched route component */}
      </main>
      {/* Conditionally render the Footer */}
      {!isFinderPage && <Footer />}
    </div>
  );
}

export default App;
