import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { getProjectCatalog, type ProjectCatalogItem } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

/** Primary showcase — everything else sits behind “Show more”. */
const PRIMARY_SLUGS = [
  "codeoracle",
  "ai-companion",
  "job-watch-lab",
  "linux-kiosk",
  "glasspdf",
  "oci-lab",
  "codegym-ai",
] as const;

function statusClass(status?: string) {
  if (!status) return "";
  const key = status.toLowerCase().replace(/\s+/g, "-");
  return `status-pill status-pill--${key}`;
}

function ProjectCard({ item }: { item: ProjectCatalogItem }) {
  return (
    <article className="proj-card">
      <Link to={`/projects/${item.slug}`} className="proj-card__main">
        <div className="proj-card__meta">
          <span className="proj-card__cat">{item.category}</span>
          <span className="proj-card__year">{item.year}</span>
          {item.status ? (
            <span className={statusClass(item.status)}>{item.status}</span>
          ) : null}
        </div>
        <h3 className="proj-card__title">{item.title}</h3>
        <p className="proj-card__sub">{item.subtitle}</p>
        {item.tags.length ? (
          <div className="proj-card__tags">
            {item.tags.slice(0, 4).map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </Link>
      <div className="proj-card__actions">
        {item.live ? (
          <a
            className="proj-card__action proj-card__action--live"
            href={item.live}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Live →
          </a>
        ) : null}
        {item.code ? (
          <a
            className="proj-card__action"
            href={item.code}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Git →
          </a>
        ) : null}
        <Link className="proj-card__action" to={`/projects/${item.slug}`}>
          Details →
        </Link>
      </div>
    </article>
  );
}

export function ProjectsPage() {
  usePageTitle("Projects — Jaswanth Jogi");
  const catalog = useMemo(() => getProjectCatalog(), []);
  const [moreOpen, setMoreOpen] = useState(false);

  const { primary, rest } = useMemo(() => {
    const bySlug = new Map(catalog.map((item) => [item.slug, item]));
    const primaryItems = PRIMARY_SLUGS.map((slug) => bySlug.get(slug)).filter(
      (item): item is ProjectCatalogItem => Boolean(item),
    );
    const primarySet = new Set(PRIMARY_SLUGS);
    const restItems = catalog.filter(
      (item) => !primarySet.has(item.slug as (typeof PRIMARY_SLUGS)[number]),
    );
    return { primary: primaryItems, rest: restItems };
  }, [catalog]);

  return (
    <PageTransition>
      <div className="shell shell--page">
        <header className="page-intro proj-index__head">
          <h1 className="page-title">Projects</h1>
          <p className="page-lede">
            Selected systems first — live links and git where they exist. More work sits below.
          </p>
        </header>

        <section className="proj-band" aria-label="Featured projects">
          <div className="proj-grid">
            {primary.map((item) => (
              <ProjectCard key={item.slug} item={item} />
            ))}
          </div>
        </section>

        {rest.length ? (
          <section className="proj-band" aria-label="More projects">
            <div className="proj-more">
              <button
                type="button"
                className="proj-more__toggle"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((v) => !v)}
              >
                {moreOpen
                  ? "Hide more projects"
                  : `Show more projects (${rest.length})`}
                <span className="proj-more__chevron" aria-hidden="true">
                  {moreOpen ? "▴" : "▾"}
                </span>
              </button>

              {moreOpen ? (
                <div className="proj-grid proj-grid--more">
                  {rest.map((item) => (
                    <ProjectCard key={item.slug} item={item} />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}
      </div>
    </PageTransition>
  );
}
