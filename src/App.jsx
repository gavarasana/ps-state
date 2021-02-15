import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Cart" component={Cart} />
            <Route exact path="/:category" component={Products} />
            <Route path="/:category/:id" component={Detail} />
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}
