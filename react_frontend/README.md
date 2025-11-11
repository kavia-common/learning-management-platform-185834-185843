# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- Modern layout shell (Header, Sidebar, content) with Ocean Professional theme
- Global app state via React Context + reducer
- Routing with protected routes

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Dependencies

This app expects react-router-dom to be available. If it's not already installed, please add it:
```
npm install react-router-dom
```

## Configuration

All configuration is read from environment variables in `src/app/config.js`. Notable variables:
- REACT_APP_API_BASE
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS (CSV or JSON)
- REACT_APP_EXPERIMENTS_ENABLED

## Structure

- `src/app/config.js` — environment and feature flags
- `src/app/store/AppStateContext.jsx` — global state and actions
- `src/app/AppProviders.jsx` — providers composition
- `src/app/routes.jsx` — routes and ProtectedRoute
- `src/app/services/httpClient.js` — thin fetch wrapper
- `src/layout/*` — Header, Sidebar, MainLayout, styles
- `src/features/common/NotFound.jsx` — 404 page

