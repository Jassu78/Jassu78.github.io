import type { ReactNode } from "react";

/** Lightweight syntax coloring for craftlab scrollback (not a full lexer). */
export function highlightTermText(text: string, kind: "out" | "ok" | "err" | "cmd"): ReactNode {
  if (kind === "cmd") {
    return highlightCmd(text);
  }
  if (kind === "err") {
    return <span className="th-err">{text}</span>;
  }
  if (kind === "ok") {
    return highlightOk(text);
  }

  const rows = text.split("\n");
  return rows.map((line, i) => (
    <span key={i} className="term__row">
      {highlightOutLine(line, i === 0 && looksLikeTableHeader(line))}
      {i < rows.length - 1 ? "\n" : null}
    </span>
  ));
}

function highlightCmd(text: string): ReactNode {
  if (!text.startsWith("❯")) return text;
  const rest = text.slice(1);
  const trimmed = rest.trimStart();
  const lead = rest.slice(0, rest.length - trimmed.length);
  const [bin, ...args] = trimmed.split(/\s+/);
  return (
    <>
      <span className="th-bang">❯</span>
      {lead}
      {bin ? <span className="th-bin">{bin}</span> : null}
      {args.length
        ? args.map((a, i) => (
            <span key={i}>
              {" "}
              <span className={a.startsWith("-") ? "th-flag" : "th-arg"}>{a}</span>
            </span>
          ))
        : null}
    </>
  );
}

function highlightOk(text: string): ReactNode {
  const rows = text.split("\n");
  return rows.map((line, i) => (
    <span key={i} className="term__row">
      {line.startsWith("→") || line.startsWith("theme=") ? (
        <span className="th-ok">{line}</span>
      ) : (
        highlightOutLine(line, false)
      )}
      {i < rows.length - 1 ? "\n" : null}
    </span>
  ));
}

function looksLikeTableHeader(line: string) {
  return /^(slug|name|title)\b/i.test(line.trim());
}

function highlightOutLine(line: string, isTableHead: boolean): ReactNode {
  const trimmed = line.trim();

  if (!trimmed) return line;

  if (trimmed.startsWith("#")) {
    return <span className="th-cmt">{line}</span>;
  }

  if (/^-+(\s+-+)*$/.test(trimmed)) {
    return <span className="th-rule">{line}</span>;
  }

  if (/^\[[^\]]+\]$/.test(trimmed)) {
    const indent = line.match(/^\s*/)?.[0] ?? "";
    return (
      <>
        {indent}
        <span className="th-sec">{trimmed}</span>
      </>
    );
  }

  if (trimmed === "|" || trimmed === "↓") {
    return <span className="th-pipe">{line}</span>;
  }

  if (isTableHead) {
    return <span className="th-thead">{line}</span>;
  }

  // table body: first cell is slug-like
  if (/^[a-z0-9][\w.-]*\s{2,}/.test(line)) {
    const m = line.match(/^(\S+)(\s{2,})(.*)$/);
    if (m) {
      return (
        <>
          <span className="th-slug">{m[1]}</span>
          {m[2]}
          <span className="th-cell">{m[3]}</span>
        </>
      );
    }
  }

  // key: value  or  key:
  const keyMatch = line.match(/^(\s*)([A-Za-z][\w /.-]*?)(:)(\s*)(.*)$/);
  if (keyMatch && keyMatch[2]!.length < 28) {
    return (
      <>
        {keyMatch[1]}
        <span className="th-key">{keyMatch[2]}</span>
        <span className="th-colon">{keyMatch[3]}</span>
        {keyMatch[4]}
        {keyMatch[5] ? <span className="th-val">{keyMatch[5]}</span> : null}
      </>
    );
  }

  // bullet
  if (/^\s*[-*▸]/.test(line) || /^\s*\(\+\d+/.test(line)) {
    const m = line.match(/^(\s*)([-*▸]|\(\+\d+[^\)]*\))(\s*)(.*)$/);
    if (m) {
      return (
        <>
          {m[1]}
          <span className="th-bullet">{m[2]}</span>
          {m[3]}
          <span className="th-val">{m[4]}</span>
        </>
      );
    }
  }

  // help: command at column start with long spaces
  if (/^\s{2}[a-z][\w |<>[\].-]+\s{2,}/.test(line)) {
    const m = line.match(/^(\s{2})(\S+(?:\s\S+)*?)(\s{2,})(.*)$/);
    if (m) {
      return (
        <>
          {m[1]}
          <span className="th-bin">{m[2]}</span>
          {m[3]}
          <span className="th-dim">{m[4]}</span>
        </>
      );
    }
  }

  // tree paths
  if (/^[│├└.\s]+/.test(line) && /[\/a-z]/.test(line)) {
    return line.split(/(\s+←\s+.*)$/).map((part, i) =>
      part.startsWith("←") || part.includes("←") ? (
        <span key={i} className="th-cmt">
          {part}
        </span>
      ) : (
        <span key={i} className="th-path">
          {part}
        </span>
      ),
    );
  }

  // theme list * active
  if (/^\s+\*\s+\w+/.test(line)) {
    return <span className="th-ok">{line}</span>;
  }

  return <span className="th-dim">{line}</span>;
}
