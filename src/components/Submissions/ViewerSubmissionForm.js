import React, {useState, useContext} from 'react';
import styles from './ViewerSubmissionForm.module.scss';
import axios from 'axios';
import { GeneralContext } from '../GeneralContext';

const ViewerSubmissionForm = (props) =>
{
    let myContext = useContext(GeneralContext);

    const [postData, updatePostData] = useState({
        post_title: '',
        author: 'anonymous',
        post_content: ''
    });

    const [statusMsg, updateStatusMsg] = useState('');

    const handleTitleChange = (event) =>
    {
        let myPostData = postData;
        myPostData.post_title = event.target.value;
        updatePostData(myPostData);
    }

    const handleAuthorChange = (event) =>
    {
        let myPostData = postData;
        myPostData.author = event.target.value;
        updatePostData(myPostData);
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

        let config = {
            headers:
            {
                'Content-Type': 'multipart/form-data'
            }
        };

        for (var i in myPostData)
        {
            body.append(myPostData[i][0], myPostData[i][1]);
        }

        axios.post(url, body, config)
        .then(
            response =>
            {
                if(response.status == 200)
                {
                    updateStatusMsg("Post Successfully Submitted");
                }
            }
        )
        .catch(
            err => 
            {
                updateStatusMsg('Failed to Submit Post');
            });
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
            <label>Post Author </label>
            <input type = "text" onChange = {handleAuthorChange}/>
        </div>
        <sub>Leave blank to be anonymous</sub>
        <br/>

    
        <label>Your Post</label>
        <textarea onChange = {handleContentChange}></textarea>
        
        <button onClick = {submitPost}>Submit Post</button>
        <sub>{statusMsg}</sub>
    </div>);
}

export default ViewerSubmissionForm;