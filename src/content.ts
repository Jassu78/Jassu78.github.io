/**
 * Shared portfolio content — Jaswanth Jogi
 */

export const person = {
  name: "Jaswanth Jogi",
  shortName: "Jaswanth",
  headline:
    "Software Engineer · Agentic AI & Backend Systems · Memory/RAG · Embedded Linux",
  /** Short hero line — one supporting sentence; metrics live below the fold */
  lede: "I build AI-powered product systems end-to-end — backend, on-device UX, and the embedded Linux that runs it.",
  /** Full About — matches LinkedIn */
  summary: [
    "I'm a software engineer who builds AI-powered product systems end-to-end — frontend and backend, on-device UX, and the embedded Linux that runs it.",
    "At Pocketrocket Labs, I work on Kea — a children’s learning companion. I designed and built the AI companion backend, the adaptive AI tutor, and the Qt/QML on-device client on embedded Linux — including bringing up an OS image for hardware with no vendor support. I also built consumer and parent-facing web surfaces, wiring them to the backend with auth, background jobs, and reliable APIs — and I operate the GCP VMs that keep those surfaces up.",
    "I care about production quality — dependency auditing, input validation, security testing, and observability are part of how I ship. Explicit context caching, rolling summaries, and request-path engineering keep the companion fast and cut token cost.",
    "On the side I built CodeOracle: a TypeScript hexagonal monorepo (14 packages · ~17k LOC) that gives MCP clients hybrid dense+sparse RRF search and citation-backed WHY memory — 3 tools, 5 BullMQ job types, golden eval in CI (hit@3 ≥80%, citation 100%), ₹0 Ollama embed path. I also run Job Watch: an adaptable ATS module lab — 12 registered Source adapters, 35 boards, Aho–Corasick filters, seed→watch dedupe, SQLite WAL, and a 9-command Telegram bot on a 2×/day n8n schedule.",
    "I work daily with agentic coding tools — Cursor (editor + CLI), Claude Code, and OpenCode — and prefer the CLI when it fits the loop. I try tools deliberately, then drive them with clear architecture and instructions so the model accelerates delivery while I still own design, integration, testing, and what ships. Currently pursuing M.Tech in Computer Science.",
  ].join("\n\n"),
  location: "Visakhapatnam, India · Remote (IST)",
  email: "jaswanthjogi7815@gmail.com",
  phone: "+91 9491011303",
  github: "https://github.com/jassu78",
  githubHandle: "jassu78",
  linkedin: "https://linkedin.com/in/jassu78",
  availability: "Open to AI Engineer · Backend Engineer · Full-Stack · Systems/Platform roles",
  os: "Arch Linux daily driver — started on Ubuntu, then Debian and Linux Mint, now Arch. macOS for work.",
};

/** Home hero rail — identity + 2–3 career proof chips only (no metric dashboard). */
export const proofRail = {
  identity: "Software Engineer · Pocketrocket Labs",
  chips: [
    "Infosys Summit · 4 of ~35k",
    "NASA Finalist 2024 · team lead",
    "Companion · 29s → ~3s",
  ],
};

/** CLI / flat list — identity + chips */
export const proof = [proofRail.identity, ...proofRail.chips];

/** Quiet Home proof strip — efficiency + career numbers (6 · 2 rows). */
export const homeHighlights: { value: string; label: string; note: string }[] = [
  { value: "29s→~3s", label: "Companion reply", note: "Via 7s · then 5s · no quality loss" },
  { value: "90%", label: "Cached token discount", note: "Explicit context cache" },
  { value: "70%", label: "Less history load", note: "Rolling summary + recent turns" },
  { value: "12→24", label: "Team endgame", note: "Infosys Meeting Summarizer" },
  { value: "4 / ~35k", label: "Summit select", note: "~2,000 audience" },
  {
    value: "0.4%",
    label: "NASA Finalist 2024",
    note: "40 of ~10k · team lead · Landsat",
  },
];

/** CodeOracle — code-backed systems chips (Home top band). */
export const codeOracleHighlights: { value: string; label: string; note: string }[] = [
  { value: "3", label: "MCP tools", note: "search · explain · find_decision" },
  { value: "14", label: "Packages", note: "4 apps · 10 libs · ~17k TS LOC" },
  { value: "RRF_K=2", label: "Hybrid fusion", note: "Dense + sparse · Qdrant" },
  { value: "5", label: "BullMQ jobs", note: "index · chunk · embed · extract · reindex" },
  { value: "≥80%", label: "Golden hit@3", note: "12 queries · citation 100%" },
  { value: "₹0", label: "Embed path", note: "Ollama nomic-embed-text" },
];

/** Job Watch — adaptable ATS module chips (Home systems band). */
export const jobWatchHighlights: { value: string; label: string; note: string }[] = [
  { value: "12", label: "Source adapters", note: "Registry plugins · Greenhouse → JSearch" },
  { value: "35", label: "Boards watched", note: "companies.json · enabled" },
  { value: "8", label: "Fetch workers", note: "Concurrent · 3 retries · 1.5× backoff" },
  { value: "Aho–C", label: "Filter engine", note: "Keyword · title · location · age" },
  { value: "9", label: "Telegram cmds", note: "status · filters · sources · latest · mute" },
  { value: "2×/day", label: "n8n schedule", note: "IST · seed→watch dedupe" },
];

/** Home systems bands — CodeOracle + Job Watch (same chip treatment). */
export const homeSystemBands: {
  id: string;
  title: string;
  to: string;
  highlights: { value: string; label: string; note: string }[];
  tone?: "oracle" | "watch";
}[] = [
  {
    id: "codeoracle",
    title: "CodeOracle",
    to: "/projects/codeoracle",
    highlights: codeOracleHighlights,
    tone: "oracle",
  },
  {
    id: "job-watch",
    title: "Job Watch",
    to: "/projects/job-watch-lab",
    highlights: jobWatchHighlights,
    tone: "watch",
  },
];

export type Metric = { label: string; value: string; note?: string };
export type Decision = { choice: string; why: string; alternative?: string };
export type Optimization = { change: string; why: string; result?: string };

export const stack = {
  ai: [
    "LLM orchestration",
    "RAG / memory",
    "Tool calling",
    "Vertex AI",
    "MCP",
    "Cursor (editor · CLI)",
    "Claude Code",
    "OpenCode",
    "Langfuse",
    "PostHog",
    "Microsoft Presidio",
    "Evals",
  ],
  backend: ["TypeScript", "NestJS", "Node.js", "gRPC", "REST", "BullMQ", "Redis", "MongoDB", "Postgres"],
  device: ["Qt/QML", "C++", "Embedded Linux", "OS images", "CI rootfs"],
  frontend: ["Next.js", "React", "Tailwind", "shadcn/ui"],
  cloud: ["Docker", "GitHub Actions", "nginx", "OCI", "Google Cloud", "Tailscale", "Arch Linux"],
  languages: ["TypeScript", "JavaScript", "Python", "Kotlin", "C++", "C", "SQL", "Bash"],
};

/** Layered architecture for visual boards (not internal diagrams). */
export type ArchItem = { label: string; note?: string };
export type ArchLayer = { id: string; title: string; items: ArchItem[] };

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  scope: string;
  tags: string[];
  problem: string;
  role: string;
  /** Flat bullets kept for CLI / compact views */
  architecture: string[];
  /** Layered view for architecture boards */
  layers: ArchLayer[];
  constraints: string[];
  tradeoffs: string[];
  result: string;
  next: string;
  live?: string;
  code?: string;
  featured: boolean;
  status?: "Live" | "In use" | "In development" | "Shipped" | "Open source" | "Academic" | "Private";
  /** Defensible numbers only — interview-ready */
  metrics?: Metric[];
  /** Why this path over the obvious alternative */
  decisions?: Decision[];
  /** Concrete changes made for cost, latency, reliability, or footprint */
  optimizations?: Optimization[];
  /** Index grouping */
  category?: "Production" | "Personal" | "Public" | "Hackathon";
};

