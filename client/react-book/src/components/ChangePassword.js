import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import validator from 'validator'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState("");
 
  const validate = (value) => {
 
    if (validator.isStrongPassword(value, {
      minLength: 4, minLowercase: 1,
      minUppercase: 1 , minNumbers: 1, minSymbols: 0
    })) {
      setErrorMessage('Is Strong Password')
      // setPassword(value)
    } else {
      setErrorMessage('Is Not Strong Password')
    }
  }

  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem('user')).username;
    console.log(username);
    console.log(localStorage.getItem('user'));
    if(newPassword != confirmedPassword) {
      setError("Please confirm the same password");
      return;
    } else {
      if(newPassword == oldPassword) {
        setError("Please enter different passwords");
        return;
      }
    } 

    try {
       await AuthService.changePassword(username, oldPassword, newPassword).then(
        () => {
          setError("");
          setErrorMessage("");
          setMessage("You succesfully changed your password");
        },
        (error) => {
          setError('Server error')
          console.log(error);
        }
      );
    } catch (err) {
      //setError('Invalid Password')
      console.log(err);
    }
  
  };

return (
  <MDBContainer fluid>
  <form onSubmit={handlePasswordChange} >

  <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
    <MDBCardBody>
      <MDBRow>
        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="lock me-3" size='lg'/>
            <MDBInput 
            label='Password'
            id='oldpass'
            type='password'
            value={oldPassword}
            onChange= {(e) => setOldPassword(e.target.value)}
             />   
          </div>
          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="lock me-3" size='lg'/>
            <MDBInput 
            label='Password'
            id='newpass'
            type='password'
            value={newPassword}
            onChange= {(e) => setNewPassword(e.target.value)}
            onBlur={(e) => validate(e.target.value)}
             />
            
          </div>
          <div className="d-flex flex-row align-items-center mb-4">
            <MDBIcon fas icon="lock me-3" size='lg'/>
            <MDBInput 
            label='Password'
            id='confirmpass'
            type='password'
            value={confirmedPassword}
            onChange= {(e) => setConfirmedPassword(e.target.value)}
             />
            
          </div>

          {errorMessage === '' ? null :
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>}


{message === '' ? null :
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{message}</span>}
        
        
          <p>{error}</p>

          <MDBBtn className='mb-4' size='lg' type="submit"> Change password </MDBBtn>

        </MDBCol>

      </MDBRow>
    </MDBCardBody>
  </MDBCard>
  </form>
</MDBContainer>
);
}
export default ChangePassword;