import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { setupAreas } from "./lib/areas";
import "./styles/index.css";

setupAreas();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
