import React, {useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail(props) {
  const { id: productId } = useParams();
  const history = useHistory();
  const [sku, setSku] = useState("");

  const { data: product, error, loading } = useFetch(`products/${productId}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select
          id="size"
          value={sku}
          onChange={(event) => {
            setSku(event.target.value);
          }}
        >
          <option value="">What size?</option>
         {product.skus.map((s) => (
           <option key={s.sku} value={s.sku}>{s.size}</option>
         ))}ß
        </select>
      <p>
        <button disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            props.addToCart(productId, sku);
            history.push("/cart");
            }
        }
        >
          Add to card
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
