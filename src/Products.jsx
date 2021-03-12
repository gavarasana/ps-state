import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";

export default function Products() {
  const [size, setSize] = useState("")
  const { category } = useParams();

  const { data: products, error, loading } = useFetch(
    "products?category=" + category
  );

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) =>
        p.skus.find((sku) => sku.size === parseInt(size, 10))
      )
    : products;

    // const allSizes = products.reduce((tempArray, item) => {
    //   let skus = item.skus;
    //   skus.forEach((s) => {
    //   if (!tempArray.includes(s.size)){
    //     tempArray.push(s.size)
    //   }});
    //   return tempArray;
    // });

  if (error) throw error;
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (products.length === 0) {
    return <PageNotFound />;
  }
  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>
      {size && <h2>Found {filteredProducts.length} items</h2>}
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
