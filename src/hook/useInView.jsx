import { useEffect, useRef, useState } from "react";

export const useInView = ({
  threshold = 0.3,
  rootMargin = "0px",
  once = true,
} = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (isVisible) {
          setInView(true);
          setHasBeenInView(true);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  // 👇 valor final según modo
  const visible = once ? hasBeenInView : inView;

  return { ref, inView: visible };
};
