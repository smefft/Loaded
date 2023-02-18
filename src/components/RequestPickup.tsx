import React from "react";

export default function RequestPickup() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Will implement this");
  }

  return (
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
        <li>
          <label htmlFor="weight">Weight of shipment</label>
          <input type="number" name="shipment_weight" id="weight" />
        </li>
        <li>
          <label htmlFor="details">Short description of shipment</label>
          <textarea name="shipment_details" id="details"></textarea>
        </li>
        <li>
          <label htmlFor="safe">Required for safe shipment?</label>
          <input type="checkbox" name="safe_shipment" id="safe" />
        </li>
        <button type="submit">Submit</button>
      </ul>
    </form>
  );
}
