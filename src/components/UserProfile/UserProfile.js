import React, {useState, useEffect, useContext} from 'react';
import styles from './UserProfile.module.scss';
import axios from 'axios';
import { GeneralContext } from '../GeneralContext';
import { Redirect } from 'react-router-dom';

const UserProfile = () =>
{
    let myContext = useContext(GeneralContext);

    const [statusMessage, updateStatusMessage] = useState('');
    const [showProfile, updateShowProfile] = useState(sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== 'null');
    const [fields, updateFields] = useState({
        displayName: '',
        email: '',
        authCode: '',
        subscribed: false,
    });
    
    const [userInfo, updateUserInfo] = useState(
        {
            displayName: '',
            username: '',
            email: '',
            subscribed: false
        }
    );

    const [isChecked, updateIsChecked] = useState(false);

    const[showEmailInputFields, updateShowEmailInputFields] = useState(false);

    const pullUserInfo = () =>
    {
        //If the token is not null (user is logged in)
        if(showProfile)
        {   
            //Get basic user data
            let url = myContext.value.url + '/User/GetUser/';
            let config = {
                headers: 
                {
                    'Authorization': 'Token ' + sessionStorage.getItem('token')
                }
            };

            axios.get(url, config)
            .then(
                response =>
                {
                    updateUserInfo( 
                    {
                        displayName: response.data.display_name,
                        username:  response.data.username,
                        email: response.data.email,
                        subscribed: response.data.subscribed? true: false,
                    });

                    updateIsChecked(response.data.subscribed? true: false);
                }
            )
            .catch(
                err =>
                {
                    console.log("Something went wrong");
                }
            );
        }
    }
    
    useEffect(() =>
    {
        pullUserInfo();
    }, []);

    const handleDisplayNameChange = (event) =>
    {
        let myFields = fields;
        myFields.displayName = event.target.value;
        updateFields(myFields);
    }

    const handleEmailChange = (event) =>
    {
        let myFields = fields;
        myFields.email = event.target.value;
        updateFields(myFields);
    }

    const handleSubscriptionChange = (event) =>
    {
        updateIsChecked(!isChecked);
    }

    const handleAuthCodeChange = (event) =>
    {
        let myFields = fields;
        myFields.authCode = event.target.value;
        updateFields(myFields);
    }

    const updateProfile = () =>
    {
        if(showProfile)
        {
            let url = myContext.value.url + '/User/Update/';
            
            let body = new FormData();
            
            if(fields.displayName !== '')
            {
                body.append('display_name', fields.displayName);
            }
            
            if(fields.email !== '')
            {
                body.append('email', fields.email);
            }
            
            if(typeof fields.subscribed === 'boolean')
            {
                body.append('subscribed', isChecked);
            }

            let config = {
                headers: 
                {
                    'Authorization': 'Token ' + sessionStorage.getItem('token')
                }
            };

            axios.post(url, body, config)
            .then(
                response =>
                {
                    if(fields.displayName !== '' || isChecked !== userInfo.subscribed)
                    {
                        updateStatusMessage('Profile Updated');
                    }
                    
                    //Show email verification form if user wants to change email
                    if(fields.email !== '')
                    {
                        updateShowEmailInputFields(true);
                        updateStatusMessage('Code Sent');
                    }
                    else
                    {
                        updateShowEmailInputFields(false);  
                    }

                    pullUserInfo();
                }
            )
            .catch(
                err =>
                {
                    updateStatusMessage('Something went wrong');
                }
            );
        }
        else
        {
            console.log('Login or Register First');
        }
    }

    const verifyNewEmail = () =>
    {
        let url = myContext.value.url + '/User/VerifyNewEmail/';
            
        let body = new FormData();
        
        if(fields.authCode !== '')
        {
            body.append('code', fields.authCode);
        }

        let config = {
            headers: 
            {
                'Authorization': 'Token ' + sessionStorage.getItem('token')
            }
        };

        axios.post(url, body, config)
        .then(
            response =>
            {
                updateStatusMessage('Email Updated');
                pullUserInfo();
                
                //There is no longer a need to show this form
                updateShowEmailInputFields(false);
            }
        )
        .catch(
            err =>
            {
                updateStatusMessage('Something went wrong');

                updateShowEmailInputFields(true);     
            }
        );
    }
    
    const logoutHandler = () =>
    {
        sessionStorage.setItem('token', null);
        myContext.executeLoadFunction();
        updateShowProfile(false);
    }

    return (
        <>
            <div className = {styles.UserProfileContainer}>
                {showProfile?<> 
                    <h2>Your Profile</h2>
                    <div className = {styles.Field}>
                        <label>Display Name: </label>
                        <span>{userInfo.displayName}</span>
                    </div>

                    <div className = {styles.Field}>
                        <label>UserName: </label>
                        <span>{userInfo.username}</span>
                    </div>

                    <div className = {styles.Field}>
                        <label>Email: </label>
                        <span>{userInfo.email}</span>
                    </div>

                    <div className = {styles.Field}>
                        <label>Subscribed: </label>
                        <span>{userInfo.subscribed?'Yes':'No'}</span>
                    </div>

                    <h2>Edit Profile</h2>

                    <div className = {styles.InputField}>
                        <label>Display Name: </label>
                        <input type = "text" onChange = {handleDisplayNameChange}></input>
                    </div>

                    <div className = {styles.InputField}>
                        <label>New Email: </label>
                        <input type = "text" onChange = {handleEmailChange}></input>     
                    </div>

                    <div className = {styles.InputField}>
                        <label>Subscribe: </label>
                        <input type = "checkbox" checked = {isChecked} onChange = {handleSubscriptionChange}></input>     
                        <sub>Subscribe to newsletter to stay updated on new posts!</sub>
                    </div>

                    {showEmailInputFields?
                        <>
                            <div className = {styles.InputField}>
                                <label>Auth Code: </label>
                                <input type = "text" onChange = {handleAuthCodeChange} maxLength = '6'/>
                                <button onClick = {verifyNewEmail}>Update Email</button>
                            </div>
                            <sub>A code has been sent to your new email. Please enter the correct code then click update email.</sub>
                            <sub>If you do not verify your email, your email won't be changed..</sub>
                        </>
                        :null
                    }

                    <sub style = {{color: 'green'}}>{statusMessage}</sub>
                        
                    
                    <button onClick = {updateProfile}>Save Changes</button>
                    <button onClick = {logoutHandler} className = {styles.LogoutButton}>Logout</button>
                </>:
                <Redirect to ="Login"/>}
            </div>
        </>
    );
}

export default UserProfile;