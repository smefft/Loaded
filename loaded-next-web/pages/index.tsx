import Head from "next/head";

import LookForShipment from "@/components/LookForShipment";
import ShipmentRequestNotification from "@/components/notifications/ShipmentRequestNotification";
import RequestPickup from "@/components/RequestPickup";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="app">
        <RequestPickup />
        <LookForShipment />
        <ShipmentRequestNotification
          requestFrom="Requester"
          pickup="Detroit"
          destination="Chicago"
          shipmentDescription="Description of load and special features requested"
        />
      </div>
    </>
  );
}