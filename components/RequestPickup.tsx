import React from "react";
import { useState } from "react";

export default function RequestPickup() {
  const [isRequestSubmitted, setIsRequestSubmitted] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRequestSubmitted(true);
    alert("Will implement this");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Request a pickup</h1>
        <ul>
          <li>
            <label htmlFor="date">When?</label>
            <input type="date" name="shipping_date" id="date" />
          </li>
          <li>
            <label htmlFor="pickup">
              Starting city(zip or city, state, country)
            </label>
            <input type="text" name="starting_city" id="pickup" />
          </li>
          <li>
            <label htmlFor="destination">
              Ending city(zip or city, state, country)
            </label>
            <input type="text" name="destination_city" id="destination" />
          </li>
          <button type="submit">Submit</button>
        </ul>
      </form>
      {isRequestSubmitted && (
        <p style={{ background: "darkgreen", color: "white" }}>
          Your request has been sent out. We will notify you when a truck has
          accepted your request.
        </p>
      )}
    </>
  );
}
