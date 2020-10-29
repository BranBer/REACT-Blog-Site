import React, {useState, useEffect, useContext} from 'react';
import styles from './ViewerSubmissionForm.module.scss';
import axios from 'axios';
import { GeneralContext } from '../GeneralContext';
import { Redirect } from 'react-router-dom';

const ViewerSubmissionForm = (props) =>
{
    let myContext = useContext(GeneralContext);

    const [postData, updatePostData] = useState({
        post_title: '',
        post_content: ''
    });

    const [isAnonymous, updateIsAnonymous] = useState(sessionStorage.getItem('UserPostIsAnon') == 'true'?true:false);
    const [redirectRegistration, updateRedirectRegistration] = useState(false);
    const [statusMsg, updateStatusMsg] = useState('');
    const [showSubmission, updateShowSubmission] = useState(false);

    useEffect(() => {
        let token = sessionStorage.getItem('token');

        if(token !== null && token !== 'null')
        {
            updateShowSubmission(true);
        }
        else
        {
            updateShowSubmission(false);
        }
    }, []);

    const handleTitleChange = (event) =>
    {
        let myPostData = postData;
        myPostData.post_title = event.target.value;
        sessionStorage.setItem('UserPostTitle', event.target.value);
        updatePostData(myPostData);
    }

    const handleAnonymousChange = (event) =>
    {
        updateIsAnonymous(event.target.checked);
        sessionStorage.setItem('UserPostIsAnon', event.target.checked);
    }

    const handleContentChange = (event) =>
    {
        let myPostData = postData;
        myPostData.post_content = event.target.value;
        updatePostData(myPostData);
        sessionStorage.setItem('UserPostContent', event.target.value);
    }

    const submitPost = () =>
    {
        let myPostData = Object.entries(postData);
        let url = myContext.value.url + '/create/ByYou/';
        let body = new FormData();
        body.append('post_title', postData.post_title);
        body.append('post_content', postData.post_content);
        body.append('is_anonymous', isAnonymous);

        let token = sessionStorage.getItem('token');

        let config = {
            headers:
            {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token
            }
        };

        if(postData.post_title !== '' && postData.post_content !== '' && token !== 'null' && token !== null)
        {
            axios.post(url, body, config)
            .then(
                response =>
                {
                    if(response.status == 200)
                    {
                        updateStatusMsg("Post Successfully Submitted For Review");
                    }
                }
            )
            .catch(
                err => 
                {
                    updateStatusMsg('Failed to Submit Post');
                });
        }
        else if(token == 'null' || token == null)
        {
            updateStatusMsg('Login First to Post');
            updateRedirectRegistration(true);
        }
        else
        {
            updateStatusMsg('Must fill out form completely');
        }
    }


    return (
    <div className = {styles.ViewerSubmissionContainer}>

        <h2>Your Post</h2>
        <sub>Submit Your Post for Review</sub>
        <hr/>

        {        
            showSubmission?
            <>

                <div className = {styles.inputAlign}>
                    <label>Post Title </label>
                    <input type = "text" onChange = {handleTitleChange} defaultValue = {sessionStorage.getItem('UserPostTitle')}/>
                </div>

                <br/>

                <div className = {styles.inputAlign}>
                    <label>Is Anonymous Post</label>
                    <input type = "checkbox" checked = {isAnonymous} onChange = {handleAnonymousChange} />
                </div>
                
                <br/>

            
                <label>Your Post</label>
                <textarea onChange = {handleContentChange} defaultValue = {sessionStorage.getItem('UserPostContent')}></textarea>

                </>: <p>You must login or register an account to submit posts</p>
        }  
                
                <button onClick = {submitPost}>{showSubmission?'Submit Post':'Go to Login/Registration'}</button>
                <sub>{statusMsg}</sub>
     

        {   
            redirectRegistration?     
                <Redirect to = '/Login'/>
            : 
                null
        }
    </div>);
}

export default ViewerSubmissionForm;