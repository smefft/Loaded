interface Props {
  requestFrom: string;
  pickup: string;
  destination: string;
  shipmentDescription: string;
}

export default function ShipmentRequestNotification({
  requestFrom,
  pickup,
  destination,
  shipmentDescription,
}: Props) {
  return (
    <div>
      <h1>{requestFrom}</h1>

      <div className="request-details">
        <ul>
          <li>Pickup location: {pickup}</li>
          <li>Destination: {destination}</li>
          <li>Date Range: </li>
        </ul>

        <p>{shipmentDescription}</p>
      </div>

      <div className="actions">
        <button>Accept</button>
        <button>Deny</button>
      </div>
    </div>
  );
}
