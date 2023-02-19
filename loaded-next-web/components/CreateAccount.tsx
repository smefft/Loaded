import { useState } from "react";

export default function CreateAccount() {
  const [accountType, setAccountType] = useState<
    "Shipping Company" | "Driver" | undefined
  >(undefined);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Will implement this");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <ul>
        <li>
          <label htmlFor="company">Shipping Company</label>
          <input
            type="radio"
            name="account_type"
            id="company"
            onChange={(e) => setAccountType("Shipping Company")}
            required
          />
        </li>
        <li>
          <label htmlFor="driver">Driver</label>
          <input
            type="radio"
            name="account_type"
            id="driver"
            onChange={(e) => setAccountType("Driver")}
            required
          />
        </li>
        {accountType === "Driver" ? (
          <DriverBasicInformationForm />
        ) : (
          <ShippingCompanyBasicInformationForm />
        )}
        <button type="submit">Submit</button>
      </ul>
    </form>
  );
}

function DriverBasicInformationForm() {
  return (
    <>
      <li>
        <label htmlFor="fname">First name</label>
        <input type="text" name="fname" id="fname" />
      </li>
      <li>
        <label htmlFor="lname">Last name</label>
        <input type="text" name="lname" id="lname" />
      </li>
      <li>
        <label htmlFor="cpname">Company name</label>
        <input type="text" name="cpname" id="cpname" />
      </li>
    </>
  );
}

function ShippingCompanyBasicInformationForm() {
  return (
    <>
      <li>
        <label htmlFor="cpname">Name of organization</label>
        <input type="text" name="cpname" id="cpname" />
      </li>
    </>
  );
}
