import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Reset window scroll when the route path changes (Layout stays mounted). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const jump = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    jump();
    const a = requestAnimationFrame(() => {
      jump();
      requestAnimationFrame(jump);
    });
    // PageTransition + autofocus can re-scroll after paint
    const t1 = window.setTimeout(jump, 50);
    const t2 = window.setTimeout(jump, 320);

    return () => {
      cancelAnimationFrame(a);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      html.style.scrollBehavior = prev;
    };
  }, [pathname]);

  return null;
}
