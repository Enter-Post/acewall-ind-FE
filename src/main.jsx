import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalProvider";
import ScrollToTop from "./lib/scrolltop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>
);
