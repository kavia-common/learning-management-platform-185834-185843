import React, { createContext, useContext, useMemo, useReducer } from "react";
import { config } from "../../app/config";

// Initial state factory for clarity and testability
const initialState = {
  auth: {
    user: null,
    token: null,
  },
  ui: {
    theme: "light",
    sidebarOpen: true,
    toasts: [],
  },
  featureFlags: { ...config.featureFlags },
};

// Actions
const ACTIONS = {
  SET_THEME: "SET_THEME",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  SET_TOASTS: "SET_TOASTS",
  SET_AUTH: "SET_AUTH",
};

// Reducer to manage state changes
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return {
        ...state,
        ui: { ...state.ui, theme: action.payload },
      };
    case ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
      };
    case ACTIONS.SET_TOASTS:
      return {
        ...state,
        ui: { ...state.ui, toasts: Array.isArray(action.payload) ? action.payload : [] },
      };
    case ACTIONS.SET_AUTH:
      return {
        ...state,
        auth: {
          user: action.payload?.user || null,
          token: action.payload?.token || null,
        },
      };
    default:
      return state;
  }
}

const AppStateContext = createContext(undefined);
const AppDispatchContext = createContext(undefined);

// PUBLIC_INTERFACE
export function useAppState() {
  /** Access the current application state from context. */
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}

// PUBLIC_INTERFACE
export function useAppDispatch() {
  /** Access dispatch and convenient action creators from context. */
  const ctx = useContext(AppDispatchContext);
  if (!ctx) {
    throw new Error("useAppDispatch must be used within AppStateProvider");
  }
  return ctx;
}

// PUBLIC_INTERFACE
export function AppStateProvider({ children, initial = initialState }) {
  /** Provider that exposes global app state and dispatch/action helpers. */
  const [state, dispatchBase] = useReducer(appReducer, initial);

  // Action creators
  const setTheme = (theme) =>
    dispatchBase({ type: ACTIONS.SET_THEME, payload: theme });
  const toggleSidebar = () =>
    dispatchBase({ type: ACTIONS.TOGGLE_SIDEBAR });
  const setToasts = (toasts) =>
    dispatchBase({ type: ACTIONS.SET_TOASTS, payload: toasts });
  const setAuth = ({ user, token }) =>
    dispatchBase({ type: ACTIONS.SET_AUTH, payload: { user, token } });

  const dispatch = useMemo(
    () => ({ setTheme, toggleSidebar, setToasts, setAuth }),
    []
  );

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
