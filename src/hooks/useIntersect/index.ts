import { useEffect, useRef } from "react";
import { UseIntersectParams } from "./index.types";

const useIntersect = ({ callback, options }: UseIntersectParams) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newOptions = options || {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) callback();
    }, newOptions);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return { ref: elementRef };
};

export default useIntersect;
