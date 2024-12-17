import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "./App.tsx";
import Providers from "./components/providers/providers.tsx";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
