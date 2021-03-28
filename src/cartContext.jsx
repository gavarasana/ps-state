import React, {useReducer, useEffect, useContext} from "react";
import cartReducer from "./cartReducer";

const cartContext = React.createContext();

let initialCart;
try {
  initialCart =  JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("Could not parse cart from local storage");
  initialCart = [];
}

export function CartProvider(props) {

    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)));
    const contextValue = {
        cart,
        dispatch
    }

    return (
        <cartContext.Provider value={contextValue}>{props.children}</cartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(cartContext);
    if (!context){
      throw new Error("useCart must be used in a CartProvider. Please parent component inside CartProvider");
    }
    return context;
}