// Basic IF statement that prints the privilege name and if it is either active or inactive.
import { useState, useEffect } from "react";

export default function Privileges() {
  const [showMoreActive, setShowMoreActive] = useState(false);
  const [showMoreInactive, setShowMoreInactive] = useState(false);
  const [editingNameInputValue, setEditingNameInputValue] = useState("");
  const [addingNameInputValue, setAddingNameInputValue] = useState("");
  const [privileges, setPrivileges] = useState([]);
   
  const requestParameters = {
    method: 'GET', // I think this is the part we were missing!
    headers: {
      'accept': 'application/json'
    },
  };

  const endpoint = "http://localhost:51799/authorisation/privileges";

  // this effect will run once the first time this component mounts since the second dependency array parameter is just an empty list
  useEffect(() => {
    fetch(endpoint, requestParameters)
    .then(response => response.json())
    .then(data => setPrivileges(data))
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);
     
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
