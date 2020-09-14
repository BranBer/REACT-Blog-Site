import React, {useState, useEffect} from 'react';
import styles from './UserProfile.module.scss';
import axios from 'axios';

const UserProfile = () =>
{
    const [statusMessage, updateStatusMessage] = useState('');
    const [showProfile, updateShowProfile] = useState(sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== 'null');
    const [fields, updateFields] = useState({
        displayName: '',
        email: '',
    });
    
    const [userInfo, updateUserInfo] = useState(
        {
            displayName: '',
            username: '',
            email: '',
        }
    );

    const pullUserInfo = () =>
    {
        //If the token is not null (user is logged in)
        if(showProfile)
        {   
            //Get basic user data
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/User/GetUser/';
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
                    });
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

    const updateProfile = () =>
    {
        if(showProfile)
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/User/Update/';
            
            let body = new FormData();
            
            if(fields.displayName !== '')
            {
                body.append('display_name', fields.displayName);
            }
            
            if(fields.email !== '')
            {
                body.append('email', fields.email);
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
                    updateStatusMessage('Profile Updated');
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

                    <h2>Edit Profile</h2>

                    <div className = {styles.InputField}>
                        <label>Display Name: </label>
                        <input type = "text" onChange = {handleDisplayNameChange}></input>
                    </div>

                    <div className = {styles.InputField}>
                        <label>New Email: </label>
                        <input type = "text" onChange = {handleEmailChange}></input>
                    </div>

                    <button onClick = {updateProfile}>Save Changes</button>
                </>:
                <p>Login or Register First</p>}
            </div>
        </>
    );
}

export default UserProfile;