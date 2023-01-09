import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/custom.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";
import { AppContextProvider } from "./context/AppContext";
import AuthContextProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.Fragment>
    <AuthContextProvider>
      <AppContextProvider>
        <Router>
          <App />
        </Router>
      </AppContextProvider>
    </AuthContextProvider>
  </React.Fragment>
);
