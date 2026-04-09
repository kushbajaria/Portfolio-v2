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

/**
 * useStaggerChildren — observes a parent container and when it enters the
 * viewport, adds the `in-view` class to each child that has a `reveal` /
 * `reveal-scale` / `reveal-fade` class, staggered by `staggerMs`.
 *
 * Usage:
 *   const containerRef = useStaggerChildren({ staggerMs: 120 });
 *   <div ref={containerRef}>
 *     <div className="reveal reveal-delay-1">…</div>
 *     <div className="reveal reveal-delay-2">…</div>
 *   </div>
 *
 * @param {Object}  options
 * @param {number}  options.threshold  – IntersectionObserver threshold (default 0.1)
 * @param {string}  options.rootMargin – observer margin (default "0px 0px -60px 0px")
 * @param {number}  options.staggerMs  – ms between each child reveal (default 120)
 * @param {boolean} options.once       – only trigger once (default true)
 */
export function useStaggerChildren({
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
  staggerMs = 120,
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      // Immediately reveal everything
      container.querySelectorAll(".reveal, .reveal-scale, .reveal-fade, .reveal-left, .reveal-right").forEach((el) => {
        el.classList.add("in-view");
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = container.querySelectorAll(
            ".reveal, .reveal-scale, .reveal-fade, .reveal-left, .reveal-right"
          );
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add("in-view"), i * staggerMs);
          });
          if (once) observer.unobserve(container);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin, staggerMs, once]);

  return ref;
}

/**
 * useScrollFade — fades and optionally scales an element as the user scrolls
 * past it. Useful for hero sections that dissolve away on scroll.
 *
 * @param {Object} options
 * @param {number} options.fadeDistance – px of scroll over which the fade occurs (default: window.innerHeight * 0.6)
 * @param {number} options.scaleEnd    – minimum scale value at full fade (default 0.95)
 * @returns {React.RefObject}
 */
export function useScrollFade({ fadeDistance, scaleEnd = 0.95 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const dist = fadeDistance || window.innerHeight * 0.6;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const progress = Math.min(scrollY / dist, 1);
          const opacity = 1 - progress;
          const scale = 1 - (1 - scaleEnd) * progress;
          el.style.opacity = opacity;
          el.style.transform = `scale(${scale})`;
          ticking = false;
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [fadeDistance, scaleEnd]);

  return ref;
}
