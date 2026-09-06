import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../hooks/useTheme";
import { THEMES, type ThemeId, type ThemeMeta } from "../themes";

const HINT_KEY = "craftlab-theme-launcher-hint";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

/** Signed offset from active index, shortest wrap around the theme list */
function offsetFrom(active: number, index: number, len: number) {
  let d = index - active;
  const half = Math.floor(len / 2);
  if (d > half) d -= len;
  if (d < -half) d += len;
  return d;
}

function ThemePreview({ theme }: { theme: ThemeMeta }) {
  const [bg, accent, accent2] = theme.swatches;
  return (
    <div
      className="coverflow__preview"
      style={
        {
          "--p-bg": bg,
          "--p-a": accent,
          "--p-b": accent2,
        } as CSSProperties
      }
      aria-hidden
    >
      <div className="coverflow__preview-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="coverflow__preview-grid">
        <div className="coverflow__win coverflow__win--code">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="coverflow__win coverflow__win--mon">
          <b />
          <b />
          <b />
        </div>
        <div className="coverflow__win coverflow__win--term">
          <em />
          <em />
          <em />
        </div>
        <div className="coverflow__win coverflow__win--files">
          <u />
          <u />
          <u />
          <u />
        </div>
      </div>
    </div>
  );
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ThemeLauncher({ open, onOpenChange }: Props) {
  const { theme, setTheme } = useTheme();
  const reduce = useReducedMotion();
  const titleId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const baseline = useRef<ThemeId>(theme);
  const [cursor, setCursor] = useState(0);
  const [hint, setHint] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const close = useCallback(
    (restore: boolean) => {
      if (restore) setTheme(baseline.current);
      onOpenChange(false);
    },
    [onOpenChange, setTheme],
  );

  const applyAndClose = useCallback(
    (id: ThemeId) => {
      setTheme(id);
      baseline.current = id;
      onOpenChange(false);
    },
    [onOpenChange, setTheme],
  );

  const go = useCallback((i: number) => {
    setCursor(((i % THEMES.length) + THEMES.length) % THEMES.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      // Use e.code — on macOS Option/Alt remaps e.key (e.g. †), so "t" never matches.
      const isThemeChord =
        e.ctrlKey && e.altKey && !e.metaKey && e.code === "KeyT";
      if (!isThemeChord) return;
      e.preventDefault();
      e.stopPropagation();
      if (open) close(true);
      else onOpenChange(true);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, onOpenChange, close]);

  // One-shot discoverability hint (session)
  useEffect(() => {
    try {
      if (sessionStorage.getItem(HINT_KEY)) return;
      sessionStorage.setItem(HINT_KEY, "1");
      setHint(true);
      const id = window.setTimeout(() => setHint(false), 9000);
      return () => window.clearTimeout(id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    baseline.current = theme;
    const idx = THEMES.findIndex((t) => t.id === theme);
    setCursor(idx >= 0 ? idx : 0);
    requestAnimationFrame(() => {
      trackRef.current?.querySelector<HTMLElement>("[data-cover-active]")?.focus();
    });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps -- only on open

  useEffect(() => {
    if (!open) return;
    const id = THEMES[cursor]?.id;
    if (id) setTheme(id);
  }, [cursor, open, setTheme]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const id = THEMES[cursor]?.id;
        if (id) applyAndClose(id);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "l" || e.key === "j") {
        e.preventDefault();
        go(cursor + 1);
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "h" || e.key === "k") {
        e.preventDefault();
        go(cursor - 1);
        return;
      }
      const num = Number(e.key);
      if (num >= 1 && num <= THEMES.length) {
        e.preventDefault();
        go(num - 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, cursor, close, applyAndClose, go]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Wheel / trackpad horizontal feel
  useEffect(() => {
    if (!open) return;
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 8 && Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      const dir = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      go(cursor + (dir > 0 ? 1 : -1));
      window.setTimeout(() => {
        locked = false;
      }, 280);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [open, cursor, go]);

  const front = THEMES[cursor]!;

  const portal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {open ? (
              <motion.div
                className="theme-launcher"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <button
                  type="button"
                  className="theme-launcher__scrim"
                  aria-label="Close theme launcher"
                  onClick={() => close(true)}
                />
                <motion.div
                  className="theme-launcher__panel theme-launcher__panel--coverflow"
                  initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                >
                  <header className="theme-launcher__head">
                    <div>
                      <p className="theme-launcher__eyebrow">themes · coverflow</p>
                      <h2 id={titleId} className="theme-launcher__title">
                        Themes
                      </h2>
                    </div>
                    <p className="theme-launcher__chord">
                      <kbd>⌃</kbd>
                      <kbd>⌥</kbd>
                      <kbd>T</kbd>
                    </p>
                  </header>

                  <div
                    className={`coverflow${reduce || narrow ? " coverflow--flat" : ""}`}
                    aria-roledescription="carousel"
                    aria-label="Theme coverflow"
                  >
                    <div className="coverflow__scene" ref={trackRef}>
                      {THEMES.map((t, i) => {
                        const offset = offsetFrom(cursor, i, THEMES.length);
                        const active = offset === 0;
                        const abs = Math.abs(offset);
                        const flat = reduce || narrow;
                        const rotateY = flat ? 0 : offset * -42;
                        const x = flat
                          ? offset * (narrow ? 78 : 108)
                          : offset * 118;
                        const scale = active ? 1 : Math.max(0.62, 1 - abs * 0.16);
                        const opacity = active
                          ? 1
                          : narrow
                            ? abs > 1
                              ? 0
                              : 0.45
                            : Math.max(0.35, 1 - abs * 0.28);
                        const z = 20 - abs;

                        return (
                          <motion.button
                            key={t.id}
                            type="button"
                            className={`coverflow__card${active ? " is-active" : ""}`}
                            data-cover-active={active ? "" : undefined}
                            aria-label={`${t.label}${active ? ", selected" : ""}`}
                            aria-current={active ? "true" : undefined}
                            style={
                              {
                                zIndex: z,
                                transformPerspective: 1100,
                                transformOrigin: "center center",
                                "--sw1": t.swatches[0],
                                "--sw2": t.swatches[1],
                                "--sw3": t.swatches[2],
                              } as CSSProperties
                            }
                            animate={{
                              x,
                              rotateY,
                              scale,
                              opacity,
                            }}
                            transition={
                              reduce
                                ? { duration: 0.15 }
                                : { type: "spring", stiffness: 320, damping: 28 }
                            }
                            onClick={() => {
                              if (active) applyAndClose(t.id);
                              else go(i);
                            }}
                          >
                            <ThemePreview theme={t} />
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="coverflow__caption">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={front.id}
                          className="coverflow__name"
                          initial={reduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                        >
                          {front.label}
                        </motion.p>
                      </AnimatePresence>
                      <p className="coverflow__tag">{front.tagline}</p>
                      <button
                        type="button"
                        className="coverflow__apply"
                        onClick={() => applyAndClose(front.id)}
                      >
                        Apply · ↵
                      </button>
                    </div>
                  </div>

                  <footer className="theme-launcher__foot">
                    <span>
                      <kbd>←</kbd>
                      <kbd>→</kbd> slide
                    </span>
                    <span>
                      <kbd>↵</kbd> apply
                    </span>
                    <span>
                      <kbd>esc</kbd> revert
                    </span>
                    <span>scroll / click side</span>
                  </footer>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  const hintPortal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {hint && !open ? (
              <motion.aside
                className="theme-hint"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                role="status"
              >
                <div className="theme-hint__copy">
                  <span className="theme-hint__label">Rice themes</span>
                  <span className="theme-hint__body">
                    Coverflow launcher — try a look
                  </span>
                </div>
                <span className="theme-hint__keys">
                  <kbd>Ctrl</kbd>
                  <kbd>Alt</kbd>
                  <kbd>T</kbd>
                </span>
                <button
                  type="button"
                  className="theme-hint__open"
                  onClick={() => {
                    setHint(false);
                    onOpenChange(true);
                  }}
                >
                  Open
                </button>
                <button
                  type="button"
                  className="theme-hint__dismiss"
                  aria-label="Dismiss"
                  onClick={() => setHint(false)}
                >
                  ×
                </button>
              </motion.aside>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      {portal}
      {hintPortal}
    </>
  );
}

export function openThemeLauncherEvent() {
  window.dispatchEvent(new CustomEvent("craftlab:theme-launcher"));
}
