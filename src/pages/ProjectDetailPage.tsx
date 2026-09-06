import { Link, Navigate, useParams } from "react-router-dom";
import { ArchitectureBoard } from "../components/ArchitectureBoard";
import { PageTransition } from "../components/PageTransition";
import { SystemsExplorer } from "../components/SystemsExplorer";
import {
  findCaseStudy,
  findProject,
  type Decision,
  type Metric,
  type Optimization,
} from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

function MetricsBlock({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="metric-grid" aria-label="Impact">
      {metrics.map((m) => (
        <div key={m.label} className="metric">
          <p className="metric__value">{m.value}</p>
          <p className="metric__label">{m.label}</p>
          {m.note ? <p className="metric__note">{m.note}</p> : null}
        </div>
      ))}
    </div>
  );
}

function DecisionsBlock({ decisions }: { decisions: Decision[] }) {
  return (
    <ul className="decision-list">
      {decisions.map((d) => (
        <li key={d.choice}>
          <p className="decision-list__choice">{d.choice}</p>
          <p className="decision-list__why">{d.why}</p>
          {d.alternative ? (
            <p className="decision-list__alt">Instead of: {d.alternative}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function OptimizationsBlock({ items }: { items: Optimization[] }) {
  return (
    <ul className="decision-list">
      {items.map((o) => (
        <li key={o.change}>
          <p className="decision-list__choice">{o.change}</p>
          <p className="decision-list__why">{o.why}</p>
          {o.result ? <p className="decision-list__alt">Result: {o.result}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function DetailIntro({
  title,
  lede,
  tags,
  live,
  code,
}: {
  title: string;
  lede: string;
  tags: React.ReactNode;
  live?: string;
  code?: string;
}) {
  return (
    <header className="page-intro detail-intro">
      <Link to="/projects" className="back-link">
        ← Projects
      </Link>
      <h1 className="page-title">{title}</h1>
      <p className="page-lede">{lede}</p>
      <div className="bento__tags detail-intro__tags">{tags}</div>
      <div className="hero__actions">
        {live ? (
          <a className="btn btn--primary" href={live} target="_blank" rel="noreferrer">
            Live
          </a>
        ) : null}
        {code ? (
          <a className="btn btn--ghost" href={code} target="_blank" rel="noreferrer">
            Code
          </a>
        ) : null}
      </div>
    </header>
  );
}

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const study = findCaseStudy(slug);
  const project = findProject(slug);

  usePageTitle(
    study
      ? `${study.title} — Jaswanth Jogi`
      : project
        ? `${project.name} — Jaswanth Jogi`
        : "Not found",
  );

  if (!study && !project) {
    return <Navigate to="/projects" replace />;
  }

  if (study) {
    return (
      <PageTransition>
        <div className="shell shell--page">
          <DetailIntro
            title={study.title}
            lede={study.subtitle}
            live={study.live}
            code={study.code}
            tags={
              <>
                <span className="tag">{study.year}</span>
                <span className="tag">{study.scope}</span>
                {study.category ? <span className="tag">{study.category}</span> : null}
                {study.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
                {study.status ? <span className="status-pill">{study.status}</span> : null}
              </>
            }
          />

          {study.metrics?.length ? (
            <section className="section section--band">
              <div className="section__head">
                <h2 className="section__title">Impact</h2>
              </div>
              <MetricsBlock metrics={study.metrics} />
            </section>
          ) : null}

          <div className="detail-block">
            <ArchitectureBoard layers={study.layers} caption="Architecture" />
          </div>

          <div className="detail-block">
            <SystemsExplorer caseSlug={study.slug} />
          </div>

          <div className="case-layout">
            <div className="case-panel">
              <h2>Problem</h2>
              <p>{study.problem}</p>
              <h2>Role</h2>
              <p>{study.role}</p>
              {study.decisions?.length ? (
                <>
                  <h2>Decisions</h2>
                  <DecisionsBlock decisions={study.decisions} />
                </>
              ) : null}
              {study.optimizations?.length ? (
                <>
                  <h2>Optimizations</h2>
                  <OptimizationsBlock items={study.optimizations} />
                </>
              ) : null}
              <h2>Constraints</h2>
              <ul>
                {study.constraints.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <h2>Tradeoffs</h2>
              <ul>
                {study.tradeoffs.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <h2>Result</h2>
              <p>{study.result}</p>
              <h2>Next</h2>
              <p>{study.next}</p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  const p = project!;
  return (
    <PageTransition>
      <div className="shell shell--page">
        <DetailIntro
          title={p.name}
          lede={p.blurb}
          live={p.live}
          code={p.code}
          tags={
            <>
              <span className="tag">{p.year}</span>
              <span className="tag">
                {p.kind === "lab"
                  ? "Personal"
                  : p.kind === "hackathon"
                    ? "Hackathon"
                    : p.kind === "product"
                      ? "Public"
                      : p.kind}
              </span>
              {p.stack.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </>
          }
        />

        {p.metrics?.length ? (
          <section className="section section--band">
            <div className="section__head">
              <h2 className="section__title">Impact</h2>
            </div>
            <MetricsBlock metrics={p.metrics} />
          </section>
        ) : null}

        {p.layers?.length ? (
          <div className="detail-block">
            <ArchitectureBoard layers={p.layers} caption="Architecture" />
          </div>
        ) : null}

        <div className="detail-block">
          <SystemsExplorer caseSlug={p.slug} />
        </div>

        <div className="case-layout">
          <div className="case-panel">
            <h2>Overview</h2>
            {p.detail.split(/\n\n+/).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
            {p.decisions?.length ? (
              <>
                <h2>Decisions</h2>
                <DecisionsBlock decisions={p.decisions} />
              </>
            ) : null}
            {p.optimizations?.length ? (
              <>
                <h2>Optimizations</h2>
                <OptimizationsBlock items={p.optimizations} />
              </>
            ) : null}
            <h2>Highlights</h2>
            <ul>
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
