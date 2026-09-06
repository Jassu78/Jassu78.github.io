import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArchitectureBoard } from "../components/ArchitectureBoard";
import { CLI_BOOT_KEY } from "../components/HeroMiniTerm";
import { PageTransition } from "../components/PageTransition";
import { Terminal, type CliSelection } from "../components/Terminal";
import { usePageTitle } from "../hooks/usePageTitle";

type CliNavState = { boot?: string } | null;
type CliTab = "shell" | "preview";

/** Peek only — do not clear here (Strict Mode can double-run state initializers). */
function peekBoot(state: unknown): string | undefined {
  const fromNav = (state as CliNavState)?.boot?.trim();
  if (fromNav) return fromNav;
  try {
    return sessionStorage.getItem(CLI_BOOT_KEY)?.trim() || undefined;
  } catch {
    return undefined;
  }
}

function PreviewPane({ selection }: { selection: CliSelection }) {
  if (!selection) {
    return (
      <p className="cli-preview__empty">
        empty
        <br />
        <code>cat &lt;slug&gt;</code> or <code>arch &lt;slug&gt;</code>
      </p>
    );
  }

  if (selection.type === "case") {
    return (
      <>
        <div className="cli-preview__scroll">
          <div className="bento__tags">
            <span className="tag">{selection.data.year}</span>
            <span className="tag">{selection.data.scope}</span>
            {selection.data.status ? (
              <span className="status-pill">{selection.data.status}</span>
            ) : null}
          </div>
          <h2 className="cli-preview__title">{selection.data.title}</h2>
          <p className="cli-preview__sub">{selection.data.subtitle}</p>
          <div className="cli-preview__block">
            <h3>Problem</h3>
            <p>{selection.data.problem}</p>
          </div>
          <div className="cli-preview__block">
            <h3>Constraints</h3>
            <ul>
              {selection.data.constraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <ArchitectureBoard
            className="arch-board--stack"
            layers={selection.data.layers}
            caption="Architecture"
          />
        </div>
        <div className="cli-preview__actions">
          <Link className="btn btn--primary" to={`/projects/${selection.data.slug}`}>
            Full project →
          </Link>
          {selection.data.live ? (
            <a
              className="btn btn--ghost"
              href={selection.data.live}
              target="_blank"
              rel="noreferrer"
            >
              Live
            </a>
          ) : null}
          {selection.data.code ? (
            <a
              className="btn btn--ghost"
              href={selection.data.code}
              target="_blank"
              rel="noreferrer"
            >
              Code
            </a>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="cli-preview__scroll">
        <div className="bento__tags">
          <span className="tag">{selection.data.year}</span>
          <span className="tag">{selection.data.kind}</span>
        </div>
        <h2 className="cli-preview__title">{selection.data.name}</h2>
        <p className="cli-preview__sub">{selection.data.detail}</p>
        <div className="cli-preview__block">
          <h3>Highlights</h3>
          <ul>
            {selection.data.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        {selection.data.layers?.length ? (
          <ArchitectureBoard
            className="arch-board--stack"
            layers={selection.data.layers}
            caption="Shape"
          />
        ) : null}
      </div>
      <div className="cli-preview__actions">
        <Link className="btn btn--primary" to={`/projects/${selection.data.slug}`}>
          Full project →
        </Link>
        {selection.data.live ? (
          <a
            className="btn btn--ghost"
            href={selection.data.live}
            target="_blank"
            rel="noreferrer"
          >
            Live
          </a>
        ) : null}
        {selection.data.code ? (
          <a
            className="btn btn--ghost"
            href={selection.data.code}
            target="_blank"
            rel="noreferrer"
          >
            Code
          </a>
        ) : null}
      </div>
    </>
  );
}

export function CliPage() {
  usePageTitle("/cli — Jaswanth Jogi");
  const [selection, setSelection] = useState<CliSelection>(null);
  const [tab, setTab] = useState<CliTab>("shell");
  const location = useLocation();
  const [boot] = useState(() => peekBoot(location.state));

  useEffect(() => {
    if (selection) setTab("preview");
  }, [selection]);

  const onSelect = (next: CliSelection) => {
    setSelection(next);
    if (next) setTab("preview");
  };

  return (
    <PageTransition>
      <div className="shell shell--wide shell--page cli-page">
        <header className="page-intro">
          <Link to="/" className="back-link">
            ← home
          </Link>
          <h1 className="page-title">/cli</h1>
          <p className="page-lede">
            Text shell for browsing projects. Diagrams open in the preview pane —
            the scrollback stays monospace. The HTML site is primary.
          </p>
        </header>

        <div className="cli-tabs" role="tablist" aria-label="CLI panels">
          <button
            type="button"
            role="tab"
            id="cli-tab-shell"
            aria-controls="cli-panel-shell"
            aria-selected={tab === "shell"}
            className={`cli-tabs__btn${tab === "shell" ? " is-active" : ""}`}
            onClick={() => setTab("shell")}
          >
            Shell
          </button>
          <button
            type="button"
            role="tab"
            id="cli-tab-preview"
            aria-controls="cli-panel-preview"
            aria-selected={tab === "preview"}
            className={`cli-tabs__btn${tab === "preview" ? " is-active" : ""}`}
            onClick={() => setTab("preview")}
          >
            Preview
            {selection ? <span className="cli-tabs__dot" aria-hidden /> : null}
          </button>
        </div>

        <div className={`cli-workspace cli-workspace--${tab}`}>
          <div
            id="cli-panel-shell"
            role="tabpanel"
            aria-labelledby="cli-tab-shell"
            className="cli-workspace__shell"
          >
            <Terminal autofocus={tab === "shell"} bootCommand={boot} onSelect={onSelect} />
          </div>

          <aside
            id="cli-panel-preview"
            role="tabpanel"
            aria-labelledby="cli-tab-preview"
            className="cli-preview"
            aria-live="polite"
          >
            <PreviewPane selection={selection} />
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
