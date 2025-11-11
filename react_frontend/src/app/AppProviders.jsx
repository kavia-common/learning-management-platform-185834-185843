import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppStateProvider, useAppDispatch } from "./store/AppStateContext";
import { config } from "./config";

function ThemeInitializer({ children }) {
  const { setTheme } = useAppDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || "light";
    document.documentElement.setAttribute("data-theme", initialTheme);
    setTheme(initialTheme);
  }, [setTheme]);

  useEffect(() => {
    if (config.logLevel === "debug") {
      // eslint-disable-next-line no-console
      console.debug("Feature Flags:", config.featureFlags);
    }
  }, []);

  return children;
}

// PUBLIC_INTERFACE
export function AppProviders({ children }) {
  /**
   * Compose application providers:
   * - AppStateProvider for global state and actions
   * - BrowserRouter for routing
   * Also initializes theme from localStorage.
   */
  return (
    <AppStateProvider>
      <BrowserRouter>
        <ThemeInitializer>{children}</ThemeInitializer>
      </BrowserRouter>
    </AppStateProvider>
  );
}
