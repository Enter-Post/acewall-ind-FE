import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalProvider";
import ScrollToTop from "./lib/scrolltop";
import { CourseProvider } from "./Context/CoursesProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <CourseProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </CourseProvider>
    </GlobalProvider>
  </StrictMode>
);
