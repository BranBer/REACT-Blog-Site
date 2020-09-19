import React, {useState, useEffect, useContext} from 'react';
import { GeneralContext } from '../GeneralContext';
import styles from './CommentUserManager.module.scss';
import axios from 'axios';

const CommentUserManager = (props) =>
{
    let myContext = useContext(GeneralContext);
    let myUrl = myContext.value.url;

    const [commentID, updateCommentID] = useState('');
    const [banUsername, updateBanUsername] = useState('');
    const [unbanUsername, updateUnBanUsername] = useState('');
    const [statusMessage, updateStatusMessage] = useState('');

    //Deletes comment if super user is logged in and comment ID input is not empty
    const deleteComment = () =>
    {
        let token = sessionStorage.getItem('token');

        if(token !== null && token !== 'null' && commentID !== '')
        {
            let config = {
                headers:
                {
                    'Authorization': 'Token ' + token
                }
            };

            let body = new FormData();
            body.append('id', commentID);

            axios.post(myUrl + '/posts/comments/delete/', body, config)
            .then(
                response =>
                {
                    updateStatusMessage('Comment ' + commentID + ' deleted');
                }
            )
            .catch(
                err =>
                {   
                    updateStatusMessage('Invalid Comment ID. Check your email.');
                }
            );
        }
        else
        {
            updateStatusMessage('You shouldn\'t be here...');
        }
    }

    const banUser = () =>
    {
        let token = sessionStorage.getItem('token');

        if(token !== null && token !== 'null' && banUsername !== '')
        {
            let config = {
                headers:
                {
                    'Authorization': 'Token ' + token
                }
            };

            let body = new FormData();
            body.append('username', banUsername);

            axios.post(myUrl + '/User/Disable/', body, config)
            .then(
                response =>
                {
                    updateStatusMessage('User ' + banUsername + ' banned');
                }
            )
            .catch(
                err =>
                {   
                    updateStatusMessage('Invalid Username. Check your email.');
                }
            );
        }
        else
        {
            updateStatusMessage('You shouldn\'t be here...');
        }
    }

    const unbanUser = () =>
    {
        let token = sessionStorage.getItem('token');

        if(token !== null && token !== 'null' && unbanUsername !== '')
        {
            let config = {
                headers:
                {
                    'Authorization': 'Token ' + token
                }
            };

            let body = new FormData();
            body.append('username', banUsername);

            axios.post(myUrl + '/User/Enable/', body, config)
            .then(
                response =>
                {
                    updateStatusMessage('User ' + unbanUsername + ' unbanned');
                }
            )
            .catch(
                err =>
                {   
                    updateStatusMessage('Invalid Username. Check your email.');
                }
            );
        }
        else
        {
            updateStatusMessage('You shouldn\'t be here...');
        }
    }

    return(
        <>
            <div className = {styles.CommentUserContainer}>

                <h2>Delete Comment</h2>
                <div className = {styles.InputField}>
                    <label>Comment ID</label>
                    <input onChange = {(event) => updateCommentID(event.target.value)}></input>
                </div>
                <button onClick = {deleteComment}>Delete Comment</button>

                <h2>Ban User</h2>
                <div className = {styles.InputField}>
                    <label>Username</label>
                    <input onChange = {(event) => updateBanUsername(event.target.value)}></input>
                </div>
                <button onClick = {banUser}>Ban User</button>

                <h2>Unban User</h2>
                <div className = {styles.InputField}>
                    <label>Username</label>
                    <input onChange = {(event) => updateUnBanUsername(event.target.value)}></input>  
                </div> 
                <button onClick = {unbanUser}>Unban User</button>  

                <sub>{statusMessage}</sub>
            </div>
        </>
    );
}

export default CommentUserManager;