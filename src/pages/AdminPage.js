import React, {useState, useEffect, useContext} from 'react';
import axios from'axios';
import styles from './AdminPage.module.scss';
import BlogPostByYouManager from './ByYouPosts/BlogPostByYouManager';
import BlogPostManager from './ByYouPosts/BlogPostManager';
import SubmissionForm from '../components/Submissions/SubmissionForm';
import CommentUserManager from '../components/CommentUserManager/CommentUserManager';
import {GeneralContext} from '../components/GeneralContext';

const AdminPage = () =>
{
    const myContext = useContext(GeneralContext);
    let url = myContext.value.url;

    const [showLogin, updateShowLogin] = useState(sessionStorage.getItem('token') !== 'null' && sessionStorage.getItem('token') !== null);
    
    const [isAdmin, updateIsAdmin] = useState(false);

    const [Credentials, UpdateCredentials] = useState({username: '', password: ''});

    const [loginStatusMsg, updateLoginStatus] = useState("");


    const [showManagers, toggleManagers] = useState(false);
    const [showCommentUserManager, toggleCommentUserManager] = useState(false);
    const [showSubmission, toggleSubmission] = useState(false);
    

    const isAdminAcount = () =>
    {
        const token = sessionStorage.getItem('token');

        let config = {
            headers: {
                Authorization: 'Token ' + token
            }
        };

        if(token !== 'null' && token !== null)
        {
            axios.get(url + '/User/IsSuperUser/', config)
            .then(
                response =>
                {
                    if(response.data == true)
                    {
                        updateLoginStatus("Login Success");
                        updateShowLogin(false);
                    }
                    else
                    {
                        updateLoginStatus('This account is not authorized...');
                    }
                }
            )
            .catch(
                err =>
                {
                }
            );
        }
        else
        {
            updateShowLogin(true);
        }
    }

    useEffect(() => 
    {
        isAdminAcount();             
    }, []);

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
                isAdminAcount();
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

    const handlePostManagerChange = () =>
    {
        if(showLogin == false)
        {
            toggleManagers(true);
            toggleCommentUserManager(false);
            toggleSubmission(false);
        }
    }

    const handleCommentUserManagerChange = () =>
    {
        if(showLogin == false)
        {
            toggleManagers(false);
            toggleCommentUserManager(true);
            toggleSubmission(false);
        }
    }

    const handleSubmissionManagerChange = () =>
    {
        if(showLogin == false)
        {
            toggleManagers(false);
            toggleCommentUserManager(false);
            toggleSubmission(true);
        }
    }

    const logoutHandler = () =>
    {        
        sessionStorage.setItem('token', 'null');
        isAdminAcount();
        //updateShowLogin(true);
    }

    return (
        <div className = {styles.AdminPageContainer}>
            {showLogin === true?
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
                <div className = {styles.AdminNav}>
                    <button onClick = {logoutHandler} 
                            className = {styles.logoutButton}>Logout</button>
                    <button onClick = {handleSubmissionManagerChange}>Submission Manager</button>
                    <button onClick = {handlePostManagerChange}>Manage Posts</button>
                    <button onClick = {handleCommentUserManagerChange}>Comment/User Manager</button>
                </div>
                <div className = {styles.BlogPanelsContainer}>
                    {showSubmission?
                        <div>
                            <SubmissionForm/>
                        </div>:null
                    }

                    {showManagers == true?
                        <div className = {styles.BlogPanels}>         
                            <BlogPostManager/>
                            <BlogPostByYouManager/>             
                        </div>
                        : 
                        null
                    }


                    {showCommentUserManager == true?
                    <div>
                        <CommentUserManager/>
                    </div>
                    :
                    null}

                </div>
            </div>
            }
        </div>
    );
}

export default AdminPage;