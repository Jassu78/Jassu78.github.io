import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { achievements, education, person, stack } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

const stackLabels: Record<keyof typeof stack, string> = {
  ai: "AI",
  backend: "Backend",
  device: "Device / Linux",
  frontend: "Frontend",
  cloud: "Cloud & Ops",
  languages: "Languages",
};

const focus = [
  "Agentic AI & orchestration",
  "Memory / RAG systems",
  "Backend APIs & workers",
  "Embedded Linux · Qt/QML",
  "Cursor · Claude Code · OpenCode",
  "Arch Linux daily driver",
];

export function AboutPage() {
  usePageTitle("About — Jaswanth Jogi");
  const paragraphs = person.summary.split("\n\n");

  return (
    <PageTransition>
      <div className="shell shell--page">
        <div className="about-intro">
          <div className="about-intro__copy">
            <h1 className="page-title about-intro__title">About</h1>
            {paragraphs.map((para) => (
              <p key={para.slice(0, 40)} className="about-intro__para">
                {para}
              </p>
            ))}
            <p className="about-intro__para about-intro__para--meta">
              {person.availability}. See{" "}
              <Link to="/projects">Projects</Link> for architecture and numbers, or{" "}
              <Link to="/work">Work</Link> for roles.
            </p>
            <p className="about-intro__para about-intro__para--meta about-intro__os">
              {person.os}
            </p>
          </div>

          <aside className="about-aside" aria-label="At a glance">
            <div className="about-aside__block">
              <p className="about-aside__label">Focus</p>
              <ul className="about-aside__list">
                {focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="about-aside__block">
              <p className="about-aside__label">Education</p>
              {education.map((ed) => (
                <div key={ed.degree} className="about-aside__edu">
                  <p className="about-aside__edu-degree">{ed.degree}</p>
                  <p className="about-aside__edu-meta">
                    {ed.school}
                    <br />
                    {ed.dates}
                  </p>
                </div>
              ))}
            </div>

            <div className="about-aside__block">
              <p className="about-aside__label">Selected proof</p>
              <ul className="about-aside__list">
                {achievements.slice(0, 3).map((a) => (
                  <li key={a.title}>{a.title}</li>
                ))}
              </ul>
            </div>

            <div className="about-aside__block about-aside__block--links">
              <Link to="/projects" className="about-aside__link">
                Projects →
              </Link>
              <Link to="/achievements" className="about-aside__link">
                Achievements →
              </Link>
              <a href={person.linkedin} className="about-aside__link">
                LinkedIn →
              </a>
            </div>
          </aside>
        </div>

        <section className="section section--band">
          <div className="section__head">
            <h2 className="section__title">Stack</h2>
          </div>
          <div className="stack-grid">
            {(Object.keys(stack) as (keyof typeof stack)[]).map((key) => (
              <div key={key}>
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
