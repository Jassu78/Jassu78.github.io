import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  label: string;
  title: string;
  subtitle: string;
  tags?: string[];
  status?: string;
  variant?: "default" | "wide" | "accent" | "edge";
  index?: number;
};

export function BentoTile({
  to,
  label,
  title,
  subtitle,
  tags = [],
  status,
  variant = "default",
  index = 0,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = ref.current.querySelector<HTMLElement>(".bento__glow");
    if (glow) {
      glow.style.left = `${x - 90}px`;
      glow.style.top = `${y - 90}px`;
    }
  };

  const tileClass = [
    "bento__tile",
    variant === "wide" ? "bento__tile--wide" : "",
    variant === "accent" ? "bento__tile--accent" : "",
    variant === "edge" ? "bento__tile--edge" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cellClass = [
    "bento__cell",
    variant === "wide" ? "bento__cell--wide" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={cellClass}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <Link
        ref={ref}
        to={to}
        className={tileClass}
        onMouseMove={onMove}
      >
        <span className="bento__glow" aria-hidden />
        <div>
          <p className="bento__label">
            {label}
            {status ? (
              <>
                {" · "}
                <span className="status-pill">{status}</span>
              </>
            ) : null}
          </p>
          <h3 className="bento__title">{title}</h3>
          <p className="bento__sub">{subtitle}</p>
        </div>
        {tags.length > 0 ? (
          <div className="bento__tags">
            {tags.slice(0, 4).map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </Link>
    </motion.div>
  );
}
