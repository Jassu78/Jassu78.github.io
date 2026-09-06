import { ExperienceCard } from "../components/ExperienceCard";
import { PageTransition } from "../components/PageTransition";
import { education, experience, person, stack } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

const stackLabels: Record<keyof typeof stack, string> = {
  ai: "AI",
  backend: "Backend",
  device: "Device / Linux",
  frontend: "Frontend",
  cloud: "Cloud & Ops",
  languages: "Languages",
};

export function ExperiencePage() {
  usePageTitle("Work — Jaswanth Jogi");

  return (
    <PageTransition>
      <div className="shell shell--page">
        <header className="page-intro">
          <h1 className="page-title">Work</h1>
          <p className="page-lede">
            Impact and numbers first — expand a role for architecture detail.{" "}
            {person.availability}.
          </p>
        </header>

        <section className="section section--band">
          <div className="exp-grid">
            {experience.map((job) => (
              <ExperienceCard key={`${job.role}-${job.org}`} job={job} />
            ))}
          </div>
        </section>

        <section className="section section--band">
          <div className="section__head">
            <h2 className="section__title">Education</h2>
          </div>
          <div className="info-cards">
            {education.map((ed) => (
              <article key={ed.degree} className="info-card">
                <h3 className="info-card__title">{ed.degree}</h3>
                <p className="info-card__meta">{ed.school}</p>
                <p className="info-card__meta">{ed.dates}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--band">
          <div className="section__head">
            <h2 className="section__title">Skills</h2>
          </div>
          <div className="stack-grid">
            {(Object.keys(stack) as (keyof typeof stack)[]).map((key) => (
              <div key={key} className="info-card">
                <p className="exp-card__cluster-label">{stackLabels[key]}</p>
                <div className="exp-card__tags">
                  {stack[key].map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
