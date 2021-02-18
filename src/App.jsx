import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
  const [cart, setCart] = useState([]);

function addToCart({id, sku}){
  const itemInCart = cart.find((c) => c.sku === sku);
  setCart((items) => {  
    if (itemInCart){
          items.map((i) => i.sku===sku ? {...i, quantity: i.quantity +1 } : i);
    }
  else {
    return [...items, {id, sku, quantity:1}];
  }});
}

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Cart" component={Cart} />
            <Route exact path="/:category" component={Products} />
            <Route path="/:category/:id">
                <Detail addToCart={addToCart}/>
            </Route>
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}
