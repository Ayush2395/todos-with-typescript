import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/custom.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.Fragment>
    <Router>
      <App />
    </Router>
  </React.Fragment>
);
