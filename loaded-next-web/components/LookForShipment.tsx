export default function LookForShipment() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Will implement this");
  }

  return (
    <form action = "dashboards/dashboard" method = "post">
      <h1>Look for Shipment</h1>
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
  );
}
