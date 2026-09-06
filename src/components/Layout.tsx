import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ThemeLauncher } from "./ThemeLauncher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { person } from "../content";
import { useTheme } from "../hooks/useTheme";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/achievements", label: "Achievements" },
  { to: "/about", label: "About" },
  { to: "/cli", label: "/cli", cli: true },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { meta } = useTheme();

  useEffect(() => {
    const onCustom = () => setThemeOpen(true);
    window.addEventListener("craftlab:theme-launcher", onCustom);
    return () => window.removeEventListener("craftlab:theme-launcher", onCustom);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="site">
      <header className="nav">
        <div className="shell nav__inner">
          <NavLink to="/" className="nav__brand" onClick={() => setOpen(false)}>
            <span className="nav__brand-full">{person.name}</span>
            <span className="nav__brand-short">JJ</span>
          </NavLink>

          <ul id="primary-nav" className={`nav__links${open ? " open" : ""}`}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `${isActive ? "active" : ""}${link.cli ? " nav__cli" : ""}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav__right">
            <ThemeSwitcher onOpenLauncher={() => setThemeOpen(true)} />
            <button
              type="button"
              className={`nav__toggle${open ? " is-open" : ""}`}
              aria-expanded={open}
              aria-controls="primary-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav__burger" aria-hidden>
                <i />
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <button
          type="button"
          className="nav__scrim"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <main className="site__main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {person.name} · {person.availability}
          </motion.p>
          <p>
            <a href={person.github}>GitHub</a>
            {" · "}
            <a href={person.linkedin}>LinkedIn</a>
            {" · "}
            <a href={`mailto:${person.email}`}>Email</a>
            {" · "}
            <button
              type="button"
              className="footer__theme-bind"
              onClick={() => setThemeOpen(true)}
              title={`${meta.label} · Ctrl+Alt+T`}
            >
              Themes · ⌃⌥T
            </button>
          </p>
        </div>
      </footer>

      <ThemeLauncher open={themeOpen} onOpenChange={setThemeOpen} />
    </div>
  );
}
