import { useColorMode } from "@chakra-ui/react";
import { ColorMode } from "@dashboardarr/graphql";
import { useCallback, useEffect } from "react";

export const useColorModeTracker = (selectedColorMode?: ColorMode) => {
  const { setColorMode } = useColorMode();

  const handleColorModeChange = useCallback(
    (isDark: boolean) => {
      if (!selectedColorMode) {
        return;
      }

      if (selectedColorMode === ColorMode.Auto) {
        setColorMode(isDark ? "dark" : "light");
      } else if (selectedColorMode === ColorMode.Light) {
        setColorMode("light");
      } else {
        setColorMode("dark");
      }
    },
    [selectedColorMode, setColorMode]
  );

  const mqListener = useCallback(
    (e: MediaQueryListEvent) => {
      handleColorModeChange(e.matches);
    },
    [handleColorModeChange]
  );

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    handleColorModeChange(darkThemeMq.matches);

    darkThemeMq.addEventListener("change", mqListener);
    return () => darkThemeMq.removeEventListener("change", mqListener);
  }, [handleColorModeChange, mqListener]);
};
