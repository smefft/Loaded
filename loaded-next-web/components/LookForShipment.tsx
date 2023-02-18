export default function LookForShipment() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Will implement this");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Look for a load</h1>
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
          <label htmlFor="departure">Departure Time</label>
          <input type="date" name="departure_time" id="departure" />
        </li>
        <li>
          <label htmlFor="dimensions">Truck Dimensions</label>
          <input type="number" name="shipment_dimensions" id="dimensions" />
        </li>
        <button type="submit">Submit</button>
      </ul>
    </form>
  );
}
