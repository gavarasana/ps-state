import React, {useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

export default function App() {
  
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("Could not parse cart from local storage");
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)));

function addToCart(id, sku){
  const itemInCart = cart.find((c) => c.sku === sku);
  setCart((items) => {  
    if (itemInCart){
         return items.map((i) => i.sku===sku ? {...i, quantity: i.quantity +1 } : i);
    }
  else {
    return [...items, {id, sku, quantity:1}];
  }});
}

function updateQuantity(sku, quantity){
  setCart((items) => {
    return (quantity === 0 ) ?  items.filter((i) => i.sku !== sku) : items.map((i) => i.sku===sku ? {...i, quantity} : i);
    });
}

function emptyCart(){
  setCart([]);
}

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Cart" >
              <Cart cart={cart} updateQuantity={updateQuantity}/>
            </Route>
            <Route path="/Checkout">
              <Checkout cart={cart} emptyCart={emptyCart} />
            </Route>
            <Route exact path="/:category" component={Products} />
            <Route path="/:category/:id">
                <Detail addToCart={addToCart} />
            </Route>
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  );
}
