import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import ModelVisualization from "./components/ModelVisualization.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <ModelVisualization />
  </React.StrictMode>
);
