export type ThemeId =
  | "lumen"
  | "everforest"
  | "kanagawa"
  | "gruvbox"
  | "nord"
  | "tokyonight"
  | "voltage";

export type ThemeMeta = {
  id: ThemeId;
  label: string;
  tagline: string;
  swatches: [string, string, string];
};

/** Menu / cycle order: light high-contrast → soft rices → deep high-contrast */
export const THEMES: ThemeMeta[] = [
  {
    id: "lumen",
    label: "Lumen",
    tagline: "warm paper · high contrast",
    swatches: ["#f6f3ee", "#1d1d1d", "#f5c518"],
  },
  {
    id: "everforest",
    label: "Everforest",
    tagline: "soft moss · calm rice",
    swatches: ["#1e2326", "#a7c080", "#7fbbb3"],
  },
  {
    id: "kanagawa",
    label: "Kanagawa",
    tagline: "ink wave · sakura accent",
    swatches: ["#1f1f28", "#7e9cd8", "#d27e99"],
  },
  {
    id: "gruvbox",
    label: "Gruvbox",
    tagline: "warm charcoal · vim classic",
    swatches: ["#1d2021", "#b8bb26", "#fe8019"],
  },
  {
    id: "nord",
    label: "Nord",
    tagline: "polar frost · max scan",
    swatches: ["#2e3440", "#88c0d0", "#a3be8c"],
  },
  {
    id: "tokyonight",
    label: "Tokyo Night",
    tagline: "VS Code storm · blue glow",
    swatches: ["#1a1b26", "#7aa2f7", "#bb9af7"],
  },
  {
    id: "voltage",
    label: "Voltage",
    tagline: "deep black · yellow highlight",
    swatches: ["#0a0a0a", "#f5f5f5", "#f5c518"],
  },
];

/** Fallback when `prefers-color-scheme` is unavailable */
export const DEFAULT_THEME: ThemeId = "lumen";
export const THEME_STORAGE_KEY = "craftlab-theme";

export function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

/** First-visit default from OS — light → Lumen, dark → Voltage */
export function preferredThemeFromSystem(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "voltage";
    }
  } catch {
    /* ignore */
  }
  return "lumen";
}

/** Stored choice wins; otherwise OS preference */
export function resolveInitialTheme(): ThemeId {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeId(raw)) return raw;
  } catch {
    /* ignore */
  }
  return preferredThemeFromSystem();
}
