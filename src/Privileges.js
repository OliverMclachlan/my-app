// Basic IF statement that prints the privilege name and if it is either active or inactive.
import { useState } from 'react';



export default function Privileges() {
    const [showMoreActive, setShowMoreActive] = useState(false);
    const [showMoreInactive, setShowMoreInactive] = useState(false);
    const [InputName, setInputName] = useState('');
    const [InputName2, setInputName2] = useState('');
    const [currentID, setCurrentID] = useState();


    const [privileges, setPrivileges] = useState( [
        {
            "id" : 1,
            "name": "change-request.make-live",
            "active": true,
            "editing" : false
        },
        {
            "id" : 2,
            "name": "finance.departments.admin",
            "active": true,
            "editing" : false
        },
        {
            "id" : 3,
            "name": "finance.purchase-ledger.admin",
            "active": false,
            "editing" : false
        },
        {
            "id" : 4,
            "name": "finance.purchase-ledgerS.view",
            "active": true,
            "editing" : false
        },
        {
            "id" : 5,
            "name": "finance.visa-claims.super-user",
            "active": false,
            "editing" : false
        },
        {
            "id" : 6,
            "name": "import-books.admin",
            "active": true,
            "editing" : false
        },
        {
            "id" : 7,
            "name": "manufacturing-routes.admin",
            "active": true,
            "editing" : false
        },
        {
            "id" : 8,
            "name": "manufacturing-timings.admin",
            "active": false,
            "editing" : false
        }
    ]);

    const renderPrivilege = (privilege) => {
        console.log(privilege);
        if (privilege.editing === false){    
            return (
                <li>{privilege.name} is  <button onClick={() => handleActiveButtonClick(privilege)}>{privilege.active? "active": "inactive"}</button>

                <button onClick={() => {
                setPrivileges(
                  privileges.filter(p =>
                    p.name !== privilege.name
                  )
                );
                }}>
                Delete</button>

                <button onClick={() => {
                    if(isStartEditingOk(privileges) === true){
                    const updatedPrivileges = privileges.map(
                        (current) => { 
                            if (current.id === privilege.id) {
                                setInputName2(privilege.name)
                                return { 
                                    "name": privilege.name,
                                    "active": privilege.active,
                                    "id" : privilege.id,
                                    "editing" : true
                                    
                                };
                               
                            }
                            else {
                                return current;
                            }
                            
                        }
                    );

                    

                    setPrivileges(updatedPrivileges); 
                }}}>
                    Edit</button></li>
        )}else{
            return (
                <li>
                    
                    <input
                        value={InputName2}
                        id = {privilege.name}
                        onChange={e => setInputName2(e.target.value)}
                        
                /> is  <button onClick={() => handleActiveButtonClick}>{privilege.active? "active": "inactive"}</button>

                <button onClick={() => {
                setPrivileges(
                  privileges.filter(p =>
                    p.name !== privilege.name
                  )
                );
                }}>
                Delete</button>

                <button onClick={() => {

                    const updatedPrivileges = privileges.map(
                        (current) => { 

                            

                            if (current.id === privilege.id) {
                                setCurrentID(current.id)
                                return { 
                                    "name": InputName2,
                                    "active": privilege.active,
                                    "id" : privilege.id,
                                    "editing" : false,
                                        
                                };
                                }
                                else {
                                    return current;
                                }
                            
                        
                            });
                    InputNameValidation(privileges,InputName2.trim(),false)


                }}>
                Save</button>
            </li>
              );
        }
            
        
    }



    function handleClickActive(privilege) {
        setShowMoreActive(!showMoreActive);
        setShowMoreInactive(false);
    }

    function handleActiveButtonClick(privilege){
        const updatedPrivileges = privileges.map(
            (current) => { 
                if (current.name === privilege.name) {
                    return { 
                        "name": privilege.name,
                        "active": !privilege.active,
                        "id" : privilege.id,
                        "editing" : privilege.editing
                    };
                }
                else {
                    return current;
                }
                
            }
        );

        setPrivileges(updatedPrivileges);   
        console.log(privilege.name);
        
    }

    

    function handleClickInactive(privilege) {
        setShowMoreInactive(!showMoreInactive);
        setShowMoreActive(false);


    };

    function isStartEditingOk(privileges){
        var valid = true
        console.log(valid + "jfjf")
        privileges.forEach((privilege) => {
            if(privilege.editing === true){
                valid = false
                console.log(valid + "aaaaaaaaa")

            }
        })

        if (valid === false){
            alert("You are already editing another line")
            return valid
        }
        return valid
    }
        
    

    const onlyActive = (privilege) => {
        console.log(privilege);
        if (privilege.active === true) {
            return (<li>{privilege.name} </li>);
        }
    }

    const onlyInactive = (privilege) => {
        console.log(privilege);
        if (privilege.active === false) {
            return (<li>{privilege.name} </li>);
        }
    }

    const InputNameValidation = (privileges,InputName,isPrivilegeNew) => {
        var valid = true
        

        privileges.forEach((privilege) => {
            if (InputName.trim() === privilege.name && isPrivilegeNew === true){
                valid = false;
                return valid
            }else if(InputName.trim() === privilege.name && currentID !== privilege.id && isPrivilegeNew === false){
                valid = false
                return valid
            }else
            console.log(InputName + " & " + valid + " & " + privilege.name)
            return valid
            }   
        )
        
        if (valid === true && isPrivilegeNew === true){
            AddNewNameToArray(InputName)
        }else if  (valid === true && isPrivilegeNew === false){
            AddEditedNameToArray(privileges,InputName)
        }else{
            return alert("Name already taken")
        }   
    }

    function AddEditedNameToArray(privilege,InputName) {    
        setPrivileges([
            {
            "name" : InputName.trim(),
            "active" : privilege.active,
            "id" : privilege.id,
            "editing" : false


            }, 
            ...privileges,
        ])
        console.log(privileges)
        return privileges
    }

    function AddNewNameToArray(InputName) {    
        setPrivileges([
            {
            "name" : InputName.trim(),
            "active" : false,
            "id" : privileges.length+2,
            "editing" : false

            }, 
            ...privileges,
        ])
        console.log(privileges)
        return privileges
    }

    return <div>
        <h1>Privileges</h1>
        <ol>{privileges.map(renderPrivilege)}</ol>

        <button onClick={handleClickActive}>Active privileges</button>
        <button onClick={handleClickInactive}>Inactive privileges</button>
        
        {showMoreActive && <p>{privileges.map(onlyActive)}</p>}
        {showMoreInactive && <p>{privileges.map(onlyInactive)}</p>}

        
        <h3>Add a privilege</h3>
        <input
            value={InputName}
            onChange={e => setInputName(e.target.value)}
        />

            <button onClick={() => {InputNameValidation(privileges,InputName.trim(),true)}}>Add</button>


    </div>;


};
