import React from "react";
import { useParams, useHistory } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail() {
  const { id: productId } = useParams();
  const history = useHistory();

  const { data: product, error, loading } = useFetch(`products/${productId}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/cart")}
        >
          Add to card
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