export type Project = {
  slug: string;
  name: string;
  blurb: string;
  detail: string;
  year: string;
  kind: "product" | "hackathon" | "lab" | "mobile" | "oss-adjacent";
  highlights: string[];
  stack: string[];
  layers?: ArchLayer[];
  live?: string;
  code?: string;
  featured?: boolean;
  /** Working state shown on Projects index */
  status?: "Live" | "In use" | "In development" | "Shipped" | "Open source" | "Academic" | "Private";
  metrics?: Metric[];
  decisions?: Decision[];
  optimizations?: Optimization[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "codeoracle",
    title: "CodeOracle",
    subtitle: "Self-hosted MCP — 3 cited tools · hybrid RRF_K=2 · decision memory",
    year: "2026",
    scope: "Solo · 14 packages · ~17k TS · Docker Compose default",
    tags: ["MCP", "TypeScript", "Qdrant", "Postgres", "BullMQ", "CLI"],
    problem:
      "Coding agents burn tokens re-reading trees and rediscovering design choices. They see today's files but forget why the codebase was built that way — decisions, rejected options, and PR rationale that live in git history. Cloud “chat with repo” helps, but private monorepos often need a self-hosted, ₹0-friendly path.",
    role:
      "Solo architect and builder: hexagonal monorepo (4 apps · 10 packages), three citation-backed MCP tools, hybrid dense+sparse RRF retrieval, BullMQ workers, CLI, providers.yaml gateway, Streamable HTTP + scoped auth, and a Compose + Ollama default path.",
    architecture: [
      "IDE MCP client → mcp-server (stdio or Streamable HTTP)",
      "API: repos · tokens · GitHub webhooks → incremental reindex",
      "Workers: clone · tree-sitter chunk · embed · extract decisions (BullMQ)",
      "Tools: search_codebase · explain_file · find_decision (citations)",
      "Postgres + Redis + Qdrant · hybrid dense + sparse (RRF_K=2)",
    ],
    layers: [
      {
        id: "clients",
        title: "Clients",
        items: [
          { label: "IDE agents", note: "Cursor / Claude Code via MCP" },
          { label: "CLI", note: "12 leaf commands · init · repo · decisions" },
        ],
      },
      {
        id: "edge",
        title: "Edge apps",
        items: [
          { label: "mcp-server", note: "stdio · Streamable HTTP + bearer" },
          { label: "api", note: "Node HTTP · 8 routes · webhooks" },
          { label: "worker", note: "BullMQ · 5 job types · concurrency 6" },
        ],
      },
      {
        id: "domain",
        title: "Capabilities",
        items: [
          { label: "search_codebase", note: "Hybrid RRF + citations" },
          { label: "explain_file", note: "Path chunks + related decisions" },
          { label: "find_decision", note: "WHY · alternatives · source URL" },
          { label: "gateway", note: "providers.yaml · OpenAI-compatible /v1" },
        ],
      },
      {
        id: "data",
        title: "Data plane",
        items: [
          { label: "Postgres", note: "6 tables · decisions.source_url NOT NULL" },
          { label: "Redis", note: "Queue codeoracle" },
          { label: "Qdrant", note: "Dense + sparse hybrid · RRF_K=2" },
          { label: "Ollama", note: "nomic-embed-text · qwen2.5-coder:1.5b" },
        ],
      },
    ],
    constraints: [
      "Self-hosted by default — no “upload the monorepo to our cloud” as the main path",
      "₹0 / $0 default path (Compose + Ollama embeddings); chat optional for extraction",
      "Provider swap is config-only — never a new SDK",
      "No citation = bug — every hit has filePath; every decision has sourceUrl",
      "Time-to-first-query measured in minutes for a competent TS developer",
    ],
    tradeoffs: [
      "Self-hosted & local embeddings vs cloud-only convenience",
      "Decision/rationale index + hybrid search vs another chat-with-repo UI",
      "Citation-backed tool answers vs free-form LLM rewrite of the whole tree",
    ],
    result:
      "Stages 0–5 on main: hybrid search, decision extraction, three citation-backed MCP tools, scoped API auth, Streamable HTTP MCP, golden eval in CI (hit@3 ≥80%, citation 100%), and multi-stage Docker images. Public architecture proof — 14 packages · ~17k TS · RRF_K=2 · ₹0 embed path.",
    next: "Keep README + golden-query table current as the public GitHub surface evolves.",
    code: "https://github.com/Jassu78/CodeOracle",
    featured: true,
    status: "Open source",
    category: "Public",
    metrics: [
      { label: "MCP tools", value: "3", note: "search_codebase · explain_file · find_decision" },
      { label: "Monorepo", value: "14 pkgs", note: "4 apps · 10 packages · ~17k TS LOC" },
      { label: "Hybrid RRF", value: "RRF_K=2", note: "Dense + sparse · dual-channel preference" },
      { label: "BullMQ jobs", value: "5 types", note: "full_index · chunk · embed · extract · reindex" },
      { label: "Golden eval", value: "hit@3 ≥80%", note: "12 queries · citation 100%" },
      { label: "Default cost", value: "₹0", note: "Compose + Ollama nomic-embed-text" },
    ],
    decisions: [
      {
        choice: "Self-hosted MCP + citation-backed tools",
        why: "Private monorepos need local control; free-form chat without citations rediscovers the same mistakes.",
        alternative: "Cloud “chat with repo” only",
      },
      {
        choice: "Hybrid dense + sparse retrieval",
        why: "Symbol/path queries and semantic “why” queries need different signals; RRF-style merge keeps both.",
        alternative: "Dense-only embeddings",
      },
      {
        choice: "providers.yaml gateway",
        why: "Swap OpenAI-compatible endpoints without a new SDK per vendor.",
        alternative: "Hard-coded provider SDKs",
      },
    ],
    optimizations: [
      {
        change: "BullMQ workers for clone · chunk · embed · extract",
        why: "Indexing must not block the MCP request path.",
        result: "Interactive tools stay on cached retrieval; heavy work is async",
      },
      {
        change: "Golden-query fixtures in CI",
        why: "Retrieval quality regresses silently without a gate.",
        result: "Known queries fail the build when ranking drifts",
      },
    ],
  },
  {
    slug: "ai-companion",
    title: "AI Companion backend",
    subtitle: "Production conversational agent for Kea",
    year: "2025–2026",
    scope: "Production · device + API + workers",
    tags: ["NestJS", "gRPC", "BullMQ", "RAG", "Voice", "Safety"],
    problem:
      "Kea needs a warm, reliable on-device companion for children: chat and voice, tool calling into tutor / quiz / media services, long sessions without blowing the context budget, and safety/PII controls that hold up in production.",
    role:
      "Designed safety/PII (Microsoft Presidio detect/anonymize), context and token-budget structures, and conversation memory/retrieval. Built orchestration, voice sessions, tools, async workers, and explicit context caching. Authored the prompt system and guided the team through updates. Own architecture, integration, testing, and what ships — Cursor / Claude Code / OpenCode (CLI-heavy) for speed, not as a substitute for design.",
    architecture: [
      "On-device client ↔ gRPC API",
      "Orchestrator with gating and error handling",
      "Tools into tutor / quiz / media services",
      "Async workers for summarization and memory ingest",
      "Vector retrieval back into the prompt",
    ],
    layers: [
      {
        id: "device",
        title: "Device",
        items: [
          { label: "Qt/QML client", note: "Chat · voice UX · focus nav" },
          { label: "gRPC + WS", note: "Typed device ↔ cloud" },
        ],
      },
      {
        id: "api",
        title: "Companion API",
        items: [
          { label: "Orchestrator", note: "Gates · errors · tools" },
          { label: "Safety / PII", note: "Presidio detect · anonymize" },
          { label: "Context budget", note: "Token / window policy" },
        ],
      },
      {
        id: "async",
        title: "Async plane",
        items: [
          { label: "BullMQ workers", note: "Summarize · ingest" },
          { label: "Memory store", note: "Embeddings + retrieval" },
        ],
      },
      {
        id: "deps",
        title: "Dependencies",
        items: [
          { label: "Tutor / media APIs", note: "Tool calling" },
          { label: "LLM providers", note: "Vertex / wrappers" },
          { label: "Error tracking", note: "API + worker" },
        ],
      },
    ],
    constraints: [
      "Long sessions must stay inside a deliberate token budget",
      "Device path prefers gRPC for structure and delivery",
      "Safety/PII gates belong on the request path, not as a later patch",
    ],
    tradeoffs: [
      "Async memory ingest vs synchronous retrieval latency",
      "Rolling summaries vs full history in context",
      "Self-hosted Langfuse + PostHog on a dedicated VM vs managed SaaS only",
    ],
    result:
      "Running on a live consumer product path. Production error tracking on API and worker; Langfuse and PostHog self-hosted on a dedicated VM; Presidio PII gating on the request path.",
    next: "Public eval/cost patterns on open projects.",
    featured: true,
    category: "Production",
    status: "In development",
    metrics: [
      { label: "Companion reply", value: "29s → ~3s", note: "Via 7s · then 5s · no quality loss" },
      { label: "Cached tokens", value: "90% off", note: "Explicit context cache" },
      { label: "History load", value: "70% less", note: "Long sessions · rolling summary + recent turns" },
      { label: "Voice", value: "On-demand", note: "Idle teardown sheds session load" },
    ],
    decisions: [
      {
        choice: "gRPC device contract",
        why: "Typed payloads and clearer failure modes than ad-hoc REST for the on-device path.",
        alternative: "REST-only device API",
      },
      {
        choice: "Token/context budget in the architecture",
        why: "Long sessions otherwise blow cost and quality without a deliberate window policy.",
        alternative: "Ship full history every turn",
      },
      {
        choice: "Explicit context caching for system prompts + tools",
        why: "Re-assembling the same large prompt every turn re-pays full input cost.",
        alternative: "Rebuild the full prompt payload on every request",
      },
      {
        choice: "Microsoft Presidio on the pre-moderation path",
        why: "PII and sensitive fields must be detected and anonymized before model I/O on a children’s product.",
        alternative: "Prompt-only instructions with no dedicated PII stack",
      },
      {
        choice: "Self-hosted Langfuse + PostHog on a dedicated VM",
        why: "Own tracing and product analytics without depending on a third-party SaaS path for core ops.",
        alternative: "Cloud-only managed analytics",
      },
      {
        choice: "Async memory ingest",
        why: "Keep the conversational turn responsive; retrieval uses what workers already wrote.",
        alternative: "Synchronous embed + retrieve on every message",
      },
    ],
    optimizations: [
      {
        change: "Prompt system + request-path tuning",
        why: "Early companion turns were too slow for a product device (~29s).",
        result: "29s → 7s → 5s → ~3s typical reply · no quality loss",
      },
      {
        change: "Explicit context caching (24h TTL)",
        why: "Core system prompts and tools do not need to be re-billed at full rate every turn.",
        result: "90% off cached input tokens",
      },
      {
        change: "Rolling summaries into the context window",
        why: "Unbounded history destroys latency and budget.",
        result: "70% less history load on long sessions; 90% in hard sessions",
      },
      {
        change: "Parallel multi-tool + prefetch handoff",
        why: "Serial tool round-trips stacked latency on the hot path.",
        result: "50–60% fewer consecutive tool trips when tools share data",
      },
      {
        change: "MongoDB aggregation pipelines",
        why: "N+1 reads were too slow for selected APIs.",
        result: "80% lower latency on those read APIs",
      },
      {
        change: "Microsoft Presidio + safety gates before model I/O",
        why: "Moderation and PII redaction cannot be a later patch on a consumer product.",
        result: "Detect/anonymize PII on the pre-moderation path",
      },
    ],
  },
  {
    slug: "linux-kiosk",
    title: "Embedded Linux / OS image",
    subtitle: "Unsupported hardware path · GitHub Actions / Docker CI · firmware update images",
    year: "2025–2026",
    scope: "OS image · CI · Qt client · release train",
    tags: ["Linux", "Rootfs", "GitHub Actions", "Docker", "Qt", "Firmware"],
    problem:
      "The product needed a robust Linux on-device stack on hardware whose chip had no current vendor support for the required path — waiting on a BSP was not an option. Full rebuilds on every release change made iteration unusable.",
    role:
      "Owned research, first working OS image, image/rootfs pipeline, GitHub Actions + Docker CI (diff-gated rebuilds, layer cache), firmware-pack release images for Kea device updates, and Qt/QML client bring-up. Unique OS/image commits in those lines are mine.",
    architecture: [
      "Custom rootfs / image pipeline for unsupported hardware",
      "GitHub Actions YAML + Docker builder image (GHCR)",
      "Diff-gated app build: reuse prior release bundle when only image/docs/CI changed",
      "Firmware pack → flashable device img + rootfs update artifacts",
      "Qt/QML + C++ on-device client",
    ],
    layers: [
      {
        id: "ci",
        title: "Image CI",
        items: [
          { label: "Docker builder", note: "Qt 6.7.3 · GHCR" },
          { label: "Diff gate", note: "path filters · reuse vs compile" },
          { label: "Caches", note: "GHA layers · FetchContent deps" },
          { label: "Firmware pack", note: "RKFW img + rootfs.ext4.xz releases" },
        ],
      },
      {
        id: "os",
        title: "Device OS",
        items: [
          { label: "Linux image", note: "Unsupported SoC path" },
          { label: "Boot / splash", note: "Constrained footprint" },
        ],
      },
      {
        id: "app",
        title: "On-device app",
        items: [
          { label: "Qt/QML + C++", note: "Tutor · companion · media" },
          { label: "System settings", note: "Wi-Fi · BT · A2DP" },
        ],
      },
      {
        id: "cloud",
        title: "Cloud edge",
        items: [
          { label: "gRPC APIs", note: "Companion · tutor · content" },
        ],
      },
    ],
    constraints: [
      "No usable vendor path for the needed stack",
      "Must boot and run with a low footprint on constrained hardware",
      "Release CI must not recompile Kea when only rootfs/docs changed",
      "Public story stays architectural — no firmware secrets",
    ],
    tradeoffs: [
      "Community/research bring-up vs waiting on vendor BSPs",
      "Image size and boot time vs feature completeness",
      "Diff-gated reuse + Docker cache vs always-full rebuilds",
    ],
    result:
      "On-device stack brought up on a previously unsupported path. Release CI reuses prior app bundles when app source is unchanged, caches the Docker builder (documented ~40 min → ~3 min on cache hit), and ships flashable firmware/rootfs update images for Kea devices.",
    next: "Optional public edge-LLM demo on constrained hardware (separate from product IP).",
    featured: true,
    category: "Production",
    status: "In development",
    metrics: [
      { label: "Builder CI", value: "~40→~3 min", note: "Docker Qt image · GHA layer cache hit" },
      { label: "Release gate", value: "Diff reuse", note: "Skip Kea compile when only image/docs/CI change" },
      { label: "Update artifacts", value: "Firmware pack", note: "RKFW img + rootfs.ext4.xz on releases" },
      { label: "Client stack", value: "Qt/QML + C++", note: "On-device UX, media, settings, voice" },
    ],
    decisions: [
      {
        choice: "Custom rootfs / image pipeline",
        why: "Waiting on vendor support would block the product.",
        alternative: "Delay ship until BSP exists",
      },
      {
        choice: "Pre-baked Docker builder image on GHCR",
        why: "Per-run Qt/dep installs burned CI minutes on every release.",
        alternative: "Install Qt and deps on every job",
      },
      {
        choice: "git-diff decide script (build vs reuse prior zip)",
        why: "Rootfs-only or docs-only releases should not recompile the whole Kea app.",
        alternative: "Always full app + rootfs rebuild",
      },
      {
        choice: "Firmware pack + rootfs release artifacts",
        why: "Devices need a reliable flash/update path (full img or rootfs-only).",
        alternative: "Ad-hoc local images with no release train",
      },
    ],
    optimizations: [
      {
        change: "Docker builder + GHA layer cache",
        why: "Qt install dominated builder rebuilds (~40 min cold).",
        result: "~3 min on cache hit when Dockerfile layers unchanged (~90% on that job)",
      },
      {
        change: "Diff-gate path filters in release CI",
        why: "Image/docs/CI-only diffs do not need a Kea recompile.",
        result: "Reuse prior release app bundle when app source is unchanged",
      },
      {
        change: "FetchContent / deps cache in app build",
        why: "Third-party CMake deps re-downloaded every compile.",
        result: "Warm deps across release builds",
      },
      {
        change: "Sized rootfs + firmware pack for releases",
        why: "Need shippable update images without OOM on arm runners.",
        result: "Flashable device img.xz + routine rootfs updates",
      },
    ],
  },
  {
    slug: "codegym-ai",
    title: "CodeGym-AI",
    subtitle: "AI coding mentor that coaches instead of dumping answers",
    year: "2025",
    scope: "Solo · live web app",
    tags: ["Next.js", "Gemini", "TypeScript", "Eval"],
    problem:
      "Most AI coding helpers paste full solutions. Learners need progressive hints, runnable checks, and feedback on quality — not spoilers that skip the thinking.",
    role:
      "Designed and built the full product: generation by topic/language/difficulty, execution checks, scoring, and hint chat with real loading/error states.",
    architecture: [
      "Next.js + TypeScript UI",
      "Gemini for problem generation and coaching",
      "Run → compare → score loop",
      "Hint chat instead of full-solution dump",
    ],
    layers: [
      {
        id: "ui",
        title: "UI",
        items: [
          { label: "Next.js app", note: "Topic · language · difficulty" },
          { label: "Editor + chat", note: "Hints, not spoilers" },
        ],
      },
      {
        id: "ai",
        title: "AI loop",
        items: [
          { label: "Problem generator", note: "Gemini" },
          { label: "Coach / hints", note: "Stepwise guidance" },
          { label: "Quality scorer", note: "Post-run feedback" },
        ],
      },
      {
        id: "runtime",
        title: "Runtime",
        items: [
          { label: "Execute + compare", note: "Expected output checks" },
        ],
      },
    ],
    constraints: [
      "Must work as a live demo without a heavy backend ops story",
      "Coaching UX has to resist “just paste the answer”",
    ],
    tradeoffs: [
      "Hints-first coaching vs instant full solutions",
      "Generated problems vs static banks",
    ],
    result: "Live deployment used as a public proof of AI product sense.",
    next: "Publish eval scores and latency/cost notes in the README when measured.",
    live: "https://code-gym-ai.vercel.app",
    code: "https://github.com/jassu78/CodeGym-AI",
    featured: false,
    category: "Public",
    status: "Live",
    metrics: [
      { label: "Languages", value: "Java · Python · C", note: "Topic and difficulty selectable" },
      { label: "Loop", value: "Generate → run → score → hint", note: "Coaching instead of full spoilers" },
      { label: "Status", value: "Live", note: "Public Vercel deployment" },
    ],
    decisions: [
      {
        choice: "Hints-first coach",
        why: "Full-solution dumps skip the learning loop recruiters care about in demos.",
        alternative: "Paste complete answers",
      },
    ],
    optimizations: [
      {
        change: "Real loading and error states",
        why: "Interview demos die on silent spinner failures.",
        result: "Demo survives flaky model/network paths",
      },
    ],
  },
  {
    slug: "adaptive-tutor",
    title: "Adaptive AI tutor",
    subtitle: "Progress-aware lessons and quizzes over gRPC",
    year: "2025–2026",
    scope: "Production service · device-facing",
    tags: ["NestJS", "gRPC", "Vertex AI"],
    problem:
      "Learners need concepts broken into small chapters with progress-aware sequencing — not a flash dump of content that ignores what they already know.",
    role:
      "Built the tutor service: topics, lessons, quizzes, progress tracking; exposed over gRPC. Tried multiple generation approaches before the version that shipped.",
    architecture: [
      "NestJS tutor service",
      "gRPC to device and peer services",
      "Quiz versioning and progress models",
      "LLM generation with iteration history",
    ],
    layers: [
      {
        id: "clients",
        title: "Consumers",
        items: [
          { label: "Device client", note: "gRPC" },
          { label: "Admin / content tools", note: "Ops surfaces" },
        ],
      },
      {
        id: "tutor",
        title: "Tutor service",
        items: [
          { label: "Topics · lessons · quizzes", note: "Versioned content" },
          { label: "Progress model", note: "Sequence next step" },
          { label: "Generation pipeline", note: "Vertex AI" },
        ],
      },
    ],
    constraints: [
      "Must integrate with the companion tool surface",
      "Upfront generation of a full course is too slow and wasteful",
    ],
    tradeoffs: [
      "Multiple generation approaches before shipping",
      "gRPC contracts vs ad-hoc REST for device clients",
      "Unlock waves vs generate-everything-upfront",
    ],
    result: "Integrated into the product path for daily learning use.",
    next: "Public eval harness on open corpora inspired by tutor quality concerns.",
    featured: false,
    category: "Production",
    status: "In development",
    metrics: [
      { label: "Unlock wave", value: "25%", note: "Visible share generated first, in parallel" },
      { label: "Deferred gen", value: "75%", note: "Held until the learner unlocks further" },
      { label: "Transport", value: "gRPC", note: "Device-facing tutor contracts" },
    ],
    decisions: [
      {
        choice: "Progress-aware sequencing",
        why: "One-shot lesson dumps ignore what the learner already finished.",
        alternative: "Static playlist of content",
      },
      {
        choice: "Iterate generation approaches before ship",
        why: "First prompts were not good enough for production quality.",
        alternative: "Ship the first generation path",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "codeoracle",
    name: "CodeOracle",
    blurb:
      "3 MCP tools · RRF_K=2 hybrid search · citation-backed WHY · 14 packages · ~17k LOC · ₹0 embed path.",
    detail:
      "Solo systems build (stages 0–5 on main): TypeScript hexagonal monorepo — 4 apps · 10 packages · ~17k LOC — with three citation-backed MCP tools (search_codebase, explain_file, find_decision), hybrid dense+sparse RRF (RRF_K=2), Postgres/Redis/Qdrant, BullMQ (5 job types), Streamable HTTP + scoped auth, golden eval in CI (12 queries · hit@3 ≥80% · citation 100%), and a 12-command CLI. Default path is Compose + Ollama nomic-embed-text (₹0); optional chat via providers.yaml including qwen2.5-coder:1.5b. Public GitHub: architecture is interview-ready.",
    year: "2026",
    kind: "product",
    featured: true,
    highlights: [
      "3 MCP tools · citations required (no citation = bug)",
      "Hybrid dense+sparse RRF_K=2 · Qdrant",
      "14 packages · ~17k TS · BullMQ 5 job types",
      "Golden CI: 12 queries · hit@3 ≥80% · citation 100%",
      "₹0 embed path · Ollama nomic-embed-text",
    ],
    stack: ["TypeScript", "MCP", "Postgres", "Qdrant", "BullMQ", "Docker", "Ollama"],
    metrics: [
      { label: "MCP tools", value: "3", note: "search · explain · find_decision" },
      { label: "Packages", value: "14", note: "4 apps · 10 libs · ~17k LOC" },
      { label: "RRF", value: "K=2", note: "Dense + sparse hybrid" },
      { label: "Golden eval", value: "hit@3 ≥80%", note: "12 queries · citation 100%" },
      { label: "BullMQ", value: "5 jobs", note: "Single queue codeoracle" },
      { label: "Cost path", value: "₹0", note: "nomic-embed-text local" },
    ],
    layers: [
      {
        id: "clients",
        title: "Clients",
        items: [
          { label: "IDE agents", note: "MCP stdio / HTTP" },
          { label: "CLI", note: "12 leaf commands" },
        ],
      },
      {
        id: "core",
        title: "Core",
        items: [
          { label: "Retrieval", note: "Hybrid RRF_K=2 + citations" },
          { label: "Workers", note: "5 BullMQ job types" },
        ],
      },
      {
        id: "data",
        title: "Data",
        items: [
          { label: "Postgres", note: "6 tables · decisions NOT NULL source_url" },
          { label: "Qdrant", note: "code_chunks hybrid · decisions dense" },
        ],
      },
    ],
    code: "https://github.com/Jassu78/CodeOracle",
    status: "Open source",
  },
  {
    slug: "codegym-ai",
    name: "CodeGym-AI",
    blurb:
      "AI coding mentor: generate · run · score · hint — coaches instead of dumping answers.",
    detail:
      "Live product proof of eval-minded UX. Generates problems by topic, language, and difficulty (Java, Python, C), runs solutions, scores quality, and coaches with stepwise hints instead of full spoilers. Built end-to-end in Next.js + Gemini with real loading and error states so the demo survives interviews.",
    year: "2025",
    kind: "product",
    featured: true,
    highlights: [
      "Topic · language · difficulty generation",
      "Execute → compare → score loop",
      "Hint chat that resists spoilers",
      "Live on Vercel",
    ],
    stack: ["Next.js", "TypeScript", "Gemini", "shadcn/ui"],
    layers: [
      {
        id: "ui",
        title: "UI",
        items: [
          { label: "Next.js app", note: "Editor + chat" },
        ],
      },
      {
        id: "ai",
        title: "AI loop",
        items: [
          { label: "Generator", note: "Gemini" },
          { label: "Coach", note: "Hints" },
          { label: "Scorer", note: "Post-run" },
        ],
      },
    ],
    live: "https://code-gym-ai.vercel.app",
    code: "https://github.com/jassu78/CodeGym-AI",
    status: "Live",
  },
  {
    slug: "glasspdf",
    name: "GlassPDF",
    blurb: "Browser-only PDF toolkit — merge, split, compress, image↔PDF. Files never leave the device.",
    detail:
      "Privacy-first document utilities that run entirely in the browser. Built as a systems + UX exercise: offline capability, clear failure states, and a glass-style interface without shipping user files to a server. Separate product from Pdf-Worker — same problem space, web platform.",
    year: "2024–2025",
    kind: "product",
    featured: true,
    highlights: [
      "All processing client-side (pdf-lib / PDF.js)",
      "Merge, split, compress, image↔PDF flows",
      "No upload backend — privacy is the product constraint",
      "Static deploy on GitHub Pages",
    ],
    stack: ["HTML/CSS/JS", "pdf-lib", "PDF.js", "Tailwind"],
    layers: [
      {
        id: "ui",
        title: "UI",
        items: [{ label: "Static web app", note: "GitHub Pages" }],
      },
      {
        id: "local",
        title: "Local pipeline",
        items: [
          { label: "PDF.js", note: "Render / inspect" },
          { label: "pdf-lib", note: "Transform" },
        ],
      },
    ],
    live: "https://jassu78.github.io/GlassPDF/index.html",
    code: "https://github.com/jassu78/GlassPDF",
    status: "Live",
  },
  {
    slug: "pdf-worker",
    name: "Pdf-Worker",
    blurb: "Native Android PDF utility with CI APK builds on every main push.",
    detail:
      "Same problem space as GlassPDF, different platform: offline merge/reorder and share on Android. CI publishes APKs on every main push so the artifact path is part of the engineering story — not a one-off local build.",
    year: "2024–2025",
    kind: "mobile",
    featured: true,
    highlights: [
      "Jetpack Compose UI",
      "PDFBox-Android for offline ops",
      "GitHub Actions APK on every main push",
    ],
    stack: ["Kotlin", "Jetpack Compose", "PDFBox", "GitHub Actions"],
    live: "https://jassu78.github.io/Pdf-Worker/",
    code: "https://github.com/jassu78/Pdf-Worker",
    status: "Live",
  },
  {
    slug: "meeting-summarizer",
    name: "Meeting Summarizer",
    blurb:
      "Teams → Whisper → LLM → email. Led 12→24 endgame team; Graph API when it looked impossible; Infosys Summit.",
    detail:
      "End-to-end meeting intelligence for Microsoft Teams: Graph API recording ingest, Whisper transcription, LLM summary and action-item extraction, email delivery, and a Streamlit operator UI. Infosys Springboard flagship under a team that grew from 12 into a 24-member endgame I led — people management plus core delivery, including the Graph path others doubted would work. ~8 Scrum sprints across May–Aug, 2–3 remote demos before selection, and the first project where ChatGPT accelerated the build while I still owned what shipped. Full industrial SDLC for a product meant to be used live. Selected as 1 of 4 from ~35,000; Summit 2024 to ~2,000 people. Public GitHub mirrors the pipeline shape.",
    year: "2024",
    kind: "hackathon",
    featured: true,
    highlights: [
      "People management + core delivery",
      "Graph API path that actually shipped",
      "12→24 endgame · ~8 Scrum sprints",
      "2–3 remote demos → Summit select",
      "Open repo for the pipeline",
    ],
    stack: ["Python", "Whisper", "OpenAI", "Microsoft Graph", "Streamlit"],
    layers: [
      {
        id: "ingest",
        title: "Ingest",
        items: [{ label: "MS Graph", note: "Teams recordings · hard path" }],
      },
      {
        id: "ai",
        title: "AI",
        items: [
          { label: "Whisper", note: "Transcription" },
          { label: "LLM", note: "Summary + actions" },
        ],
      },
      {
        id: "out",
        title: "Deliver",
        items: [
          { label: "Streamlit UI", note: "Operator surface" },
          { label: "Email", note: "Attendee delivery" },
        ],
      },
    ],
    code: "https://github.com/jassu78/Meeting-Summarizer-and-Plan-of-Action-Generator",
    status: "Open source",
  },
  {
    slug: "landsat",
    name: "Landsat · NASA Space Apps",
    blurb:
      "NASA Space Apps Challenge 2024 Global Finalist — team lead. 40 finalists from ~10,000 submissions (0.4%).",
    detail:
      "NASA Space Apps Challenge 2024 Global Finalist and team lead. Official selection: 40 Global Finalists from ~10,000 submissions worldwide (0.4%). Place/GPS targeting, Landsat 8/9 pass prediction, cloud cover thresholds, 3×3 pixel grid exploration, surface temperature, spectral signatures, and download/share flows — dense Earthdata integration under hackathon time pressure.",
    year: "2024",
    kind: "hackathon",
    featured: true,
    highlights: [
      "Global Finalist 2024 · 40 of ~10k (0.4%)",
      "Team lead",
      "Pass prediction + cloud thresholds",
      "Spectral / temperature exploration UX",
    ],
    stack: ["NASA Earthdata", "Python", "Web"],
    code: "https://github.com/jassu78/LandSat-App",
    status: "Open source",
    metrics: [
      {
        label: "Selection",
        value: "0.4%",
        note: "40 Global Finalists from ~10,000 submissions · 2024",
      },
      { label: "Role", value: "Team lead", note: "Landsat Earthdata app" },
    ],
  },
  {
    slug: "urban-planner",
    name: "Urban Planner 2025",
    blurb: "Climate/urban-planning prototype on NASA Earth observation data.",
    detail:
      "Space Apps 2025 prototype: Next.js + Python for climate/urban planning using NASA Earth observation data. Treated as a shipping prototype with a live deploy — not labeled a 2024-style finalist unless an official result says so.",
    year: "2025",
    kind: "hackathon",
    highlights: [
      "Next.js + Python split",
      "Earth observation–driven planning UI",
      "Deployed prototype on Vercel",
    ],
    stack: ["Next.js", "Python", "NASA EO"],
    live: "https://space-apps-2025-urban-planner.vercel.app",
    code: "https://github.com/jassu78/SpaceApps-2025-UrbanPlanner",
    status: "Live",
  },
  {
    slug: "mental-health-bot",
    name: "Student Mental Health Bot",
    blurb: "Empathy-bounded student chatbot with auth, onboarding quiz, and persisted history.",
    detail:
      "Google Hackathon build (team lead, Sep–Nov 2024): Flask backend with auth, onboarding assessment for tone, chat history, and Gemini responses constrained for a student-support context — not an open-ended unrestricted chatbot.",
    year: "2024",
    kind: "hackathon",
    highlights: [
      "Team lead",
      "Auth + onboarding tone quiz",
      "Persisted chat history · Gemini responses",
      "Empathy-bounded response policy",
    ],
    stack: ["Flask", "Gemini", "SQLAlchemy"],
    code: "https://github.com/jassu78/Student_Mental_Health_Bot",
    status: "Open source",
  },
  {
    slug: "helmalert",
    name: "HelmAlert",
    blurb:
      "B.Tech major — bike/scooter-mounted safety module; IoT Accident Detection is the phone-side monitor.",
    detail:
      "Academic hardware major project: an embedded safety module that sits on a bike or scooter. The companion phone app — IoT Accident Detection — monitors gyroscope and accelerometer, and on a detected accident SMS-alerts pre-listed numbers with the rider’s location. Kept as ECE→systems proof; not a production product claim.",
    year: "2024–2025",
    kind: "oss-adjacent",
    status: "Academic",
    highlights: [
      "Bike/scooter-mounted embedded module",
      "Pairs with IoT Accident Detection (phone sensors)",
      "B.Tech major · hardware + systems framing",
    ],
    stack: ["Embedded", "Sensors", "Academic"],
  },
  {
    slug: "iot-accident-detection",
    name: "IoT Accident Detection",
    blurb:
      "Phone submodule of HelmAlert — gyro/accel monitoring; SMS alerts with location to pre-listed numbers.",
    detail:
      "Android (Kotlin) application in the HelmAlert major: reads gyroscope and accelerometer on the phone, detects accident-like events, and sends alerts to pre-listed numbers with the exact location. Complements the bike/scooter-mounted HelmAlert hardware module. Public code only.",
    year: "2024–2025",
    kind: "mobile",
    status: "Open source",
    highlights: [
      "Gyro + accelerometer accident detection",
      "SMS alerts with location to pre-listed contacts",
      "Submodule of HelmAlert (bike/scooter hardware)",
    ],
    stack: ["Kotlin", "Android", "Sensors"],
    code: "https://github.com/jassu78/IoT-Accident-Detection",
  },
  {
    slug: "telugu-pdf-epub",
    name: "Telugu PDF → EPUB",
    blurb: "OCR Telugu PDF pages into structured EPUB chapters.",
    detail:
      "Streamlit pipeline using Tesseract + Poppler + ebooklib to turn Telugu PDF scans into EPUB with chapters and metadata. Framed as an OCR/systems exercise — no undefended accuracy percentages.",
    year: "2024",
    kind: "oss-adjacent",
    status: "Open source",
    highlights: [
      "Tesseract OCR on Telugu pages",
      "EPUB packaging with chapters/metadata",
      "Streamlit operator UI",
    ],
    stack: ["Streamlit", "Tesseract", "Poppler", "ebooklib"],
  },
  {
    slug: "job-watch-lab",
    name: "Job Watch",
    blurb:
      "Adaptable ATS module lab: 12 source adapters · 35 boards · Aho–Corasick filters · Telegram + catalog · seed→watch dedupe.",
    detail:
      "Personal job-alert system on the OCI lab. Built as an adaptable module structure: each ATS/aggregator is a registered Source adapter (type_name + prepare/fetch/probe) wired through a registry — add a board in JSON, not a new pipeline. 12 adapter types (Greenhouse, Lever, Ashby, Workday, SmartRecruiters, Amazon jobs, RSS, Infosys, Accenture Elastic, Adzuna, Remotive, JSearch); 35 enabled boards in config. Pipeline: ThreadPool fetch (8 workers) → Aho–Corasick keyword/title/location/age filters → seed→watch seen-state (first crawl catalogs without spam) → SQLite WAL (jobs · FTS · source_runs · circuits) → knapsack-packed Telegram alerts. Bot: 9 commands (/status · /filters · /sources · /latest · mute/unmute · …) + private catalog web. HTTP retries 3× / 1.5× backoff; circuit breaker trips after 3 fails (6h cooldown). n8n schedules watches 2×/day (IST). Stdlib-only Python — no heavy framework. Private chat + private repo; no tokens or hostnames here.",
    year: "2026",
    kind: "lab",
    featured: true,
    metrics: [
      { label: "Source adapters", value: "12", note: "Registry plugins · Greenhouse → JSearch" },
      { label: "Boards watched", value: "35", note: "companies.json + aggregators · enabled" },
      { label: "Fetch workers", value: "8", note: "Concurrent · 3 retries · 1.5× backoff" },
      { label: "Telegram cmds", value: "9", note: "status · filters · sources · latest · mute…" },
      { label: "Filter engine", value: "Aho–Corasick", note: "Keyword · title · location · age gates" },
      { label: "Watch schedule", value: "2×/day", note: "n8n IST · seed→watch dedupe" },
    ],
    decisions: [
      {
        choice: "Registry + Source adapter interface",
        why: "Each ATS has a different shape; one scraper string does not survive. New boards are config + a typed module.",
        alternative: "Single HTML scraper for all sources",
      },
      {
        choice: "Seed → watch seen-state",
        why: "First crawl would otherwise flood alerts with the entire backlog.",
        alternative: "Alert on every historical match",
      },
      {
        choice: "Knapsack pack under Telegram char budget",
        why: "Raw dumps hit message limits and bury useful jobs.",
        alternative: "One message per job",
      },
      {
        choice: "Stdlib-only Python",
        why: "Keep the OCI Always Free box lean — urllib, SQLite, no framework tax.",
        alternative: "FastAPI + Redis + managed queues",
      },
    ],
    optimizations: [
      {
        change: "Aho–Corasick include/exclude filters",
        why: "Per-posting regex loops do not scale across many sources.",
        result: "Fast multi-pattern keyword/title/location gates before rank/alert",
      },
      {
        change: "Per-source circuit breaker (3 fails → 6h cool-down)",
        why: "One dead board should not poison the whole watch run.",
        result: "Source-level failure isolation + health in SQLite",
      },
      {
        change: "SQLite WAL + FTS + run history",
        why: "Need durable matches and queryable history without a heavy DB.",
        result: "Local catalog with jobs_fts and source_runs",
      },
    ],
    highlights: [
      "Adaptable module structure: @register Source adapters + JSON boards",
      "12 adapter types · 35 enabled boards · 8 concurrent workers",
      "Aho–Corasick filters · seed→watch dedupe · knapsack notify pack",
      "9 Telegram commands · private catalog web (Mini App / desk-key)",
      "SQLite WAL · FTS · circuits · 3× HTTP retry / 6h cooldown",
      "n8n 2×/day watch + systemd bot on OCI",
    ],
    stack: [
      "Python",
      "Telegram Bot API",
      "SQLite",
      "Aho–Corasick",
      "Greenhouse / Workday",
      "n8n",
      "OCI · systemd",
    ],
    layers: [
      {
        id: "sources",
        title: "Adapters",
        items: [
          { label: "ATS boards", note: "Greenhouse · Lever · Ashby · Workday · SmartRecruiters" },
          { label: "Company APIs", note: "Amazon · Infosys · Accenture Elastic · RSS" },
          { label: "Aggregators", note: "Adzuna · Remotive · JSearch" },
          { label: "Registry", note: "@register · type_name · prepare/fetch/probe" },
        ],
      },
      {
        id: "core",
        title: "Pipeline",
        items: [
          { label: "Fetch pool", note: "8 workers · 3 retries · 1.5× backoff" },
          { label: "Filter / rank", note: "Aho–Corasick · title · location · age" },
          { label: "Seen + SQLite", note: "seed/watch · WAL · FTS · circuits" },
        ],
      },
      {
        id: "surfaces",
        title: "Surfaces",
        items: [
          { label: "Telegram bot", note: "9 cmds · mute · catalog deep-link" },
          { label: "Catalog web", note: "filters · history · Mini App auth" },
          { label: "n8n + systemd", note: "2×/day watch · always-on bot" },
        ],
      },
    ],
    code: "https://github.com/Jassu78/job-watch-lab",
    status: "In use",
  },
  {
    slug: "oci-lab",
    name: "Personal cloud lab (OCI)",
    blurb:
      "Private dual-OCI lab: ARM + x86 · Tailscale · Docker · local LLMs · n8n · monitoring · E2EE share + Matrix.",
    detail:
      "Personal Always Free–class dual lab I own and operate — not employment.\n\nARM box (A1.Flex · 2 OCPU · 12 GB): Docker Compose services, local LLMs, automation, and monitoring behind Tailscale.\n\nx86 micro box: private E2EE file share, Matrix chat, and media stack behind a reverse proxy.\n\nAdmin surfaces stay on the Tailscale mesh. No public hostnames, IPs, or bot tokens in this writeup.",
    year: "2025–2026",
    kind: "lab",
    featured: true,
    status: "In use",
    highlights: [
      "Dual OCI: ARM A1.Flex (2 OCPU / 12 GB) + Always Free x86 micro",
      "Ubuntu 24.04 · Docker Compose · Tailscale private mesh · UFW",
      "Ops: Uptime Kuma · Portainer · Homepage · health → Telegram",
      "Automation: n8n workflows · Job Watch lab · systemd user units",
      "LLMs: llama.cpp Qwen2.5 3B · Ollama qwen2.5-coder:1.5b · nomic-embed-text",
      "Open WebUI + OpenRouter free-tier routing for study sessions",
      "Remote coding: Cursor CLI / Web on the ARM box",
      "Private stacks: Hoodik E2EE files · Matrix Conduit · Jellyfin",
    ],
    stack: [
      "OCI",
      "Docker",
      "Linux",
      "Tailscale",
      "n8n",
      "Uptime Kuma",
      "Portainer",
      "llama.cpp",
      "Ollama",
      "Open WebUI",
      "OpenRouter",
      "Matrix",
      "Hoodik",
    ],
    metrics: [
      { label: "Boxes", value: "2", note: "ARM A1.Flex + Always Free x86 micro" },
      { label: "ARM shape", value: "2 / 12", note: "OCPU · GB RAM · aarch64" },
      { label: "Access", value: "Tailscale", note: "Private mesh · UFW · no public admin" },
      { label: "LLM (ARM)", value: "Qwen2.5 3B", note: "llama.cpp OpenAI-compatible API" },
      { label: "Coder", value: "1.5b", note: "Ollama qwen2.5-coder:1.5b" },
      { label: "Embed", value: "nomic", note: "nomic-embed-text via Ollama" },
    ],
    decisions: [
      {
        choice: "Dual Always Free–class boxes instead of one fat VM",
        why: "Split LLM/automation load (ARM) from lightweight private share/chat (x86) within free-tier limits.",
        alternative: "Single larger paid instance",
      },
      {
        choice: "Tailscale for admin, not public dashboards",
        why: "Portainer, Kuma, Open WebUI, and n8n should not face the open internet.",
        alternative: "Expose every UI with only reverse-proxy auth",
      },
      {
        choice: "Docker Compose + Homepage + Portainer",
        why: "Need a repeatable multi-service lab with one-click service discovery and container ops.",
        alternative: "Bare systemd units for every app",
      },
      {
        choice: "Local Ollama / llama.cpp + OpenRouter free tier",
        why: "Stay usable offline for embeds/coder work, and route study chat when free cloud quota is enough.",
        alternative: "Paid cloud LLM only",
      },
    ],
    optimizations: [
      {
        change: "Uptime Kuma + Telegram health alerts",
        why: "Catch container/host failures without watching dashboards all day.",
        result: "Threshold alerts on Telegram when services drop",
      },
      {
        change: "n8n on the ARM box",
        why: "Schedule Job Watch and other workflows next to the data plane.",
        result: "Cron-style automations without a separate SaaS runner",
      },
      {
        change: "E2EE file share (Hoodik) + Matrix Conduit",
        why: "Need private share/chat without handing content to a third-party host.",
        result: "Self-hosted encrypted files and private chat on the micro box",
      },
      {
        change: "Open WebUI in front of local + routed models",
        why: "One ChatGPT-style surface for local Qwen and OpenRouter free models.",
        result: "Single private UI for study and lab experiments",
      },
    ],
    layers: [
      {
        id: "edge",
        title: "Access",
        items: [
          { label: "Tailscale", note: "Admin mesh · preferred SSH" },
          { label: "UFW", note: "Tailscale allow · SSH fallback" },
          { label: "Homepage", note: "Service launcher" },
          { label: "Reverse proxy", note: "TLS termination on micro box" },
        ],
      },
      {
        id: "ops",
        title: "Ops",
        items: [
          { label: "Uptime Kuma", note: "Health dashboards + alerts" },
          { label: "Portainer", note: "Container management" },
          { label: "n8n", note: "Workflows → Telegram" },
          { label: "systemd", note: "Bots · health timer · user units" },
        ],
      },
      {
        id: "ai",
        title: "AI plane",
        items: [
          { label: "llama.cpp", note: "Qwen2.5 3B · /v1 API" },
          { label: "Ollama", note: "qwen2.5-coder:1.5b · nomic-embed-text" },
          { label: "Open WebUI", note: "Chat front door" },
          { label: "OpenRouter", note: "Free-tier model routing" },
        ],
      },
      {
        id: "apps",
        title: "Services",
        items: [
          { label: "Job Watch", note: "ATS crawl → Telegram" },
          { label: "Hoodik", note: "E2EE file share" },
          { label: "Matrix Conduit", note: "Private chat server" },
          { label: "Jellyfin", note: "Private media (micro)" },
          { label: "Cursor CLI", note: "Remote coding on ARM" },
        ],
      },
      {
        id: "compute",
        title: "Compute",
        items: [
          { label: "Alin (ARM)", note: "A1.Flex · 2 OCPU · 12 GB · Hyderabad" },
          { label: "Micro (x86)", note: "Always Free E2.1.Micro · 1 GB" },
          { label: "OS", note: "Ubuntu 24.04 LTS on both" },
        ],
      },
    ],
  },
];

export type { ExperienceRole, ProofMetric, ProofSection } from "./content/experience";
export { experience } from "./content/experience";

/** Interactive system-design explorers. */
export type FlowNode = {
  id: string;
  label: string;
  kind: "client" | "orchestrator" | "tool" | "memory" | "guard" | "worker" | "data" | "eval";
  detail: string;
};

export type SystemFlow = {
  id: string;
  title: string;
  subtitle: string;
  why: string;
  concepts: string[];
  nodes: FlowNode[];
  /** Ordered edges as from→to for loop visualization */
  loop: string[];
  caseSlug?: string;
};

export const systemFlows: SystemFlow[] = [
  {
    id: "companion-loop",
    title: "Companion agent loop",
    subtitle: "Production conversational agent for Kea",
    why: "Not a chatbot wrapper — a gated orchestrator with tools, memory, budgets, and explicit context caching.",
    concepts: [
      "Orchestrator / planner",
      "Tool registry",
      "Short + long memory",
      "Safety gates",
      "Async workers",
    ],
    caseSlug: "ai-companion",
    nodes: [
      {
        id: "device",
        label: "Device client",
        kind: "client",
        detail: "Qt/QML on-device client: chat, voice UX, focus navigation. Talks to cloud over gRPC + voice WebSockets.",
      },
      {
        id: "orch",
        label: "Orchestrator",
        kind: "orchestrator",
        detail: "Request pipeline with gating and error handling. Decides whether to answer, call tools, or refuse.",
      },
      {
        id: "guard",
        label: "Safety / PII",
        kind: "guard",
        detail: "Microsoft Presidio detect/anonymize for PII and sensitive fields before model I/O. Designed the safety path; team continued tuning in test.",
      },
      {
        id: "budget",
        label: "Context budget",
        kind: "guard",
        detail:
          "Summarize at 70% of budget, hard-trim at 90%; rolling summary + recent turns cut long-session history load by 70% (90% in hard sessions). Explicit context cache: 90% off cached prompt/tool tokens.",
      },
      {
        id: "tools",
        label: "Tools",
        kind: "tool",
        detail:
          "Parallel multi-tool calling into tutor, quiz, and media — result handoff cuts consecutive tool trips by 50–60%.",
      },
      {
        id: "memory",
        label: "Memory / RAG",
        kind: "memory",
        detail: "Async ingest of turns → embeddings → vector store → retrieval back into the prompt.",
      },
      {
        id: "workers",
        label: "BullMQ workers",
        kind: "worker",
        detail: "Summarization and memory ingest off the request path for reliability and backpressure.",
      },
      {
        id: "obs",
        label: "Observability",
        kind: "eval",
        detail: "Error tracking on API/worker; Langfuse + PostHog self-hosted on a dedicated VM.",
      },
    ],
    loop: ["device", "orch", "guard", "budget", "tools", "memory", "workers", "orch", "device"],
  },
  {
    id: "codeoracle-mcp",
    title: "CodeOracle · MCP decision memory",
    subtitle: "Hybrid search + citation-backed WHY for any MCP client",
    why: "Agents re-read trees and forget decisions. CodeOracle returns ranked chunks and WHY with citations — stdio or Streamable HTTP.",
    concepts: [
      "3 MCP tools · citations required",
      "Hybrid RRF_K=2",
      "5 BullMQ job types",
      "14 packages · ~17k TS",
      "Golden eval · hit@3 ≥80%",
      "₹0 Ollama embed path",
    ],
    caseSlug: "codeoracle",
    nodes: [
      {
        id: "ide",
        label: "IDE agent",
        kind: "client",
        detail:
          "Cursor / Claude Code (or any MCP client) calls search_codebase, explain_file, or find_decision.",
      },
      {
        id: "mcp",
        label: "MCP server",
        kind: "orchestrator",
        detail: "stdio for local editors; Streamable HTTP with required bearer for remote.",
      },
      {
        id: "retrieve",
        label: "Hybrid retrieval",
        kind: "memory",
        detail: "Dense + sparse over Qdrant fused with RRF_K=2; answers carry path / PR citations.",
      },
      {
        id: "chunk",
        label: "Chunk / extract",
        kind: "worker",
        detail:
          "BullMQ pipeline (5 job types): tree-sitter chunk → embed → optional decision extract from PR/commit history.",
      },
      {
        id: "gateway",
        label: "LLM gateway",
        kind: "tool",
        detail:
          "providers.yaml only — Ollama embeddings by default; any OpenAI-compatible chat for extraction.",
      },
      {
        id: "data",
        label: "Data plane",
        kind: "data",
        detail: "Postgres · Redis/BullMQ · Qdrant · Compose; GitHub webhooks queue incremental reindex.",
      },
      {
        id: "eval",
        label: "Golden eval",
        kind: "eval",
        detail: "Golden-query fixtures gated in CI so retrieval quality does not silently regress.",
      },
    ],
    loop: ["ide", "mcp", "retrieve", "gateway", "mcp", "ide"],
  },
  {
    id: "job-watch",
    title: "Job Watch · adaptable ATS modules",
    subtitle: "12 adapters · 35 boards · Aho–Corasick → SQLite → Telegram",
    why: "Job boards are noisy and differently shaped. Register typed Source adapters, filter hard, store matches, ping Telegram only on new hits.",
    concepts: [
      "12 Source adapters · registry",
      "35 enabled boards",
      "Aho–Corasick filtering",
      "Seed → watch dedupe",
      "8 concurrent workers · circuits",
      "9 Telegram cmds · catalog web",
    ],
    caseSlug: "job-watch-lab",
    nodes: [
      {
        id: "boards",
        label: "ATS / aggregators",
        kind: "data",
        detail:
          "12 registered adapters (Greenhouse → JSearch). Config boards call type_name via @register — add a board in JSON, not a new pipeline.",
      },
      {
        id: "fetch",
        label: "Fetch pool",
        kind: "worker",
        detail: "8 concurrent workers · 3 retries · 1.5× backoff; circuit breaker after 3 fails (6h cool-down).",
      },
      {
        id: "filter",
        label: "Filter / rank",
        kind: "guard",
        detail:
          "Custom Aho–Corasick on keywords + title/location/age gates; rank before alert cap.",
      },
      {
        id: "state",
        label: "Seen + SQLite",
        kind: "memory",
        detail:
          "Seed initializes silently; watch emits new matches. WAL DB: jobs · FTS · source_runs · circuits.",
      },
      {
        id: "bot",
        label: "Telegram bot",
        kind: "client",
        detail:
          "9 commands: /status · /filters · /sources · /latest · mute/unmute · catalog · … + knapsack-packed alerts.",
      },
      {
        id: "web",
        label: "Catalog web",
        kind: "tool",
        detail:
          "Private filter & history UI — Telegram Mini App auth or desk-key fallback; Tailscale-only bind.",
      },
      {
        id: "ops",
        label: "Ops triggers",
        kind: "eval",
        detail: "n8n watch workflow + knapsack packing under Telegram’s character budget.",
      },
    ],
    loop: ["boards", "fetch", "filter", "state", "bot"],
  },
  {
    id: "tutor-progress",
    title: "Adaptive tutor sequencing",
    subtitle: "Progress-aware lessons over gRPC",
    why: "Generation alone is not enough — next content depends on what the learner already did.",
    concepts: ["Progress model", "gRPC contracts", "Generation iteration", "Content versioning"],
    caseSlug: "adaptive-tutor",
    nodes: [
      {
        id: "client",
        label: "Device / admin",
        kind: "client",
        detail: "Device consumes tutor over gRPC; admin tools manage subjects and content ops.",
      },
      {
        id: "tutor",
        label: "Tutor service",
        kind: "orchestrator",
        detail: "Topics, lessons, quizzes with versioning — multiple generation approaches before ship.",
      },
      {
        id: "progress",
        label: "Progress store",
        kind: "memory",
        detail: "Learner state drives sequencing so the next chapter is not a flash dump.",
      },
      {
        id: "gen",
        label: "LLM generate",
        kind: "tool",
        detail:
          "Vertex AI pipeline: unlock 25% of the course first (parallel), defer 75% until later unlocks; versioned for rollback.",
      },
    ],
    loop: ["client", "tutor", "progress", "gen", "tutor", "client"],
  },
];

export const education = [
  {
    degree: "M.Tech, Computer Science and Engineering",
    school: "Vignan's Institute of Information Technology, Visakhapatnam",
    dates: "2025 – Present",
  },
  {
    degree: "B.Tech, Electronics and Communication Engineering",
    school: "Vignan's Institute of Information Technology, Visakhapatnam",
    dates: "2021 – 2025 · CGPA 8.26",
  },
];

export type Achievement = {
  title: string;
  detail: string;
  year?: string;
  /** Visual tone for the achievement showcase */
  tone?: "summit" | "orbit" | "rise" | "forge";
  /** In-site links tying the proof to Experience or a project */
  links?: { label: string; to: string }[];
};

export const achievements: Achievement[] = [
  {
    title: "Infosys Springboard Summit 2024",
    year: "2024",
    tone: "summit",
    detail:
      "4 of ~35,000 · ~2,000 audience. Led the 12→24 endgame team with ~8 Scrum sprints, people management, core Graph delivery, and 2–3 remote demos before the invite.",
    links: [
      { label: "Work", to: "/work" },
      { label: "Meeting Summarizer", to: "/projects/meeting-summarizer" },
    ],
  },
  {
    title: "NASA Space Apps 2024 Global Finalist",
    year: "2024",
    tone: "orbit",
    detail:
      "Team lead on a Landsat Earthdata app. Official 2024 selection: 40 Global Finalists from ~10,000 submissions worldwide (0.4%) — pass prediction, cloud thresholds, spectral exploration under hackathon pressure.",
    links: [{ label: "Landsat project", to: "/projects/landsat" }],
  },
  {
    title: "Unsupported Linux OS bring-up",
    year: "2025",
    tone: "forge",
    detail:
      "Sole owner of the custom rootfs / image / CI path. GitHub Actions + Docker builder with diff-gated reuse (~40→~3 min on builder cache hit) and firmware-pack update images for Kea devices.",
    links: [
      { label: "Work", to: "/work" },
      { label: "Embedded Linux", to: "/projects/linux-kiosk" },
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
  /** Path under public/ (no leading slash) — resolved with Vite BASE_URL */
  badgeImageUrl?: string;
  /** Short mark shown when there is no badge art (or image fails) */
  badgeMark: string;
};

/**
 * Portfolio certs: Credly-backed badges first (with artwork), then GCP / Arm / AI Primer.
 * Wallet: https://www.credly.com/users/jaswanth-jogi/badges
 */
export const certifications: Certification[] = [
  {
    name: "AWS Academy Graduate — Cloud Architecting",
    issuer: "Amazon Web Services",
    year: "2024",
    credentialUrl: "https://www.credly.com/badges/efce573e-ebb8-4269-a40a-2feffc72d8ff",
    badgeImageUrl: "certs/aws-architecting.png",
    badgeMark: "AWS",
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2024",
    credentialUrl: "https://www.credly.com/badges/9431f174-0119-4e65-a2e9-9970d5c5e024",
    badgeImageUrl: "certs/aws-foundations.png",
    badgeMark: "AWS",
  },
  {
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    year: "2024",
    credentialUrl: "https://www.credly.com/badges/e5544b5e-95c8-4c57-9a07-e62feea262b1",
    badgeImageUrl: "certs/google-cyber.png",
    badgeMark: "SEC",
  },
  {
    name: "Google AI Essentials",
    issuer: "Google / Coursera",
    year: "2024",
    credentialUrl: "https://www.credly.com/badges/2e92a954-d33a-4457-9de8-1db6691072e0",
    badgeImageUrl: "certs/google-ai.png",
    badgeMark: "AI",
  },
  {
    name: "Cybersecurity Essentials",
    issuer: "Cisco",
    year: "2023",
    credentialUrl: "https://www.credly.com/badges/8c8f606a-81ac-425c-be5d-ea06e777d12c",
    badgeImageUrl: "certs/cisco-cyber-essentials.png",
    badgeMark: "CISCO",
  },
  {
    name: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    year: "2024",
    credentialUrl: "https://www.credly.com/badges/99b23204-c0e4-413f-9df0-38a6dae59e09",
    badgeImageUrl: "certs/cisco-ccna-srwe.png",
    badgeMark: "CCNA",
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    year: "2023",
    credentialUrl: "https://www.credly.com/badges/3e46775e-23b3-434f-95f1-9610c670bb3c",
    badgeImageUrl: "certs/cisco-ccna-itn.png",
    badgeMark: "CCNA",
  },
  {
    name: "Cloud Computing Foundations: Cloud Computing Fundamentals",
    issuer: "Google Cloud Skills Boost",
    year: "2023",
    credentialUrl:
      "https://cloudskillsboost.google/public_profiles/984500fb-fc98-421e-8c95-a610c11d7412/badges/3575102",
    badgeMark: "GCP",
  },
  {
    name: "Cloud Computing Foundations: Infrastructure in Google Cloud",
    issuer: "Google Cloud Skills Boost",
    year: "2023",
    credentialUrl:
      "https://cloudskillsboost.google/public_profiles/984500fb-fc98-421e-8c95-a610c11d7412/badges/3580073",
    badgeMark: "GCP",
  },
  {
    name: "Embedded Systems Essentials with Arm",
    issuer: "Arm / edX",
    year: "2024",
    credentialUrl:
      "https://www.linkedin.com/posts/jassu78_ese102-embedded-systems-essentials-with-activity-7196487007982792704-i0ns",
    badgeMark: "ARM",
  },
  {
    name: "AI Primer",
    issuer: "Infosys Springboard",
    year: "2024",
    credentialUrl:
      "https://www.linkedin.com/posts/jassu78_ai-primer-certification-activity-7195852830388150275-uDD4",
    badgeMark: "INFY",
  },
];

const kindCategory: Record<Project["kind"], "Production" | "Personal" | "Public" | "Hackathon"> = {
  product: "Public",
  lab: "Personal",
  hackathon: "Hackathon",
  mobile: "Public",
  "oss-adjacent": "Public",
};

export type ProjectCatalogItem = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  category: "Production" | "Personal" | "Public" | "Hackathon";
  tags: string[];
  status?: Project["status"] | CaseStudy["status"];
  live?: string;
  code?: string;
};

/** Unified Projects index — case studies first, then remaining projects. */
export function getProjectCatalog(): ProjectCatalogItem[] {
  const fromStudies: ProjectCatalogItem[] = caseStudies.map((c) => ({
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle,
    year: c.year,
    category: c.category ?? "Public",
    tags: c.tags,
    status: c.status,
    live: c.live,
    code: c.code,
  }));
  const studySlugs = new Set(fromStudies.map((c) => c.slug));
  const fromProjects: ProjectCatalogItem[] = projects
    .filter((p) => !studySlugs.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.name,
      subtitle: p.blurb,
      year: p.year,
      category: kindCategory[p.kind],
      tags: p.stack.slice(0, 5),
      status: p.status,
      live: p.live,
      code: p.code,
    }));
  return [...fromStudies, ...fromProjects];
}

export function findCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function findProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
