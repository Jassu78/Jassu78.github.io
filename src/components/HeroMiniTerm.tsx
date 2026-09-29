import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export const CLI_BOOT_KEY = "craftlab-cli-boot";

type Props = {
  className?: string;
};

/**
 * Tiny invite terminal under hero social links.
 * Submit fades out and opens /cli with the typed command already run.
 */
export function HeroMiniTerm({ className = "" }: Props) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [leaving, setLeaving] = useState(false);

  const go = (cmd: string) => {
    if (leaving) return;
    setLeaving(true);
    const boot = cmd.trim() || "help";
    try {
      sessionStorage.setItem(CLI_BOOT_KEY, boot);
    } catch {
      /* ignore */
    }

    const leave = () => {
      window.scrollTo(0, 0);
      navigate("/cli", { state: { boot } });
    };

    window.setTimeout(leave, reduce ? 40 : 380);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    go(value);
  };

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.form
          className={`hero-term ${className}`.trim()}
          onSubmit={onSubmit}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -10,
            scale: reduce ? 1 : 0.98,
            filter: reduce ? undefined : "blur(4px)",
          }}
          transition={{ duration: reduce ? 0.12 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Open the CLI lab"
        >
          <span className="hero-term__prompt" aria-hidden>
            <span className="hero-term__path">portfolio</span>
            <span className="hero-term__colon">:</span>
            <span className="hero-term__tilde">~</span>
            <span className="hero-term__dollar">$</span>
          </span>
          <input
            className="hero-term__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="whoami · help · ls"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            aria-label="Type a command to open /cli"
          />
          <button type="submit" className="hero-term__go" title="Open /cli">
            ↵
          </button>
        </motion.form>
      ) : null}
    </AnimatePresence>
  );
}
