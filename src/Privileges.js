// Basic IF statement that prints the privilege name and if it is either active or inactive.
import { useState, useEffect } from "react";

export default function Privileges() {
  const [showMoreActive, setShowMoreActive] = useState(false);
  const [showMoreInactive, setShowMoreInactive] = useState(false);
  const [editingNameInputValue, setEditingNameInputValue] = useState("");
  const [addingNameInputValue, setAddingNameInputValue] = useState("");
  const [privileges, setPrivileges] = useState([]);
    // commenting out in preparation for the real data
    // {
    //   id: 1,
    //   name: "change-request.make-live",
    //   active: true,
    //   editing: false,
    // },
    // {
    //   id: 2,
    //   name: "finance.departments.admin",
    //   active: true,
    //   editing: false,
    // },
    // {
    //   id: 3,
    //   name: "finance.purchase-ledger.admin",
    //   active: false,
    //   editing: false,
    // },
    // {
    //   id: 4,
    //   name: "finance.purchase-ledgerS.view",
    //   active: true,
    //   editing: false,
    // },
    // {
    //   id: 5,
    //   name: "finance.visa-claims.super-user",
    //   active: false,
    //   editing: false,
    // },
    // {
    //   id: 6,
    //   name: "import-books.admin",
    //   active: true,
    //   editing: false,
    // },
    // {
    //   id: 7,
    //   name: "manufacturing-routes.admin",
    //   active: true,
    //   editing: false,
    // },
    // {
    //   id: 8,
    //   name: "manufacturing-timings.admin",
    //   active: false,
    //   editing: false,
    // },
  
  const headers = {headers : {Accept : "application/json"}}
  // this effect will run once the first time this component mountssince the second dependency array parameter is just an empty list
  useEffect(() => {
    fetch('http://localhost:51799/authorisation/privileges',null,headers)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPrivileges(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);
       // and then call setPrivileges(result) on that result to make all of our existing code work with that big new privleges list :)
     

  

  const nameIsAlreadyTaken = name => {
    var result = false;
    privileges.forEach(current => {
      if (current.name === name) {
        result = true;
      }
    })
    return result;
  }

  const renderPrivilege = (privilege) => {
    // console.log(privilege);
    console.log(privileges)
    if (privilege.editing === false) {
      return (
        <li>
          {privilege.name} is
          <button onClick={() => handleActiveButtonClick(privilege)}>
            {privilege.active ? "active" : "inactive"}
          </button>
          <button
            onClick={() => {
              setPrivileges(
                privileges.filter((p) => p.name !== privilege.name)
              );
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              if (isStartEditingOk(privileges) === true) {
                const updatedPrivileges = privileges.map((current) => {
                  if (current.id === privilege.id) {
                    setAddingNameInputValue(privilege.name);
                    return {
                      name: privilege.name,
                      active: privilege.active,
                      id: privilege.id,
                      editing: true,
                    };
                  } else {
                    return current;
                  }
                });

                setPrivileges(updatedPrivileges);
              }
            }}
          >
            Edit
          </button>
        </li>
      );
    } else {
      return (
        <li>
          <input
            value={addingNameInputValue}
            id={privilege.name}
            onChange={(e) => setAddingNameInputValue(e.target.value)}
          />
          is
          <button onClick={() => handleActiveButtonClick}>
            {privilege.active ? "active" : "inactive"}
          </button>
          <button
            onClick={() => {
              setPrivileges(
                privileges.filter((p) => p.name !== privilege.name)
              );
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              // console.log("In here");
              // console.log(addingNameInputValue);
              if (nameIsAlreadyTaken(addingNameInputValue)) {
                console.log("name is already taken");
              } else {
                const updatedPrivileges = privileges.map((current) => {
                  if (current.id === privilege.id) {
                    return {
                      name: addingNameInputValue,
                      active: privilege.active,
                      id: privilege.id,
                      editing: false,
                    };
                  } else {
                    return current;
                  }
                });

                setPrivileges(updatedPrivileges);
                // lets not worry about name validation for now
                //InputNameValidation(privileges,InputName2.trim(),false)
              }
            }}
          >
            Save
          </button>
        </li>
      );
    }
  };

  function handleClickActive(privilege) {
    setShowMoreActive(!showMoreActive);
    setShowMoreInactive(false);
  }

  function handleActiveButtonClick(privilege) {
    const updatedPrivileges = privileges.map((current) => {
      if (current.name === privilege.name) {
        return {
          name: privilege.name,
          active: !privilege.active,
          id: privilege.id,
          editing: privilege.editing,
        };
      } else {
        return current;
      }
    });

    setPrivileges(updatedPrivileges);
    // console.log(privilege.name);
  }

  function handleClickInactive(privilege) {
    setShowMoreInactive(!showMoreInactive);
    setShowMoreActive(false);
  }

  function isStartEditingOk(privileges) {
    var valid = true;
    // console.log(valid + "jfjf");
    privileges.forEach((privilege) => {
      if (privilege.editing === true) {
        valid = false;
        // console.log(valid + "aaaaaaaaa");
      }
    });

    if (valid === false) {
      alert("You are already editing another line");
      return valid;
    }
    return valid;
  }

  const onlyActive = (privilege) => {
    // console.log(privilege);
    if (privilege.active === true) {
      return <li key={privilege.id}>{privilege.name} </li>;
    }
  };

  const onlyInactive = (privilege) => {
    // console.log(privilege);
    if (privilege.active === false) {
      return <li key={privilege.id}>{privilege.name} </li>;
    }
  };

  // not worrying about valdiation, so can comment out all this complicated code for now
  // const InputNameValidation = (privileges,InputName,isPrivilegeNew) => {
  //     var valid = true

  //     privileges.forEach((privilege) => {
  //         if (InputName.trim() === privilege.name && isPrivilegeNew === true){
  //             valid = false;
  //             return valid
  //         }else if(InputName.trim() === privilege.name && currentID !== privilege.id && isPrivilegeNew === false){
  //             valid = false
  //             return valid
  //         }else
  //         console.log(InputName + " & " + valid + " & " + privilege.name)
  //         return valid
  //         }
  //     )

  //     if (valid === true && isPrivilegeNew === true){
  //         AddNewNameToArray(InputName)
  //     }else if  (valid === true && isPrivilegeNew === false){
  //         AddEditedNameToArray(privileges,InputName)
  //     }else{
  //         return alert("Name already taken")
  //     }
  // }

//   function AddEditedNameToArray(privilege, InputName) {
//     setPrivileges([
//       {
//         name: InputName.trim(),
//         active: privilege.active,
//         id: privilege.id,
//         editing: false,
//       },
//       ...privileges,
//     ]);
//     console.log(privileges);
//     return privileges;
//   }

  function addNewNameToArray(InputName) {
    setPrivileges([
      {
        name: InputName.trim(),
        active: false,
        id: privileges.length + 2,
        editing: false,
      },
      ...privileges,
    ]);
    console.log(privileges);
    return privileges;
  }

  return (
    <div>
      <h1>Privileges</h1>
      <ol>{privileges.map(renderPrivilege)}</ol>

      <button onClick={handleClickActive}>Active privileges</button>
      <button onClick={handleClickInactive}>Inactive privileges</button>

      {showMoreActive && <p>{privileges.map(onlyActive)}</p>}
      {showMoreInactive && <p>{privileges.map(onlyInactive)}</p>}

      <h3>Add a privilege</h3>
      <input value={editingNameInputValue} onChange={(e) => setEditingNameInputValue(e.target.value)} />
      <button
        onClick={() => {
          addNewNameToArray(editingNameInputValue.trim());
        }}
      >
        Add
      </button>
    </div>
  );
}
