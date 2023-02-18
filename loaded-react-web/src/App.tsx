import RequestPickup from "./components/RequestPickup";
import LookForShipment from "./components/LookForShipment";
import ShipmentRequestNotification from "./components/notifications/ShipmentRequestNotification";

import "./App.css";

function App() {
  return (
    <div className="App">
      <RequestPickup />
      <LookForShipment />
      <ShipmentRequestNotification
        requestFrom="Requester"
        pickup="Detroit"
        destination="Chicago"
        shipmentDescription="Description of load and special features requested"
      />
    </div>
  );
}

export default App;
