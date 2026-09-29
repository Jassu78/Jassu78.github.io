import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./hooks/useTheme";
import { DEFAULT_THEME, resolveInitialTheme } from "./themes";
import "./styles.css";

try {
  document.documentElement.setAttribute("data-theme", resolveInitialTheme());
} catch {
  document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
}

try {
  localStorage.removeItem("craftlab-font");
} catch {
  /* ignore */
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
