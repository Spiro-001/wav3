import { RefObject, useEffect } from "react";

const useOnClickOutside = (ref, handler, MouseEvent) => {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
