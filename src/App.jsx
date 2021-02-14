import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function App() {
  const [size, setSize] = useState("");
  
  const {data: products, error, loading} = useFetch("products?category=shoes");
  
  if ( error ) throw error;
  if (loading) {
    return (<><Spinner/></>);
  }

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) =>
        p.skus.find((sku) => sku.size === parseInt(size, 10))
      )
    : products;

  

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select
              id="size"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          {size && <h2>Found {filteredProducts.length} items</h2>}
          <section id="products">{filteredProducts.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
