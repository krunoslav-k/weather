import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.tsx";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")!).render(<App />);
