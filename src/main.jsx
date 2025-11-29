import { createRoot } from "react-dom/client";
import "./index.css";
import QuizProvider from "./contexts/QuizContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <QuizProvider>
    <App />
  </QuizProvider>
);
