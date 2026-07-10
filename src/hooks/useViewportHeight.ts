import { useEffect, useState } from "react";

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

/** Hook that returns the live viewport height in px, using `visualViewport` so it reflects mobile keyboard/browser-chrome changes instead of the static layout viewport. */
export function useViewportHeight() {
  const [height, setHeight] = useState(getViewportHeight);

  useEffect(() => {
    const updateHeight = () => setHeight(getViewportHeight());

    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return height;
}
