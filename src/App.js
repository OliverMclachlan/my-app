import Privileges from "./Privileges";

export default function App() {
  const privileges =
  [
      {
          "name": "change-request.make-live",
          "active": true
      },
      {
          "name": "finance.departments.admin",
          "active": true
      },
      {
          "name": "finance.purchase-ledger.admin",
          "active": false
      },
      {
          "name": "finance.purchase-ledger.view",
          "active": true
      },
      {
          "name": "finance.visa-claims.super-user",
          "active": false,
      },
      {
          "name": "import-books.admin",
          "active": true,
      },
      {
          "name": "manufacturing-routes.admin",
          "active": true
      },
      {
          "name": "manufacturing-timings.admin",
          "active": false
      }
  ];

const logActive = (element) => {
  if (element.active) {
    console.log("the current element is: " + element.name);
  }
};

  privileges.map(logActive);

  return <Privileges privileges={privileges} />
}


