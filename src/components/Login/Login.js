import React, {useState} from 'react';
import styles from './Login.module.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = (props) =>
{
    const [statusMessage, updateStatusMessage] = useState('');
    const [credentials, updateCredentials] = useState({
        username: '',
        password: ''
    });

    const loginHandler = () =>
    {
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/login/';

        let body = new FormData();
        body.append('username', credentials.username);
        body.append('password', credentials.password);

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        if(credentials.username !==  '' && credentials.password !== '')
        {
            axios.post(url, body, config)
            .then(
                response =>
                {
                    sessionStorage.setItem('token', response.data["token"]);
                    updateStatusMessage('Successfully Logged in as ' + response.data["username"]);
                }
            )
            .catch(
                err =>
                {
                    updateStatusMessage('Invalid Credentials');
                }
            );
        }

    }

    const usernameChangedHandler = (event) =>
    {
        let myCred = credentials;
        myCred.username = event.target.value;
        updateCredentials(myCred);
    }
    
    const passwordChangedHandler = (event) =>
    {
        let myCred = credentials;
        myCred.password = event.target.value;
        updateCredentials(myCred);
    }


    return (
        <div className = {styles.LoginContainer}>
            <h2>Login</h2>
            <hr/>

            <div className = {styles.loginField}>
                <label>Username</label>
                <input type = 'text' onChange = {usernameChangedHandler}/>
            </div>

            <div className = {styles.loginField}>
                <label>Password</label>
                <input type = 'password' onChange = {passwordChangedHandler}/>
            </div>
            <Link className = {styles.forgotPassword} to = "/ForgotPassword">Forgot Password?</Link>
            <Link className = {styles.registerLink} to = "/Registration">or Register Here...</Link>
            <sub>{statusMessage}</sub>

            <hr/>
            <button onClick = {loginHandler}>Login</button>
            
        </div>
    );
}

export default Login;