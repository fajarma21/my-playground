import { useEffect, useRef, useState } from "react";

const useDisplayIntersect = (options?: IntersectionObserverInit) => {
  const [intersecting, setIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const newOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
      ...options,
    };

    const observer = new IntersectionObserver((e) => {
      setIntersecting(e[0].isIntersecting);
    }, newOptions);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref: elementRef, intersecting };
};

export default useDisplayIntersect;
