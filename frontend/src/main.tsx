import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initObservability } from "./areas/garden/observability";
import "./styles/index.css";

initObservability();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
