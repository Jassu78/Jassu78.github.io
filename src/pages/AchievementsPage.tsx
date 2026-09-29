import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { achievements, certifications, type Certification } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

const toneMark: Record<NonNullable<(typeof achievements)[number]["tone"]>, string> = {
  summit: "★",
  orbit: "◈",
  rise: "▲",
  forge: "◆",
};

function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL;
  return `${base.endsWith("/") ? base : `${base}/`}${path.replace(/^\//, "")}`;
}

function CertBadge({ cert }: { cert: Certification }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(cert.badgeImageUrl) && !failed;

  if (showImage && cert.badgeImageUrl) {
    return (
      <img
        className="cert-tile__badge"
        src={assetUrl(cert.badgeImageUrl)}
        alt=""
        width={88}
        height={88}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="cert-tile__badge cert-tile__badge--mark" aria-hidden="true">
      <span className="cert-tile__mark-text">{cert.badgeMark}</span>
    </span>
  );
}

export function AchievementsPage() {
  usePageTitle("Achievements — Jaswanth Jogi");
  const reduce = useReducedMotion();

  return (
    <PageTransition>
      <div className="shell shell--page">
        <header className="achieve-hero">
          <p className="achieve-hero__kicker">Proof that landed</p>
          <h1 className="page-title achieve-hero__title">Achievements</h1>
          <p className="page-lede achieve-hero__lede">
            Wins with a trail — each one opens Experience or a Project. Credly-backed
            certifications with badges sit below.
          </p>
        </header>

        <section className="achieve-band" aria-label="Achievements">
          <ol className="achieve-grid">
            {achievements.map((a, i) => {
              const tone = a.tone ?? "summit";
              return (
                <motion.li
                  key={a.title}
                  className={`achieve-tile achieve-tile--${tone}`}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={reduce ? undefined : { y: -5 }}
                  whileFocus={reduce ? undefined : { y: -5 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="achieve-tile__rail" aria-hidden="true">
                    <span className="achieve-tile__mark">{toneMark[tone]}</span>
                    <span className="achieve-tile__index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="achieve-tile__body">
                    {a.year ? <p className="achieve-tile__year">{a.year}</p> : null}
                    <h2 className="achieve-tile__title">{a.title}</h2>
                    <p className="achieve-tile__detail">{a.detail}</p>
                    {a.links?.length ? (
                      <div className="achieve-tile__links">
                        {a.links.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="achieve-tile__link"
                          >
                            {link.label}
                            <span aria-hidden="true"> →</span>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </section>

        <section className="cert-section" aria-labelledby="cert-heading">
          <div className="cert-section__head">
            <p className="cert-section__kicker">Credentials</p>
            <h2 id="cert-heading" className="section__title">
              Certifications
            </h2>
            <p className="cert-section__lede">
              Verified credentials — badge opens the issuer proof where available.
            </p>
          </div>

          <ul className="cert-grid">
            {certifications.map((c) => {
              const body = (
                <>
                  <CertBadge cert={c} />
                  <div className="cert-tile__meta">
                    <p className="cert-tile__issuer">{c.issuer}</p>
                    <p className="cert-tile__name">{c.name}</p>
                    {c.year ? <p className="cert-tile__year">{c.year}</p> : null}
                    {c.credentialUrl ? (
                      <span className="cert-tile__link">Credential →</span>
                    ) : null}
                  </div>
                </>
              );

              return (
                <li key={`${c.issuer}-${c.name}`} className="cert-tile">
                  {c.credentialUrl ? (
                    <a
                      className="cert-tile__hit"
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${c.name} — open credential`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="cert-tile__hit">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </PageTransition>
  );
}
