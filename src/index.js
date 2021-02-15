import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./common/ErrorBoundary";
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <ErrorBoundary>
    <Router>
    <App />
    </Router>
  </ErrorBoundary>,
  document.getElementById("root")
);
