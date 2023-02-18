interface Props {
  shippingCompany: string;
  dateRequestWasAccepted: string;
  expectedDeliveryTime: string;
}

export default function AcceptedShipmentNotification({
  shippingCompany,
  dateRequestWasAccepted,
  expectedDeliveryTime,
}: Props) {
  return (
    <div>
      <h1>{shippingCompany}</h1>
      <ul>
        <li>Date: {dateRequestWasAccepted}</li>
        <li>Timeframe for pickup: {expectedDeliveryTime}</li>
      </ul>
    </div>
  );
}
