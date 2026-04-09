import { useEffect, useRef, useState } from "react";

/**
 * useInView — scroll-triggered visibility hook using IntersectionObserver.
 *
 * @param {Object} options
 * @param {number} options.threshold  – visibility fraction to trigger (default 0.15)
 * @param {string} options.rootMargin – observer margin (default "0px 0px -60px 0px")
 * @param {boolean} options.once      – only trigger once then stop observing (default true)
 * @returns {{ ref: React.RefObject, isInView: boolean }}
 */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion: if user prefers reduced motion,
    // immediately mark as in view so content is visible without animation.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}

/**
 * useParallax — subtle parallax translateY on scroll.
 * Returns a ref to attach to the element.
 * The element gets a CSS custom property --parallax-y that you can use in a transform.
 *
 * @param {number} speed – parallax factor (default 0.15, positive = moves slower than scroll)
 */
export function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const elCenter = rect.top + rect.height / 2;
          const offset = (elCenter - viewportCenter) * speed;
          el.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}
