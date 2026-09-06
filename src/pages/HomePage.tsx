import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { BentoTile } from "../components/BentoTile";
import { CertTrain } from "../components/CertTrain";
import { ExperienceCard } from "../components/ExperienceCard";
import { HeroMiniTerm } from "../components/HeroMiniTerm";
import { PageTransition } from "../components/PageTransition";
import { SystemsHeroPreview } from "../components/SystemsExplorer";
import { experience, findCaseStudy, findProject, homeHighlights, homeSystemBands, person, proofRail } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

/** Same order as Projects primary — even 2×3 grid on Home. */
const FEATURED_SLUGS = [
  "codeoracle",
  "ai-companion",
  "job-watch-lab",
  "linux-kiosk",
  "glasspdf",
  "oci-lab",
] as const;

function featuredTile(slug: (typeof FEATURED_SLUGS)[number]) {
  const study = findCaseStudy(slug);
  if (study) {
    return {
      slug,
      to: `/projects/${slug}`,
      label: study.category ?? "Project",
      title: study.title,
      subtitle: study.subtitle,
      tags: study.tags,
      status: study.status,
    };
  }
  const project = findProject(slug);
  if (!project) return null;
  return {
    slug,
    to: `/projects/${slug}`,
    label:
      project.kind === "lab"
        ? "Personal"
        : project.kind === "hackathon"
          ? "Hackathon"
          : "Public",
    title: project.name,
    subtitle: project.blurb,
    tags: project.stack,
    status: project.status,
  };
}

const featured = FEATURED_SLUGS.map(featuredTile).filter(
  (t): t is NonNullable<typeof t> => Boolean(t),
);

export function HomePage() {
  usePageTitle("Jaswanth Jogi — Software Engineer");
  const reduce = useReducedMotion();

  return (
    <PageTransition>
      <div className="shell shell--page shell--home">
        <section className="hero hero--first-fold" aria-label="Introduction">
          <div>
            <motion.p
              className="hero__kicker"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              AI systems · backend · embedded Linux
            </motion.p>
            <motion.h1
              className="hero__name"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {person.name}
            </motion.h1>
            <motion.p
              className="hero__headline"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
            >
              {person.headline}
            </motion.p>
            <motion.p
              className="hero__lede"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              {person.lede}
            </motion.p>
            <motion.div
              className="hero__actions"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
            >
              <Link to="/projects" className="btn btn--primary">
                Projects
              </Link>
              <Link to="/work" className="btn btn--ghost">
                Work
              </Link>
              <Link to="/about" className="btn btn--ghost">
                About
              </Link>
            </motion.div>
            <div className="hero__meta">
              <a href={person.github}>GitHub</a>
              <a href={person.linkedin}>LinkedIn</a>
              <a href={`mailto:${person.email}`}>Email</a>
              <span>{person.location}</span>
            </div>
            <div className="proof-rail proof-rail--in-hero" aria-label="Role and proof">
              <p className="proof-rail__identity">{proofRail.identity}</p>
              <ul className="proof-rail__chips">
                {proofRail.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>
            <HeroMiniTerm />
            <p className="hero__rice-hint">
              Themes ·{" "}
              <button
                type="button"
                className="hero__rice-link"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("craftlab:theme-launcher"))
                }
              >
                open launcher
              </button>{" "}
              · <kbd className="hero__kbd">⌃</kbd>
              <kbd className="hero__kbd">⌥</kbd>
              <kbd className="hero__kbd">T</kbd>
            </p>
          </div>

          <motion.div
            className="hero__panel"
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SystemsHeroPreview />
          </motion.div>
        </section>

        <section className="section section--band">
          <div className="section__head">
            <h2 className="section__title">Work</h2>
            <Link to="/work" className="section__hint">
              full experience →
            </Link>
          </div>
          <div className="exp-grid exp-grid--home">
            {experience.slice(0, 3).map((job) => (
              <ExperienceCard key={`${job.role}-${job.org}`} job={job} compact />
            ))}
          </div>
        </section>

        <section className="section section--band">
          <div className="section__head">
            <h2 className="section__title">Featured work</h2>
            <Link to="/projects" className="section__hint">
              all projects →
            </Link>
          </div>
          <div className="bento bento--home">
            {featured.map((item, i) => (
              <BentoTile
                key={item.slug}
                index={i}
                to={item.to}
                label={item.label}
                title={item.title}
                subtitle={item.subtitle}
                tags={item.tags.slice(0, 4)}
                status={item.status}
                variant={
                  item.slug === "codeoracle" || item.slug === "job-watch-lab"
                    ? "accent"
                    : item.slug === "linux-kiosk" || item.slug === "oci-lab"
                      ? "edge"
                      : "default"
                }
              />
            ))}
          </div>
        </section>

        <section className="section section--band" aria-label="Impact">
          <div className="section__head">
            <h2 className="section__title">Impact</h2>
            <Link to="/achievements" className="section__hint">
              achievements →
            </Link>
          </div>

          <div className="impact impact--home">
            <div className="impact__career">
              <p className="impact__eyebrow">Product & career</p>
              <div className="impact__grid" aria-label="Product and career impact">
                {homeHighlights.map((h) => (
                  <div key={h.label} className="impact-stat">
                    <p className="impact-stat__value">{h.value}</p>
                    <div className="impact-stat__copy">
                      <p className="impact-stat__label">{h.label}</p>
                      <p className="impact-stat__note">{h.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="impact__systems">
              <p className="impact__eyebrow">Side systems</p>
              <div className="impact__system-grid">
                {homeSystemBands.map((band) => (
                  <article
                    key={band.id}
                    className={`impact-system impact-system--${band.tone ?? "oracle"}`}
                  >
                    <div className="impact-system__head">
                      <h3 className="impact-system__title">{band.title}</h3>
                      <Link to={band.to} className="impact-system__link">
                        View →
                      </Link>
                    </div>
                    <ul className="impact-system__list">
                      {band.highlights.map((h) => (
                        <li key={h.label}>
                          <span className="impact-system__value">{h.value}</span>
                          <span className="impact-system__meta">
                            <span className="impact-system__label">{h.label}</span>
                            <span className="impact-system__note">{h.note}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--band section--band-certs">
          <CertTrain />
        </section>

        <section className="section section--band section--contact">
          <div className="section__head">
            <h2 className="section__title">Contact</h2>
          </div>
          <p className="section__lede contact-band__lede">
            {person.availability}. Prefer email or LinkedIn.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <a className="btn btn--ghost" href={person.linkedin}>
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
