import React from "react";
import {  Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
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
              <Route exact path="/" component={Products}/>
              <Route path="/Detail" component={Detail} />
              <Route path="/Cart" component={Cart} />
            </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}
