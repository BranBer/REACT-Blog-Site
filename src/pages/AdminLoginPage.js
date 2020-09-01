import React, {useState, useEffect} from 'react';
import axios from'axios';
import styles from './AdminPage.module.scss';
import BlogPostByYouManager from './ByYouPosts/BlogPostByYouManager';
import BlogPostManager from './ByYouPosts/BlogPostManager';
import SubmissionForm from '../components/Submissions/SubmissionForm';

const AdminLoginPage = () =>
{
    const [Credentials, UpdateCredentials] = useState({username: '', password: ''});

    const [loginStatusMsg, updateLoginStatus] = useState("");

    const [isLoggedIn, updateLogin] = useState(sessionStorage.getItem('token') == null? false: true);
    const [showManagers, toggleManagers] = useState(false);

    useEffect(() => 
    {
        //updateLogin(sessionStorage.getItem('token') == null? false: true);
    });

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
                updateLogin(true);
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

    const logoutHandler = () =>
    {        
        updateLogin(false);
        sessionStorage.setItem('token', null);
    }

    return (
        <div className = {styles.AdminPageContainer}>
            {isLoggedIn == false?
            <div className = {styles.AdminLoginContainer}>
                <h2>👑Admin Login</h2>
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
            <div className = {styles.AdminPageContainer}>
                <button onClick = {logoutHandler} className = {styles.logoutButton}>Logout</button>
                <button onClick = {() => toggleManagers(!showManagers)} className = {styles.toggleManagerButton}>{showManagers?'Create Blog Posts':'Manage Blog Posts'}</button>
                <div className = {styles.BlogPanelsContainer}>
                    {showManagers == false?<div>
                        <SubmissionForm/>
                    </div>:null}

                    {showManagers == true?<div className = {styles.BlogPanels}>         
                        <BlogPostManager/>
                        <BlogPostByYouManager/>             
                    </div>: null}
                </div>
            </div>
            }
        </div>
    );
}

export default AdminLoginPage;