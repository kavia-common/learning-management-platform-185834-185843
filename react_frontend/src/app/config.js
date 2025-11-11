//
// Application configuration and feature flags
//

// PUBLIC_INTERFACE
export const config = (() => {
  /** Parse environment-derived values with safe defaults and consistent typing. */
  const {
    REACT_APP_API_BASE,
    REACT_APP_BACKEND_URL,
    REACT_APP_FRONTEND_URL,
    REACT_APP_WS_URL,
    REACT_APP_NODE_ENV,
    REACT_APP_LOG_LEVEL,
    REACT_APP_HEALTHCHECK_PATH,
    REACT_APP_FEATURE_FLAGS,
    REACT_APP_EXPERIMENTS_ENABLED,
  } = process.env || {};

  const apiBase =
    REACT_APP_API_BASE ||
    REACT_APP_BACKEND_URL ||
    "/api";
  const frontendUrl = REACT_APP_FRONTEND_URL || window.location.origin;
  const wsUrl =
    REACT_APP_WS_URL ||
    (frontendUrl.startsWith("https")
      ? frontendUrl.replace("https", "wss")
      : frontendUrl.replace("http", "ws"));
  const env = REACT_APP_NODE_ENV || (process.env.NODE_ENV || "development");
  const logLevel = (REACT_APP_LOG_LEVEL || "info").toLowerCase();
  const healthcheckPath = REACT_APP_HEALTHCHECK_PATH || "/healthz";

  // Parse feature flags from JSON or CSV (e.g., "flagA,flagB" or '{"flagA":true}')
  let featureFlags = {};
  if (REACT_APP_FEATURE_FLAGS) {
    try {
      if (REACT_APP_FEATURE_FLAGS.trim().startsWith("{")) {
        featureFlags = JSON.parse(REACT_APP_FEATURE_FLAGS);
      } else {
        const csvFlags = REACT_APP_FEATURE_FLAGS.split(",")
          .map((f) => f.trim())
          .filter(Boolean);
        featureFlags = csvFlags.reduce((acc, k) => {
          acc[k] = true;
          return acc;
        }, {});
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("Failed to parse REACT_APP_FEATURE_FLAGS. Using empty set.", e);
      featureFlags = {};
    }
  }

  const experimentsEnabled =
    String(REACT_APP_EXPERIMENTS_ENABLED || "").toLowerCase() === "true";

  return {
    apiBase,
    frontendUrl,
    wsUrl,
    env,
    logLevel,
    healthcheckPath,
    featureFlags,
    experimentsEnabled,
  };
})();
