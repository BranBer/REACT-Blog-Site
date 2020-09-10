import React, {useState} from 'react';
import styles from './Registration.module.scss';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const Registration = (props) =>
{
    const [statusMessage, updateStatusMessage] = useState(''); 
    const [confirmationCode, updateConfirmationCode] = useState('');
    const [showRegistration, updateShowRegistration] = useState(true);
    const [isRegistered, updateIsRegistered] = useState(false);
    const [registrationFields, updateRegistrationFields] = useState({
        email: '',
        username: '',
        password: '',
        password2: '',
        dob: ''
    })

    const handleEmailChange = (event) =>
    {
        let myFields = registrationFields;
        myFields.email = event.target.value;
        updateRegistrationFields(myFields);
    }

    const handleUsernameChange = (event) =>
    {
        let myFields = registrationFields;
        myFields.username = event.target.value;
        updateRegistrationFields(myFields);
    }

    const handlePasswordChange = (event) =>
    {
        let myFields = registrationFields;
        myFields.password = event.target.value;
        updateRegistrationFields(myFields);

        if(registrationFields.password !== registrationFields.password2)
        {
            updateStatusMessage('Passwords must match...')
        }
        else if (registrationFields.password == '' && registrationFields.password2 == '')
        {
            updateStatusMessage('')
        }
        else
        {
            updateStatusMessage('Passwords Match')
        }
    }

    const handlePassword2Change = (event) =>
    {
        let myFields = registrationFields;
        myFields.password2 = event.target.value;
        updateRegistrationFields(myFields);

        if(registrationFields.password !== registrationFields.password2)
        {
            updateStatusMessage('Passwords must match...')
        }
        else if (registrationFields.password == '' && registrationFields.password2 == '')
        {
            updateStatusMessage('')
        }
        else
        {
            updateStatusMessage('Passwords Match')
        }
    }

    const handleDOBChange = (event) =>
    {
        let myFields = registrationFields;
        myFields.dob = event.target.value;
        updateRegistrationFields(myFields);
    }

    const validateRegistrationFields = () =>
    {
        let valid = true;

        if(registrationFields.username == '')
        {
            updateStatusMessage('Must Include Username');
            valid = false;
        }

        if(registrationFields.password == '')
        {
            updateStatusMessage('Must Include Password');
            valid = false;
        }

        if(registrationFields.password2 == '')
        {
            updateStatusMessage('Must Include Second Password');
            valid = false;
        }

        if(registrationFields.dob == '')
        {
            updateStatusMessage('Must Include Date of Birth');
            valid = false;
        }

        return valid;
    }

    const handleCodeChange = (event) =>
    {
        updateConfirmationCode(event.target.value);
    }

    const sendAuthCode = () =>
    {
        if(validateRegistrationFields())
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/Register/SendCode/';

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            let body = new FormData();
            body.append('username', registrationFields.username);
            body.append('email', registrationFields.email);
        
            axios.post(url, body, config)
            .then(
                respone =>
                {
                    console.log('Sent Confirmation Code');
                    updateShowRegistration(false);
                    updateStatusMessage('');
                }
            )
            .catch(
                err =>
                {
                    console.log('Something went wrong');
                    updateStatusMessage(err.response.data);
                    updateShowRegistration(true);
                }
            );
        }
    }

    const authorizeCode = () =>
    {
        if(confirmationCode !== '' && confirmationCode.length == 6)
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/Register/Authorize/';

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            let body = new FormData();
            body.append('username', registrationFields.username);
            body.append('email', registrationFields.email);
            body.append('password', registrationFields.password);
            body.append('code', confirmationCode);
            body.append('dob', registrationFields.dob);
            
            axios.post(url, body, config)
            .then(
                response =>
                {
                    updateStatusMessage('Your account has been created!')
                    updateIsRegistered(true);
                }
            )
            .catch(
                err =>
                {
                    updateStatusMessage('Invalid Code');
                    updateIsRegistered(false);
                }
            );
            
        }
    }


    return (
        <>
            {
                showRegistration? 
                <div className = {styles.RegistrationParent}>
                    <div className = {styles.RegistrationContainer}>    
                        <h2>Registration</h2>
                        <hr/>
                        <div className = {styles.RegistrationField}>
                            <label>Email</label>
                            <input type = 'text' onChange = {handleEmailChange}/>
                        </div>
            
                        <div className = {styles.RegistrationField}>
                            <label>Username</label>
                            <input type = 'text' onChange = {handleUsernameChange}/>
                        </div>
            
                        <div className = {styles.RegistrationField}>
                            <label>Password</label>
                            <input type = 'password' onChange = {handlePasswordChange}/>
                        </div>
            
                        <div className = {styles.RegistrationField}>
                            <label>Password again</label>
                            <input type = 'password' onChange = {handlePassword2Change}/>
                        </div>
            
                        <div className = {styles.RegistrationField}>
                            <label>Date Of Birth</label>
                            <input type = 'date' onChange = {handleDOBChange}/>
                        </div>

                        <sub>{statusMessage}</sub>
                        <hr/>
                        <button onClick = {sendAuthCode}>Submit</button>
                    </div>
                </div>
                : 
                <div className = {styles.ConfirmationParent}>
                    <div className = {styles.ConfirmationContainer}>
                        <h2>Confirmation</h2>
                        <hr/>
                        <p>A code has been sent to {registrationFields.email == ''?'your email':registrationFields.email}. Please open it and enter it below to create your account.</p>
                        <input type = 'text' onChange = {handleCodeChange} maxLength = "6"/>
                        <sub>{statusMessage}</sub>
                        <button onClick = {authorizeCode}>Register</button>                          
                        <hr/>
                        <button onClick = {sendAuthCode}>Resend Code</button>              
                    </div>

                    {isRegistered?<Redirect to = "/login"/>:null}
                </div>
            }
        </>
    );
}

export default Registration;