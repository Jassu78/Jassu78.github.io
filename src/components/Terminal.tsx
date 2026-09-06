import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  caseStudies,
  experience,
  person,
  projects,
  proof,
  stack,
  type ArchLayer,
  type CaseStudy,
  type Project,
} from "../content";
import { useTheme } from "../hooks/useTheme";
import { THEMES } from "../themes";
import { highlightTermText } from "./termHighlight";

type LineKind = "cmd" | "out" | "ok" | "err";

type Line = {
  id: string;
  kind: LineKind;
  text: string;
};

export type CliSelection =
  | { type: "case"; data: CaseStudy }
  | { type: "project"; data: Project }
  | null;

type Props = {
  autofocus?: boolean;
  /** Run once after mount (e.g. seeded from hero mini-term). */
  bootCommand?: string;
  onSelect?: (sel: CliSelection) => void;
};

const HINTS = [
  "whoami",
  "ls",
  "cat codeoracle",
  "arch codeoracle",
  "exp",
  "theme lumen",
  "help",
];

const HELP = `portfolio — read-only project shell

Commands
  help                         this help
  whoami                       identity
  proof                        proof lines
  ls [systems|projects] [kind] list entries
  cat <slug>                   dump case/project (also pins preview)
  arch <slug>                  ASCII architecture (pins preview)
  open <slug>                  open HTML project page
  stack [group]                stack groups
  exp                          experience summary
  contact                      contact lines
  themes | theme <id|next>     list / switch theme
  tree                         site map
  systems | work | home       navigate HTML
  clear                        clear scrollback

Keys: Tab complete · ↑/↓ history · Esc clears line
Preview: cat/arch pin the right pane; open leaves /cli`;

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function pad(s: string, n: number) {
  const t = s.length > n ? `${s.slice(0, n - 1)}…` : s;
  return t + " ".repeat(Math.max(0, n - t.length));
}

function findCase(q: string) {
  const needle = q.toLowerCase();
  return caseStudies.find(
    (c) => c.slug === needle || c.title.toLowerCase() === needle,
  );
}

function findProject(q: string) {
  const needle = q.toLowerCase();
  return projects.find(
    (p) => p.slug === needle || p.name.toLowerCase() === needle,
  );
}

function formatTable(headers: string[], rows: string[][], widths: number[]) {
  const head = headers.map((h, i) => pad(h, widths[i]!)).join("  ");
  const rule = widths.map((w) => "-".repeat(w)).join("  ");
  const body = rows
    .map((r) => r.map((c, i) => pad(c, widths[i]!)).join("  "))
    .join("\n");
  return `${head}\n${rule}\n${body}`;
}

function formatArch(title: string, layers: ArchLayer[]) {
  const lines: string[] = [`# ${title}`, `# architecture dump`, ""];
  layers.forEach((layer, i) => {
    const items = layer.items
      .map((it) => (it.note ? `${it.label} (${it.note})` : it.label))
      .join(" · ");
    lines.push(`[${layer.title}]`);
    lines.push(`  ${items}`);
    if (i < layers.length - 1) lines.push("        |");
  });
  return lines.join("\n");
}

function formatCase(c: CaseStudy) {
  return [
    `# ${c.title}`,
    `# ${c.slug} · ${c.year} · ${c.scope}${c.status ? ` · ${c.status}` : ""}`,
    "",
    "problem:",
    `  ${c.problem}`,
    "",
    "role:",
    `  ${c.role}`,
    "",
    "result:",
    `  ${c.result}`,
    "",
    `tags: ${c.tags.join(", ")}`,
    "",
    `# preview pane updated · try: arch ${c.slug} | open ${c.slug}`,
  ].join("\n");
}

function formatProject(p: Project) {
  return [
    `# ${p.name}`,
    `# ${p.slug} · ${p.year} · ${p.kind}`,
    "",
    p.detail,
    "",
    ...p.highlights.map((h) => `  - ${h}`),
    "",
    p.live ? `live: ${p.live}` : null,
    p.code ? `code: ${p.code}` : null,
    "",
    "# preview pane updated",
  ]
    .filter(Boolean)
    .join("\n");
}

function initialLines(): Line[] {
  return [
    {
      id: uid(),
      kind: "ok",
      text: "portfolio shell — type help · output is text; diagrams pin →",
    },
  ];
}

