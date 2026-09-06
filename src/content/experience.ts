/**
 * Experience roles — metrics & structured copy.
 * Source: docs/experience-proof.md
 */

export type ProofMetric = {
  value: string;
  label: string;
  note?: string;
};

export type ProofSection = {
  title: string;
  items: string[];
};

export type ExperienceRole = {
  role: string;
  org: string;
  dates: string;
  summary?: string;
  impact: string;
  metrics?: ProofMetric[];
  highlights?: string[];
  systems: string[];
  concepts: string[];
  bullets: string[];
  detailSections?: ProofSection[];
  caseSlugs?: string[];
};

export const experience: ExperienceRole[] = [
  {
    role: "Software Engineer",
    org: "Pocketrocket Labs",
    dates: "Nov 2025 – Present · Remote",
    summary:
      "Build AI, backend, web, and on-device software for Kea — a children’s learning companion (early childhood through early teens).",
    impact:
      "Owns companion, tutor, device gRPC, and embedded Linux paths end-to-end for Kea — cut companion reply latency 29s → 7s → 5s → ~3s without quality loss; orchestration, memory/RAG, cloud ops, and on-device bring-up.",
    metrics: [
      {
        value: "29s→~3s",
        label: "Companion reply",
        note: "Via 7s · then 5s · no quality loss",
      },
      {
        value: "90%",
        label: "Cached token discount",
        note: "Explicit context cache",
      },
      {
        value: "70%",
        label: "Less history load",
        note: "Long sessions",
      },
      {
        value: "25% / 75%",
        label: "Tutor unlock",
        note: "Visible wave · rest deferred",
      },
    ],
    highlights: [
      "Companion latency 29s → 7s → 5s → ~3s · no quality loss",
      "Explicit context cache · 90% off cached prompt/tool tokens",
      "Owned prompt system · guided the team through updates",
      "Microsoft Presidio · PII detect / anonymize on the request path",
      "Rolling context · 70% history cut · parallel multi-tool",
      "GCP VM ops · off-hours recovery when staging fails",
      "Self-hosted PostHog + Langfuse on a dedicated VM",
      "GitHub Actions + Docker CI · diff reuse · ~90% on builder job",
      "Firmware pack release train for Kea device updates",
      "Adaptive tutor · parallel unlock waves",
      "Sole Linux OS / image path owner",
      "Security investigation · ZAP · hardening",
    ],
    systems: [
      "Companion API",
      "Adaptive tutor",
      "Memory / retrieval",
      "On-device client",
      "OS image / CI",
      "Consumer & admin web",
    ],
    concepts: [
      "Orchestrator + adapters",
      "Context & token budgets",
      "Presidio PII / safety",
      "Hybrid / rerank retrieval",
      "Async workers",
      "On-demand voice",
      "gRPC device edge",
      "GitHub Actions / Docker CI",
      "Agentic coding (CLI-first)",
    ],
    caseSlugs: ["ai-companion", "adaptive-tutor", "linux-kiosk"],
    bullets: [],
    detailSections: [
      {
        title: "AI companion",
        items: [
          "Production orchestrator with LLM and safety adapters — chat, voice, parallel multi-tool calling, error handling",
          "Cut companion reply latency from 29s → 7s → 5s → ~3s by owning the prompt system (authored it, guided the team through every update) and the request path — no quality loss",
          "Explicit context caching for core system prompts and tools (24h TTL) — 90% off cached input tokens so we do not re-pay full prompt cost every turn",
          "Context policy: summarize at 70% of budget, hard-trim at 90%; recent turns plus rolling summary cut long-session history load by 70%; hard sessions cut load by 90%",
          "Parallel multi-tool execution with result/context handoff — 50–60% fewer consecutive tool round-trips when tools share data",
          "Async BullMQ workers for summarization and memory ingest; concurrency caps, idempotent jobs, and dedupe so retries do not stack",
          "On-demand voice with idle teardown to shed always-on session load",
          "Designed the safety/PII path with Microsoft Presidio — detect and anonymize PII (and related sensitive fields) before model I/O; guided teammates on the retrieval path they continued hosting",
          "Production error tracking on API and worker; self-hosted Langfuse and PostHog on a dedicated VM for tracing and product analytics",
        ],
      },
      {
        title: "Adaptive tutor",
        items: [
          "Topics, lessons, quizzes, and progress tracking over gRPC",
          "25% unlock waves — defer 75% of upfront course generation; generate the visible share in parallel",
          "Next content from learner history, not a static playlist",
        ],
      },
      {
        title: "Device & Linux",
        items: [
          "Qt/QML + C++ on-device client: navigation, media, settings, voice UX, boot/splash",
          "Sole owner of the unsupported-hardware OS / rootfs / image / CI path",
          "GitHub Actions workflows + Docker builder image (YAML) — path-filtered rebuilds, GHA layer cache, and FetchContent caching; builder job ~40 min → ~3 min on cache hit (~90% on that job)",
          "Diff-gated release CI: reuse the prior Kea app bundle when only image/docs/CI changed; compile only when app source differs",
          "Firmware-pack release train — flashable update images (full RKFW img + rootfs.ext4.xz) for Kea devices",
        ],
      },
      {
        title: "Platform & security",
        items: [
          "Core API: auth/RBAC, media APIs, background jobs, route hardening",
          "Consumer and parent-facing web surfaces for accounts, activity, and ops",
          "Replaced N+1 fetches with MongoDB aggregation pipelines — 80% lower latency on selected read APIs",
          "Operate GCP staging and production VMs day-to-day — monitor health, clear runtime failures, and restore services so the product stays usable",
          "Self-hosted PostHog and Langfuse on a dedicated VM — product analytics and LLM tracing under our control",
          "When staging failed with little runway left, owned off-hours recovery and restored the same failure mode on the parent portal so shipping was not blocked by infra",
          "Led a multi-day production security investigation, then drove OWASP ZAP testing, dependency pins, input validation, and security headers",
          "Owned the prompt system of record — authored prompts, guided the team through apply/test cycles, drove the latency cut to ~3s with no quality loss",
          "Daily agentic coding loop: Cursor (editor + CLI), Claude Code, OpenCode — CLI-preferring; instruct and architect so the tools accelerate without owning the design",
        ],
      },
    ],
  },
  {
    role: "Software Developer Intern",
    org: "Pocketrocket Labs",
    dates: "Jul 2025 – Oct 2025 · Remote / Visakhapatnam",
    impact:
      "Shipped the public marketing site and foundational auth/RBAC used across web products.",
    metrics: [
      { value: "Live", label: "Marketing site", note: "Next.js" },
      { value: "RBAC", label: "API auth", note: "Firebase" },
    ],
    highlights: [
      "Public marketing site shipped",
      "Auth + RBAC foundations",
      "Consumer web onboarding start",
    ],
    systems: ["Marketing site", "API auth / RBAC", "Consumer web foundations"],
    concepts: ["RBAC", "Firebase Auth", "Next.js product UI"],
    bullets: [
      "Implemented the public marketing site in Next.js",
      "Implemented Firebase auth and RBAC on the NestJS API used by web products",
      "Started consumer web UI (onboarding, dashboard foundations) against those APIs",
    ],
  },
  {
    role: "Embedded Systems Engineer Intern",
    org: "Amply Innovations Pvt. Ltd.",
    dates: "Dec 2024 – May 2025 · Visakhapatnam",
    summary:
      "Embedded + web path for an exercise-monitoring product: sensors on constrained hardware, firmware, and a surface operators could watch in real time.",
    impact:
      "Owned a sensor→firmware→web path for exercise monitoring — realtime telemetry and alerts on constrained hardware.",
    highlights: [
      "Sensor → firmware → web path",
      "Realtime operator monitoring",
      "Constrained-hardware bring-up",
    ],
    systems: [
      "Wireless sensor ingest",
      "Embedded C firmware",
      "Realtime monitoring web UI",
      "Alert / threshold path",
    ],
    concepts: [
      "Embedded I/O",
      "Telemetry streaming",
      "Hardware bring-up",
      "Operator dashboards",
    ],
    bullets: [
      "Built an end-to-end exercise-monitoring path: wireless sensors → embedded C firmware → web surface for live results",
      "Worked the constrained-hardware loop — bring-up, I/O, and keeping the stream stable enough for coaching/ops to watch sessions live",
      "Shaped monitoring and alert surfaces so threshold events and session state were visible without a separate heavyweight backend story",
      "Practiced the full embedded systems rhythm: firmware, serial/wireless data path, and a thin web UI that made the hardware useful to people",
    ],
  },
  {
    role: "AI/ML Intern · Team Lead",
    org: "Infosys Springboard",
    dates: "May 2024 – Aug 2024 · Virtual / Bengaluru",
    summary:
      "First real industrial product culture: SDLC + Scrum on software people could actually use. Grew from a 12-person pod into a 24-member endgame team I led — people management, core delivery, and the Graph API path that made the app work.",
    impact:
      "Led the final 24-member team on Meeting Summarizer (~8 Scrum sprints across May–Aug). Owned people management and the core build — including Microsoft Graph when others doubted it would land — then earned Summit selection (4 of ~35,000).",
    metrics: [
      { value: "12→24", label: "Team endgame", note: "Pods merged when we were finalized" },
      { value: "~8", label: "Scrum sprints", note: "From May–Aug duration · on-time" },
      { value: "2–3", label: "Remote demos", note: "Before Summit selection" },
      { value: "4 / 35k", label: "Summit select", note: "~2,000 live audience" },
    ],
    highlights: [
      "People management + core code ownership",
      "Graph API path when it looked impossible",
      "12→24 endgame team · ~8 sprints",
      "First industrial SDLC · live-ready product",
    ],
    systems: ["Graph ingest", "Whisper STT", "LLM summarize", "Email delivery", "Streamlit ops UI"],
    concepts: ["Team leadership", "Scrum / SDLC", "Speech→text pipeline", "Structured extraction"],
    caseSlugs: ["meeting-summarizer"],
    bullets: [],
    detailSections: [
      {
        title: "Leadership & culture",
        items: [
          "Started in a 12-member team; when we were finalized for the endgame we merged into a 24-member team I led — collaboration at scale, not a solo script",
          "Owned people management alongside delivery: kept ownership clear, collaboration honest, and sprint goals on time",
          "First immersion in industrial culture and full SDLC/Scrum for a product meant to be live and used by real people — a formative experience",
          "Earliest project where I used ChatGPT as a build accelerant while still owning architecture, integration, and what shipped",
        ],
      },
      {
        title: "Build & demos",
        items: [
          "Delivered the core application path end-to-end — including Microsoft Graph API integration that many assumed would not work in time; it shipped and the app ran",
          "~8 two-week Scrum sprints across the May–Aug internship window, with on-time delivery each sprint",
          "2–3 remote demos and presentations before Summit selection — staged proof, not a single final pitch",
        ],
      },
      {
        title: "Product & Summit",
        items: [
          "Meeting Summarizer and Plan of Action Generator for Microsoft Teams: Graph recordings → Whisper → LLM summary and action items → email to attendees (Streamlit operator UI)",
          "Selected as 1 of 4 projects from ~35,000 applicants; presented to ~2,000 people at Infosys Springboard Summit 2024",
        ],
      },
    ],
  },
  {
    role: "VLSI Intern",
    org: "Cranes Varsity",
    dates: "May 2024 – Jun 2024 · Bengaluru",
    impact: "Designed and testbenched a RAM memory controller in Verilog.",
    highlights: ["Verilog memory controller", "Vivado testbench"],
    systems: ["Memory controller", "Vivado testbench"],
    concepts: ["RTL design", "Verification"],
    bullets: [
      "Designed a RAM memory controller in Verilog (Xilinx Vivado) with a testbench for read/write sequencing",
    ],
  },
  {
    role: "AI/ML Virtual Intern",
    org: "Google",
    dates: "Jan 2024 – Mar 2024 · Virtual",
    impact: "Applied TensorFlow to classification and detection coursework projects.",
    highlights: ["TensorFlow coursework", "Detection · classification"],
    systems: ["TensorFlow models"],
    concepts: ["Neural nets", "Object detection", "Image classification"],
    bullets: [
      "TensorFlow coursework and projects: neural networks, object detection, image classification",
    ],
  },
];
