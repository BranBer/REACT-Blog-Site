import React, {useState} from 'react';
import axios from'axios';
import styles from './AdminLoginPage.module.scss';
import BlogPostManager from './ByYouPosts/BlogPostManager';

const AdminLoginPage = () =>
{
    const [Credentials, UpdateCredentials] = useState({username: '', password: ''});

    const [loginStatusMsg, updateLoginStatus] = useState("");

    const loginHandler = () =>
    {
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/login/';

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        let form_data = new FormData();
        form_data.append('username', Credentials.username);
        form_data.append('password', Credentials.password);

        axios.post(
            url, 
            form_data,             
            {
                headers : {
                'Content-Type': 'multipart/form-data'
                }
            }  
        )
        .then((response) => {
            sessionStorage.setItem('token', response.data.token)

            if (response.status == 200)
            {
                updateLoginStatus("Login Success");
            }
        })
        .catch(err => updateLoginStatus("Invalid Credentials"));
    }  
    
    const handleUsernameUpdate = (event) =>
    {
        let myCred = Credentials;
        myCred.username = event.target.value;
        UpdateCredentials(myCred);
    }

    const handlePasswordUpdate = (event) =>
    {
        let myCred = Credentials;
        myCred.password = event.target.value;
        UpdateCredentials(myCred);
    }

    return (
        <div>
            {sessionStorage.getItem('token') == null?<div className = {styles.AdminLoginContainer}>
                <h2>👑 Login</h2>
                <hr/>
                <div className = {styles.LoginInput}>
                    <label>Username</label>
                    <input type ="text" onChange = {handleUsernameUpdate}/>
                </div>
    
                <div className = {styles.LoginInput}>
                    <label>Password</label>
                    <input type ="password" onChange = {handlePasswordUpdate}/>
                </div>
                
                <hr/>
                <button onClick = {loginHandler}>Login</button>
                <br/>
                <sub>{loginStatusMsg}</sub>
            </div>: 
            <div>
                <button>Logout</button>
                <BlogPostManager/>
            </div>
            }
        </div>
    );
}

export default AdminLoginPage;