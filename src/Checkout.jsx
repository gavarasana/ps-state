import React, { useState } from "react";
import {saveShippingAddress} from "./services/shippingService";

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

const STATUS = {
  "IDLE" : "IDLE",
  "SUBMITTING" : "SUBMITTING",
  "SUBMITTED" : "SUBMITTED",
  "COMPLETED" : "COMPLETED"
};

export default function Checkout({ cart, emptyCart }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

  const validationErrors = getErrors(address);
  const isValid = ( Object.keys(validationErrors).length === 0);

  function handleChange(e) {
    e.persist();
    setAddress( (prevAddress) => {
      return {
        ...prevAddress,
        [e.target.id]: e.target.value
      }
    } );
  }

  function handleBlur(event) {
    event.persist();

    setTouched( (prevValue) => {
      return {
        ...prevValue,
        [event.target.id]: true
      }
    } );   
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (isValid) {
      setStatus(STATUS.SUBMITTING);
    try {
      
      await saveShippingAddress(address);
      emptyCart();
      setStatus(STATUS.COMPLETED);
    } catch (e){
      setSaveError(e);
    }
  } else {
    setStatus(STATUS.SUBMITTED);
  }    
  }

  function getErrors(address)
  {
    const validationResult = {};
    if ( (!address.city) || (address.city.trim().length === 0)) validationResult.city = "City is required";
    if ( !address.country) validationResult.country = "Country is required";
    return validationResult;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1>Thanks for shopping</h1>;
  
  }
  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && (status === STATUS.SUBMITTED) && (
          <div role="alert">
            <p>Please fix the following errors:</p>
          <ul>
           { Object.keys(validationErrors).map((key) => { return <li key={key}>{validationErrors[key]}</li>;})}
          </ul>
         </div>
      )   
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status.SUBMITTED) && validationErrors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status.SUBMITTED) && validationErrors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info" 
            disabled = { status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
