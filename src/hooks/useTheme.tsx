import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEMES,
  resolveInitialTheme,
  type ThemeId,
  type ThemeMeta,
} from "../themes";

type ThemeContextValue = {
  theme: ThemeId;
  meta: ThemeMeta;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() =>
    typeof window === "undefined" ? DEFAULT_THEME : resolveInitialTheme(),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    try {
      const umami = (
        window as Window & {
          umami?: { track: (name: string, data?: Record<string, string>) => void };
        }
      ).umami;
      umami?.track("theme_change", { theme: id });
    } catch {
      /* ignore */
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const idx = THEMES.findIndex((t) => t.id === current);
      const next = THEMES[(idx + 1) % THEMES.length]!.id;
      try {
        const umami = (
          window as Window & {
            umami?: { track: (name: string, data?: Record<string, string>) => void };
          }
        ).umami;
        umami?.track("theme_change", { theme: next });
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const meta = useMemo(
    () => THEMES.find((t) => t.id === theme) ?? THEMES[0]!,
    [theme],
  );

  const value = useMemo(
    () => ({ theme, meta, setTheme, cycleTheme }),
    [theme, meta, setTheme, cycleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
