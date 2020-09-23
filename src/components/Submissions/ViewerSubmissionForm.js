import React, {useState, useEffect, useContext} from 'react';
import styles from './ViewerSubmissionForm.module.scss';
import axios from 'axios';
import { GeneralContext } from '../GeneralContext';

const ViewerSubmissionForm = (props) =>
{
    let myContext = useContext(GeneralContext);

    const [postData, updatePostData] = useState({
        post_title: '',
        post_content: ''
    });

    const [isAnonymous, updateIsAnonymous] = useState(false);

    const [statusMsg, updateStatusMsg] = useState('');

    const handleTitleChange = (event) =>
    {
        let myPostData = postData;
        myPostData.post_title = event.target.value;
        updatePostData(myPostData);
    }

    const handleAnonymousChange = (event) =>
    {
        updateIsAnonymous(event.target.checked);
    }

    const handleContentChange = (event) =>
    {
        let myPostData = postData;
        myPostData.post_content = event.target.value;
        updatePostData(myPostData);
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
            updateStatusMsg('Login ');
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

        <div className = {styles.inputAlign}>
            <label>Post Title </label>
            <input type = "text" onChange = {handleTitleChange}/>
        </div>

        <br/>

        <div className = {styles.inputAlign}>
            <label>Is Anonymous Post</label>
            <input type = "checkbox" checked = {isAnonymous} onChange = {handleAnonymousChange}/>
        </div>
        
        <br/>

    
        <label>Your Post</label>
        <textarea onChange = {handleContentChange}></textarea>
        
        <button onClick = {submitPost}>Submit Post</button>
        <sub>{statusMsg}</sub>
    </div>);
}

export default ViewerSubmissionForm;