export function Terminal({ autofocus = false, bootCommand, onSelect }: Props) {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const runRef = useRef<(raw: string) => void>(() => {});
  const navigate = useNavigate();
  const { theme, setTheme, meta, cycleTheme } = useTheme();

  const commands = useMemo(
    () => [
      "help",
      "whoami",
      "proof",
      "ls",
      "cat",
      "arch",
      "open",
      "projects",
      "stack",
      "exp",
      "systems",
      "experience",
      "work",
      "contact",
      "mail",
      "themes",
      "theme",
      "tree",
      "resume",
      "home",
      "clear",
      "?",
    ],
    [],
  );

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(id);
  }, [lines]);

  useEffect(() => {
    if (autofocus) inputRef.current?.focus({ preventScroll: true });
  }, [autofocus]);

  const push = useCallback((extra: Line[]) => {
    setLines((prev) => [...prev, ...extra]);
  }, []);

  const runChip = useCallback((cmd: string) => {
    setInput(cmd);
    requestAnimationFrame(() => {
      inputRef.current?.form?.requestSubmit();
    });
  }, []);

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const next: Line[] = [
        { id: uid(), kind: "cmd", text: `❯ ${trimmed || " "}` },
      ];

      if (!trimmed) {
        push(next);
        return;
      }

      setHistory((h) => (h[0] === trimmed ? h : [trimmed, ...h].slice(0, 50)));
      setHistIdx(-1);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0]!.toLowerCase();
      const args = parts.slice(1);
      const arg = args.join(" ");

      const add = (...more: Line[]) => {
        push([...next, ...more]);
      };

      switch (cmd) {
        case "help":
        case "?":
          add({ id: uid(), kind: "out", text: HELP });
          break;

        case "whoami":
          add({
            id: uid(),
            kind: "ok",
            text: `${person.name}\n${person.headline}\n${person.location}\n${person.os}`,
          });
          onSelect?.(null);
          break;

        case "proof":
          add({
            id: uid(),
            kind: "out",
            text: proof.map((p) => `  ${p}`).join("\n"),
          });
          break;

        case "ls": {
          const target = (args[0] || "systems").toLowerCase();
          if (target === "systems" || target === "cases" || target === "work") {
            add({
              id: uid(),
              kind: "out",
              text: formatTable(
                ["slug", "title", "year", "status"],
                caseStudies.map((c) => [
                  c.slug,
                  c.title,
                  c.year,
                  c.status ?? (c.featured ? "featured" : "-"),
                ]),
                [16, 28, 6, 18],
              ),
            });
          } else if (target === "projects") {
            const kind = args[1]?.toLowerCase();
            const list = kind
              ? projects.filter((p) => p.kind === kind)
              : projects;
            if (!list.length) {
              add({
                id: uid(),
                kind: "err",
                text: `ls: no projects for kind=${kind}`,
              });
              break;
            }
            add({
              id: uid(),
              kind: "out",
              text: formatTable(
                ["slug", "name", "kind", "year"],
                list.map((p) => [p.slug, p.name, p.kind, p.year]),
                [18, 26, 14, 6],
              ),
            });
          } else {
            add({
              id: uid(),
              kind: "err",
              text: `ls: cannot access '${target}': No such file or directory\nTry: ls systems | ls projects`,
            });
          }
          break;
        }

        case "projects": {
          const kind = args[0]?.toLowerCase();
          const list = kind
            ? projects.filter((p) => p.kind === kind)
            : projects;
          if (!list.length) {
            add({
              id: uid(),
              kind: "err",
              text: `projects: no entries for kind=${kind}`,
            });
            break;
          }
          add({
            id: uid(),
            kind: "out",
            text: formatTable(
              ["slug", "name", "kind", "year"],
              list.map((p) => [p.slug, p.name, p.kind, p.year]),
              [18, 26, 14, 6],
            ),
          });
          break;
        }

        case "cat": {
          if (!arg) {
            add({ id: uid(), kind: "err", text: "usage: cat <slug>" });
            break;
          }
          const c = findCase(arg);
          if (c) {
            onSelect?.({ type: "case", data: c });
            add({ id: uid(), kind: "out", text: formatCase(c) });
            break;
          }
          const p = findProject(arg);
          if (p) {
            onSelect?.({ type: "project", data: p });
            add({ id: uid(), kind: "out", text: formatProject(p) });
            break;
          }
          add({
            id: uid(),
            kind: "err",
            text: `cat: ${arg}: No such file or directory`,
          });
          break;
        }

        case "arch": {
          if (!arg) {
            add({ id: uid(), kind: "err", text: "usage: arch <slug>" });
            break;
          }
          const c = findCase(arg);
          const p = c ? null : findProject(arg);
          const layers = c?.layers ?? p?.layers;
          if (!layers?.length) {
            add({
              id: uid(),
              kind: "err",
              text: `arch: ${arg}: no architecture dump`,
            });
            break;
          }
          if (c) onSelect?.({ type: "case", data: c });
          if (p) onSelect?.({ type: "project", data: p });
          add({
            id: uid(),
            kind: "out",
            text: formatArch(c?.title ?? p?.name ?? arg, layers),
          });
          break;
        }

        case "open": {
          const slug = args[0];
          if (!slug) {
            add({ id: uid(), kind: "err", text: "usage: open <case-slug>" });
            break;
          }
          const hit = findCase(slug);
          if (!hit) {
            add({
              id: uid(),
              kind: "err",
              text: `open: ${slug}: not a case\n${caseStudies.map((c) => c.slug).join(" ")}`,
            });
            break;
          }
          add({ id: uid(), kind: "ok", text: `→ /projects/${hit.slug}` });
          setTimeout(() => navigate(`/projects/${hit.slug}`), 180);
          break;
        }

        case "stack": {
          const group = args[0]?.toLowerCase() as keyof typeof stack | undefined;
          if (group && !(group in stack)) {
            add({
              id: uid(),
              kind: "err",
              text: `stack: unknown group\n${Object.keys(stack).join(" | ")}`,
            });
            break;
          }
          const entries = group
            ? ([[group, stack[group]]] as const)
            : (Object.entries(stack) as [string, string[]][]);
          add({
            id: uid(),
            kind: "out",
            text: entries
              .map(([k, vals]) => `${k}\n  ${vals.join(", ")}`)
              .join("\n\n"),
          });
          break;
        }

        case "exp":
          add({
            id: uid(),
            kind: "out",
            text: experience
              .map((e) => {
                const head = `${e.role} @ ${e.org}\n${e.dates}\nimpact: ${e.impact}`;
                const sys = `systems:  ${e.systems.join(", ")}`;
                const concepts = `concepts: ${e.concepts.join(", ")}`;
                const bullets = e.bullets
                  .slice(0, 3)
                  .map((b) => `  - ${b}`)
                  .join("\n");
                const more =
                  e.bullets.length > 3
                    ? `\n  (+${e.bullets.length - 3} more — see /about)`
                    : "";
                return `${head}\n${sys}\n${concepts}\n${bullets}${more}`;
              })
              .join("\n\n"),
          });
          break;

        case "contact":
        case "mail":
          add({
            id: uid(),
            kind: "out",
            text: [
              `email     ${person.email}`,
              `github    ${person.github}`,
              `linkedin  ${person.linkedin}`,
            ].join("\n"),
          });
          break;

        case "themes":
          add({
            id: uid(),
            kind: "out",
            text:
              THEMES.map(
                (t) =>
                  `  ${t.id === theme ? "*" : " "} ${pad(t.id, 12)} ${t.label} — ${t.tagline}`,
              ).join("\n") +
              `\n\n* active: ${meta.id}\nusage: theme <id> | theme next`,
          });
          break;

        case "theme": {
          const id = args[0]?.toLowerCase();
          if (!id || id === "next" || id === "cycle") {
            cycleTheme();
            add({ id: uid(), kind: "ok", text: "theme cycled" });
            break;
          }
          const hit = THEMES.find((t) => t.id === id);
          if (!hit) {
            add({
              id: uid(),
              kind: "err",
              text: `theme: unknown id\n${THEMES.map((t) => t.id).join(" | ")}`,
            });
            break;
          }
          setTheme(hit.id);
          add({ id: uid(), kind: "ok", text: `theme=${hit.id}` });
          break;
        }

        case "tree":
          add({
            id: uid(),
            kind: "out",
            text: [
              ".",
              "├── projects/",
              ...caseStudies.map((c, i) =>
                i === caseStudies.length - 1
                  ? `│   └── ${c.slug}`
                  : `│   ├── ${c.slug}`,
              ),
              "├── experience/",
              "├── achievements/",
              "├── cli/          ← pwd",
              "└── about/",
            ].join("\n"),
          });
          break;

        case "systems":
          add({ id: uid(), kind: "ok", text: "→ /projects" });
          setTimeout(() => navigate("/projects"), 160);
          break;

        case "resume":
        case "experience":
        case "work":
          add({ id: uid(), kind: "ok", text: "→ /work" });
          setTimeout(() => navigate("/work"), 160);
          break;

        case "home":
          add({ id: uid(), kind: "ok", text: "→ /" });
          setTimeout(() => navigate("/"), 160);
          break;

        case "clear":
          setLines(initialLines());
          onSelect?.(null);
          break;

        default:
          add({
            id: uid(),
            kind: "err",
            text: `zsh: command not found: ${cmd}`,
          });
      }
    },
    [
      cycleTheme,
      meta.id,
      navigate,
      onSelect,
      push,
      setTheme,
      theme,
    ],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = input;
    setInput("");
    run(value);
  };

  runRef.current = run;

  // Seeded command from hero mini-term. Use a cancel flag (not a "booted" ref) so
  // React Strict Mode's effect → cleanup → effect cycle still executes once.
  useEffect(() => {
    if (!bootCommand) return;
    let cancelled = false;
    const cmd = bootCommand;
    const id = window.setTimeout(() => {
      if (cancelled) return;
      try {
        sessionStorage.removeItem("craftlab-cli-boot");
      } catch {
        /* ignore */
      }
      runRef.current(cmd);
      inputRef.current?.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }, 60);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [bootCommand]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) {
        setHistIdx(next);
        setInput(history[next]!);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx <= 0) {
        setHistIdx(-1);
        setInput("");
        return;
      }
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(history[next] ?? "");
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.trim().split(/\s+/);
      const head = parts[0]?.toLowerCase();
      const rest = parts.slice(1);
      if (!head || (parts.length === 1 && !input.endsWith(" "))) {
        const match = commands.find((c) => c.startsWith(head || ""));
        if (match) setInput(match + (match === "ls" || match === "theme" ? " " : ""));
        return;
      }
      if (head === "cat" || head === "arch" || head === "open") {
        const partial = rest[0] ?? "";
        const pool = [
          ...caseStudies.map((c) => c.slug),
          ...projects.map((p) => p.slug),
        ];
        const match = pool.find((s) => s.startsWith(partial.toLowerCase()));
        if (match) setInput(`${head} ${match}`);
      }
      if (head === "theme") {
        const partial = rest[0] ?? "";
        const match = THEMES.map((t) => t.id).find((id) =>
          id.startsWith(partial.toLowerCase()),
        );
        if (match) setInput(`theme ${match}`);
      }
      if (head === "ls" && (rest[0] ?? "").startsWith("p")) {
        setInput("ls projects ");
      }
    }
  };

  return (
    <div
      className="term term--page"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Interactive portfolio terminal"
    >
      <div className="term__chrome">
        <div className="term__chrome-left">
          <span className="term__dot" aria-hidden />
          <span className="term__tab is-active">cli</span>
          <span className="term__tab-meta">portfolio · {meta.label}</span>
        </div>
        <span className="term__chrome-right">cli</span>
      </div>

      <div className="term__body" ref={bodyRef}>
        {lines.map((line) => (
          <div
            key={line.id}
            className={`term__line term__line--${line.kind}`}
          >
            {highlightTermText(line.text, line.kind)}
          </div>
        ))}
        <div ref={endRef} className="term__end" aria-hidden />
      </div>

      <form className="term__prompt" onSubmit={onSubmit}>
        <div className="term__prompt-row">
          <span className="term__prompt-host">portfolio</span>
          <span className="term__prompt-path"> ~/cli</span>
        </div>
        <div className="term__prompt-input-row">
          <span className="term__prompt-bang" aria-hidden>
            ❯
          </span>
          <input
            ref={inputRef}
            className="term__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
          />
          {!input && <span className="term__cursor" aria-hidden />}
        </div>
      </form>

      <div className="term__hints" aria-label="Example commands">
        <span className="term__hints-label">try</span>
        {HINTS.map((s) => (
          <button
            key={s}
            type="button"
            className="term__hint"
            onClick={(e) => {
              e.stopPropagation();
              runChip(s);
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MiniTerminalPreview() {
  const { meta } = useTheme();
  return (
    <div className="term" style={{ padding: "0.25rem 0 0" }}>
      <div className="term__chrome">
        <div className="term__chrome-left">
          <span className="term__dot" aria-hidden />
          <span className="term__tab is-active">cli</span>
          <span className="term__tab-meta">{meta.id}</span>
        </div>
      </div>
      <div className="term__body">
        <div className="term__line term__line--cmd">
          {highlightTermText("❯ ls systems", "cmd")}
        </div>
        <div className="term__line term__line--out">
          {highlightTermText(
            `slug              title\ncodeoracle        CodeOracle\nai-companion      AI companion`,
            "out",
          )}
        </div>
        <div className="term__line term__line--cmd">
          {highlightTermText("❯ cat codeoracle", "cmd")}
        </div>
        <div className="term__line term__line--out">
          {highlightTermText(
            "# CodeOracle · 3 MCP · RRF_K=2 · 14 pkgs · ~17k LOC · hit@3 ≥80% · ₹0 embed",
            "out",
          )}
        </div>
        <div className="term__line term__line--cmd">
          ❯<span className="term__cursor" style={{ marginLeft: 6 }} />
        </div>
      </div>
    </div>
  );
}
