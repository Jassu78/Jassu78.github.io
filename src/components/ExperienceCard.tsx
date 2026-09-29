import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { ExperienceRole } from "../content";

type Props = {
  job: ExperienceRole;
  /** Compact home: impact + metrics only */
  compact?: boolean;
  defaultOpen?: boolean;
};

export function ExperienceCard({ job, compact = false, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen && !compact);
  const reduce = useReducedMotion();
  const hasDetail =
    Boolean(job.detailSections?.length) || job.bullets.length > 0 || Boolean(job.summary);
  const metrics = job.metrics?.slice(0, compact ? 4 : 6) ?? [];
  const highlights = job.highlights?.slice(0, compact ? 3 : 6) ?? [];

  return (
    <article className={`exp-card${open ? " exp-card--open" : ""}${compact ? " exp-card--compact" : ""}`}>
      <header className="exp-card__head">
        <div>
          <p className="exp-card__org">{job.org}</p>
          <h3 className="exp-card__role">{job.role}</h3>
          <p className="exp-card__dates">{job.dates}</p>
        </div>
        {job.caseSlugs?.length ? (
          <div className="exp-card__cases">
            {job.caseSlugs.slice(0, 3).map((slug) => (
              <Link key={slug} to={`/projects/${slug}`} className="exp-card__case">
                {slug === "ai-companion"
                  ? "Companion"
                  : slug === "adaptive-tutor"
                    ? "Tutor"
                    : slug === "linux-kiosk"
                      ? "Linux"
                      : slug === "meeting-summarizer"
                        ? "Meeting AI"
                        : "Project"}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <p className="exp-card__impact">{job.impact}</p>

      {metrics.length ? (
        <div className="exp-metrics" aria-label="Impact">
          {metrics.map((m) => (
            <div key={`${m.label}-${m.value}`} className="exp-metric">
              <p className="exp-metric__value">{m.value}</p>
              <p className="exp-metric__label">{m.label}</p>
              {m.note && !compact ? <p className="exp-metric__note">{m.note}</p> : null}
            </div>
          ))}
        </div>
      ) : null}

      {highlights.length ? (
        <ul className="exp-highlights">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}

      {!compact && !open ? (
        <div className="exp-card__peek">
          <p className="exp-card__cluster-label">Focus</p>
          <div className="exp-card__tags">
            {job.concepts.slice(0, 5).map((c) => (
              <span key={c} className="tag tag--concept">
                {c}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {hasDetail && !compact ? (
        <button
          type="button"
          className="exp-card__toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide details" : "View details"}
        </button>
      ) : null}

      {compact ? (
        <div className="exp-card__compact-actions">
          {highlights.length || metrics.length > 2 ? (
            <button
              type="button"
              className="exp-card__toggle exp-card__toggle--mobile"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Show less" : "Show more"}
            </button>
          ) : null}
          {hasDetail ? (
            <Link to="/work" className="exp-card__more">
              Full experience →
            </Link>
          ) : null}
        </div>
      ) : null}

      <AnimatePresence initial={false}>
        {open && !compact ? (
          <motion.div
            className="exp-card__detail"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {job.summary ? <p className="exp-card__summary">{job.summary}</p> : null}

            <div className="exp-card__clusters">
              <div>
                <p className="exp-card__cluster-label">Systems</p>
                <div className="exp-card__tags">
                  {job.systems.map((s) => (
                    <span key={s} className="tag tag--system">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="exp-card__cluster-label">Concepts</p>
                <div className="exp-card__tags">
                  {job.concepts.map((c) => (
                    <span key={c} className="tag tag--concept">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {job.detailSections?.length ? (
              <div className="exp-sections">
                {job.detailSections.map((section) => (
                  <div key={section.title} className="exp-section">
                    <h4 className="exp-section__title">{section.title}</h4>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : job.bullets.length ? (
              <ul className="exp-card__bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
