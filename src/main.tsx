import { createRoot } from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);



