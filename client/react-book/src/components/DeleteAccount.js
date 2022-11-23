import React, { useState } from "react";
import AuthService from "../services/auth-service";
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { Button } from 'primereact/button';
import authService from "../services/auth-service";

const DeleteAccount = () => {

const [error, setError] = useState("");
const [message, setMessage] = useState("");

const acceptFunc = async () => {
   // e.preventDefault();
   const response = await authService.deleteAcc();
   if(response.status == 200){
   setMessage("You sucesfully deleted your acc");
   }
   console.log(response)
}

const rejectFunc = () => {
    //navigate to home page 
    console.log("i am in rejectFunc");
}
  
const confirm = () => {
    confirmDialog({
        message: 'Are you sure you want to deleteAccount?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => acceptFunc(),
        reject: () => rejectFunc()
    });
}

return (
  <div>
    <Button className="ui-button-warning" onClick={confirm} icon="pi pi-exclamation-triangle" label="Delete account"></Button>
    <ConfirmDialog   style={{width: '50vw',color:'rebeccapurple'}} /> 
    {/* <alert ></alert> */}
  </div>
);
}
export default DeleteAccount;