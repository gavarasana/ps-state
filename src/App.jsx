import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Cart" >
              <Cart />
            </Route>
            <Route path="/Checkout">
              <Checkout />
            </Route>
            <Route exact path="/:category" component={Products} />
            <Route path="/:category/:id">
                <Detail  />
            </Route>
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}
