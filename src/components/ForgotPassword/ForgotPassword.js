import React, {useContext, useState} from 'react';
import axios from 'axios';
import styles from './ForgotPassword.module.scss';
import {Redirect} from 'react-router-dom';
import { GeneralContext } from '../GeneralContext';

const ForgotPassword = (props) =>
{
    const [showChangePassword, updateShowChangePassword] = useState(false);
    const [statusMessage, updateStatusMessge] = useState('');
    const [fields, updateFields] = useState({
        email: ''
    });
    
    let myContext = useContext(GeneralContext);

    const handleEmailChange = (event) =>
    {
        let myFields = fields;
        fields.email = event.target.value;
        updateFields(myFields);
    }

    const SendCode = () =>
    {
        if (fields.email !== '')
        {
            let url = myContext.value.url + '/User/ForgotPassword/';
            
            let body = new FormData();
            body.append('email', fields.email);

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            axios.post(url, body, config)
            .then(
                response =>
                {
                    updateShowChangePassword(true);
                    updateStatusMessge('Code Sent!');
                }
            )
            .catch(
                err =>
                {
                    updateShowChangePassword(false);
                    updateStatusMessge('No accounts associated with this email');
                }
            );
        }
        else
        {
            updateStatusMessge('Please enter a valid email');
        }
    }


    return(
        <>
            <div className = {styles.ForgotPasswordContainer}>
                <h2>Change Password</h2>
                <hr/>

                <p>We will send a code to your email. Enter that code to update your password. The code is case sensitive.</p>
                
                <div className = {styles.InputAlign}>
                    <label>Email: </label>
                    <input type = "email" onChange = {handleEmailChange}/>
                </div>

                <sub>{statusMessage}</sub>

                <hr/>
                <button onClick = {SendCode}>Submit</button>
                {showChangePassword? <Redirect to = '/ResetPassword'/>: null}
            </div>             
        </>
    );
}

export default ForgotPassword;