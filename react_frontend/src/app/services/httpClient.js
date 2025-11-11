import { config } from "../../app/config";

/**
 * Internal logger based on logLevel
 */
function log(level, ...args) {
  const levels = ["error", "warn", "info", "debug"];
  const currentIdx = levels.indexOf(config.logLevel || "info");
  const msgIdx = levels.indexOf(level);
  if (msgIdx <= currentIdx && typeof console[level] === "function") {
    // eslint-disable-next-line no-console
    console[level]("[httpClient]", ...args);
  }
}

/**
 * Creates a request function bound to a token getter and unauthorized handler.
 * The tokenGetter should return current auth token string or null.
 * onUnauthorized will be called on HTTP 401 responses.
 *
 * PUBLIC_INTERFACE
 */
export function createHttpClient({ tokenGetter = () => null, onUnauthorized = () => {} } = {}) {
  /**
   * PUBLIC_INTERFACE
   * Perform an HTTP request to the backend API using fetch. Automatically prefixes
   * paths with config.apiBase when a relative path is provided. Adds JSON headers,
   * Authorization header when token is present, and handles 401 by invoking onUnauthorized.
   */
  async function request(path, { method = "GET", headers = {}, body } = {}) {
    const isAbsolute = /^https?:\/\//i.test(path);
    const url = isAbsolute ? path : `${config.apiBase}${path.startsWith("/") ? "" : "/"}${path}`;

    const token = tokenGetter?.() || null;

    const reqHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };

    if (token) {
      reqHeaders.Authorization = `Bearer ${token}`;
    }

    const options = {
      method,
      headers: reqHeaders,
      body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
    };

    log("debug", "Request:", method, url, options);

    const res = await fetch(url, options);

    if (res.status === 401) {
      log("warn", "Unauthorized (401), invoking onUnauthorized");
      onUnauthorized?.();
      throw new Error("Unauthorized");
    }

    const contentType = res.headers.get("content-type") || "";
    let data = null;
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      log("error", "HTTP error", res.status, data);
      const err = new Error(`HTTP ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    log("debug", "Response:", res.status, data);
    return data;
  }

  return { request };
}
