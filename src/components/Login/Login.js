import React, {useState, useEffect, useContext} from 'react';
import styles from './Login.module.scss';
import axios from 'axios';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {GeneralContext} from '../GeneralContext';

const Login = (props) =>
{
    const [statusMessage, updateStatusMessage] = useState(props.location.state !== undefined?props.location.state.Message:'');
    const [isLoggedIn, updateIsLoggedIn] = useState(false);
    const [credentials, updateCredentials] = useState({
        username: '',
        password: ''
    });

    let myContext = useContext(GeneralContext);
    let myHistory = useHistory();

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
                    updateIsLoggedIn(true);
                    myContext.executeLoadFunction();
                    myHistory.goBack();
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

    const logoutHandler = () =>
    {
        sessionStorage.setItem('token', null);
        updateIsLoggedIn(false);
        myContext.executeLoadFunction();
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

    useEffect(()=>
    {

        let token = sessionStorage.getItem('token');
        
        if(token !== null && token !== 'null')
        {
            updateIsLoggedIn(true);
        }
        else
        {
            updateIsLoggedIn(false);
        }
    }, []);

    return (
        <div className = {styles.LoginContainer}>
            <h2>Login</h2>
            <hr/>
            {!isLoggedIn?
            <>
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
            </>: null}

            
            {!isLoggedIn?
            <button onClick = {loginHandler}>Login</button>:
            <button onClick = {logoutHandler}>Logout</button>
            }

            
        </div>
    );
}

export default Login;