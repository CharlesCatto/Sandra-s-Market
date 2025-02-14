import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
// import NotFound from "./Pages/NotFound";
import NotFound from "./Pages/Notfound/NotFound";
import MapPage from "./Pages/Map/Map";
import Connexion from "./Pages/connexion/Connexion";
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider
import { DataProvider } from "./contexts/DataContext"; // Import DataProvider

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/contact/:id", element: <Contact /> },
      { path: "/blog", element: <Blog /> },
      { path: "/finder", element: <MapPage /> },
      { path: "/connection", element: <Connexion /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Ensure your index.html contains <div id='root'></div>.",
  );
}

ReactDOM.createRoot(rootElement).render(
  <AuthProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </AuthProvider>,
);
