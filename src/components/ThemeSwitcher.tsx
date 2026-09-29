import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { THEMES, type ThemeId } from "../themes";

type Props = {
  onOpenLauncher?: () => void;
};

export function ThemeSwitcher({ onOpenLauncher }: Props) {
  const { theme, setTheme, meta } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (id: ThemeId) => {
    setTheme(id);
    setOpen(false);
  };

  return (
    <div className="theme-switcher" ref={rootRef}>
      <button
        type="button"
        className={`theme-switcher__trigger${open ? " is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        title={meta.tagline}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="theme-switcher__swatches" aria-hidden>
          {meta.swatches.map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </span>
        <span className="theme-switcher__label">{meta.label}</span>
        <span className="theme-switcher__caret" aria-hidden>
          ▾
        </span>
      </button>

      {open ? (
        <ul id={listId} className="theme-switcher__menu" role="listbox" aria-label="Color theme">
          {THEMES.map((t) => (
            <li key={t.id} role="option" aria-selected={t.id === theme}>
              <button
                type="button"
                className={`theme-switcher__option${t.id === theme ? " is-active" : ""}`}
                onClick={() => pick(t.id)}
              >
                <span className="theme-switcher__swatches" aria-hidden>
                  {t.swatches.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
                <span className="theme-switcher__option-copy">
                  <span className="theme-switcher__option-name">{t.label}</span>
                  <span className="theme-switcher__option-tag">{t.tagline}</span>
                </span>
              </button>
            </li>
          ))}
          {onOpenLauncher ? (
            <li className="theme-switcher__menu-foot">
              <button
                type="button"
                className="theme-switcher__coverflow"
                onClick={() => {
                  setOpen(false);
                  onOpenLauncher();
                }}
              >
                Coverflow · ⌃⌥T
              </button>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
