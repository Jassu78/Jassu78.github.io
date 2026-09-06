import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { systemFlows, type FlowNode, type SystemFlow } from "../content";

const kindLabel: Record<FlowNode["kind"], string> = {
  client: "Client",
  orchestrator: "Orchestrator",
  tool: "Tool",
  memory: "Memory",
  guard: "Guardrail",
  worker: "Worker",
  data: "Data",
  eval: "Eval",
};

function FlowBoard({
  flow,
  showCaseLink = true,
}: {
  flow: SystemFlow;
  showCaseLink?: boolean;
}) {
  const [activeId, setActiveId] = useState(flow.nodes[0]?.id ?? "");
  const reduce = useReducedMotion();
  const active = useMemo(
    () => flow.nodes.find((n) => n.id === activeId) ?? flow.nodes[0],
    [flow.nodes, activeId],
  );

  const loopLabels = flow.loop
    .map((id) => flow.nodes.find((n) => n.id === id)?.label ?? id)
    .join(" → ");

  return (
    <div className="flow">
      <div className="flow__meta">
        <p className="flow__why">{flow.why}</p>
        <div className="exp-card__tags">
          {flow.concepts.map((c) => (
            <span key={c} className="tag tag--concept">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="flow__board" role="list">
        {flow.nodes.map((node, i) => {
          const selected = node.id === active?.id;
          return (
            <motion.button
              key={node.id}
              type="button"
              role="listitem"
              className={`flow__node flow__node--${node.kind}${selected ? " is-active" : ""}`}
              onClick={() => setActiveId(node.id)}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={reduce ? undefined : { y: -2 }}
            >
              <span className="flow__node-kind">{kindLabel[node.kind]}</span>
              <span className="flow__node-label">{node.label}</span>
            </motion.button>
          );
        })}
      </div>

      <p className="flow__loop" title="Decision / request loop">
        <span>Loop</span> {loopLabels}
      </p>

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.id}
            className="flow__detail"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <p className="flow__detail-kind">
              {kindLabel[active.kind]} · {active.label}
            </p>
            <p>{active.detail}</p>
            {showCaseLink && flow.caseSlug ? (
              <Link to={`/projects/${flow.caseSlug}`} className="flow__case">
                Project details →
              </Link>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type Props = {
  /** Limit flows on home */
  maxFlows?: number;
  /** Restrict to a single case/project slug when embedded on detail pages */
  caseSlug?: string;
};

export function SystemsExplorer({ maxFlows, caseSlug }: Props) {
  const flows = useMemo(() => {
    let list = systemFlows;
    if (caseSlug) list = list.filter((f) => f.caseSlug === caseSlug);
    if (maxFlows) list = list.slice(0, maxFlows);
    return list;
  }, [caseSlug, maxFlows]);

  const [tab, setTab] = useState(flows[0]?.id ?? "");

  useEffect(() => {
    if (flows[0] && !flows.some((f) => f.id === tab)) {
      setTab(flows[0].id);
    }
  }, [flows, tab]);

  const activeFlow = flows.find((f) => f.id === tab) ?? flows[0];

  if (!flows.length) return null;

  return (
    <div className="systems-explorer">
      {flows.length > 1 ? (
        <div className="flow-tabs" role="tablist" aria-label="System flows">
          {flows.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={f.id === activeFlow?.id}
              className={`flow-tab${f.id === activeFlow?.id ? " is-active" : ""}`}
              onClick={() => setTab(f.id)}
            >
              {f.title}
            </button>
          ))}
        </div>
      ) : null}

      {activeFlow ? (
        <div className="flow-panel" role="tabpanel">
          <h3 className="flow-panel__title">{activeFlow.title}</h3>
          <p className="flow-panel__sub">{activeFlow.subtitle}</p>
          <FlowBoard flow={activeFlow} showCaseLink={!caseSlug} />
        </div>
      ) : null}
    </div>
  );
}

const SLIDE_MS = 2800;

const SHORT: Record<string, string> = {
  "companion-loop": "Companion",
  "ai-companion": "Companion",
  "codeoracle-mcp": "CodeOracle",
  "job-watch": "Job Watch",
  "tutor-progress": "Tutor",
};

/** Hero-only blurbs — product framing, not a metrics strip (numbers live in Impact). */
const HERO_LINE: Record<string, string> = {
  "companion-loop":
    "Gated orchestrator with tools, memory, and token budgets — not a chatbot wrapper.",
  "ai-companion":
    "Gated orchestrator with tools, memory, and token budgets — not a chatbot wrapper.",
  "codeoracle-mcp":
    "Self-hosted MCP with hybrid search and citation-backed WHY memory for agents.",
  "job-watch":
    "Adaptable ATS watch lab — adapters, filters, and Telegram alerts on a schedule.",
  "tutor-progress":
    "Progress-aware generation for what comes next — not a one-shot lesson dump.",
};

/**
 * Stacked cards (wallet-style): solid faces, small x/y peeks, no 3D rotate.
 * Front card / arrows advance the stack; only Details navigates.
 */
export function SystemsHeroPreview() {
  const flows = systemFlows.slice(0, 3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce || flows.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % flows.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, flows.length]);

  const go = (i: number) =>
    setIndex(((i % flows.length) + flows.length) % flows.length);

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const front = flows[index]!;
  const href = front.caseSlug ? `/projects/${front.caseSlug}` : "/projects";
  const line = HERO_LINE[front.id] ?? front.why;

  return (
    <div
      className="card-stack"
      aria-roledescription="carousel"
      aria-label="Selected systems"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="card-stack__stage">
        {[2, 1].map((depth) => {
          const flowIndex = (index + depth) % flows.length;
          const flow = flows[flowIndex]!;

          return (
            <div
              key={`back-${depth}-${flow.id}`}
              className={`card-stack__card card-stack__card--back card-stack__card--d${depth}`}
              style={{ zIndex: 3 - depth }}
              aria-hidden
            />
          );
        })}

        <motion.article
          key={`front-${front.id}`}
          className="card-stack__card card-stack__card--front"
          style={{ zIndex: 3 }}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={next}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              next();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`${SHORT[front.id] ?? front.title}. Activate for next system.`}
        >
          <p className="card-stack__kicker">{front.caseSlug ? "Project" : "System"}</p>
          <h3 className="card-stack__title">{SHORT[front.id] ?? front.title}</h3>
          <p className="card-stack__line">{line}</p>
          <Link
            to={href}
            className="card-stack__link"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            Details →
          </Link>
        </motion.article>
      </div>

      <div className="card-stack__controls">
        <button
          type="button"
          className="card-stack__hit"
          aria-label="Previous system"
          onClick={prev}
        >
          <span aria-hidden>‹</span>
        </button>
        <p className="card-stack__status" aria-live="polite">
          {index + 1} / {flows.length}
        </p>
        <button
          type="button"
          className="card-stack__hit"
          aria-label="Next system"
          onClick={next}
        >
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}
