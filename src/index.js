import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./common/ErrorBoundary";
import {BrowserRouter as Router} from "react-router-dom";
import { CartProvider } from "./cartContext";

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <CartProvider>

    <App />
      </CartProvider>
    </Router>
  </ErrorBoundary>,
  document.getElementById("root")
);
