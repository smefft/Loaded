import { useState } from "react";

interface Props {
  authId: string | undefined;
}

interface Account {
  authId: string | undefined;
  accountType: "Shipping Company" | "Driver" | undefined;
}

interface CompanyAccount extends Account {
  companyName: string;
}

interface DriverAccount extends Account {
  firstName: string;
  lastName: string;
  driverCompanyName: string;
}

export default function CreateAccount({ authId }: Props) {
  const [accountType, setAccountType] = useState<
    "Shipping Company" | "Driver" | undefined
  >(undefined);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!accountType) return;

    let postData: Account | CompanyAccount | DriverAccount;

    if (accountType === "Driver") {
      postData = {
        authId,
        accountType,
        firstName: "Test",
        lastName: "Another Test",
        driverCompanyName: "Some company",
      };
    } else {
      postData = {
        authId,
        accountType,
        companyName: "Another company",
      };
    }

    let response = await fetch(`http://127.0.0.1:80/api/v1/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    let response_data = await response.json();
    console.log(response_data);
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
