import React, {useState, useEffect} from 'react';
import styles from './CommentsSection.module.scss';
import axios from 'axios';
import Comment from './Comment';

const CommentsSection = (props) => {
    const [comments, updateComments] = useState({});

    const [commentSubmission, updateCommentSubmission] = useState('');

    const [statusMessage, updateStatusMessage] = useState('');

    const getComments = () =>
    {
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/comments/' + props.post_id + '/';
        
        //Gets the comments
        axios.get(url)
        .then(response =>{
            //Updates the comments
            updateComments(response.data); 
            
        })
        .catch(err => {
            console.log("Something went wrong");
        });
    }

    useEffect(() => getComments(), []); //Passing an array as a second parameter makes it so that useEffect is only called after the first render


    const commentChangeHandler = (event) =>
    {
        updateCommentSubmission(event.target.value);
    }
    
    const submitComment = () =>
    {
        let token = sessionStorage.getItem('token');

        if(commentSubmission !== '' && (token !== null && token !== 'null'))
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/create/comment/';
            
            let form_data = new FormData();
            form_data.append('id', props.post_id);
            form_data.append('comment', commentSubmission);

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + token
                }
            };

            axios.post(url, form_data, config)
            .then(response => 
                {
                    console.log('Successfully commented on post with an id of ' + props.post_id + ".");
                    getComments();
                    updateStatusMessage('Successfully Commented!');
                })
            .catch(
                err =>
                {
                    console.log("Something went wrong");
                }
            );
        }
    }

    //Prepare comments for rendering
    const myComments = Object.entries(comments).map((object, index) => {       
        return (
            <Comment key = {'comment' + object[1].id.toString()}
                     comment_id = {object[1].id}
                     comment = {object[1].comment} 
                     author = {object[1].username}
                     date = {object[1].date_posted}
                     votes = {object[1].net_votes}
                     replies = {object[1].reply}
                     reloadComments = {getComments}
                     replyLength = {object[1].reply.length - 1}/>
                     
        );
    });


    return (
    <div>
        {
        sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== 'null' ?
        <div className = {styles.CreateCommentContainer}>
            <textarea onChange = {commentChangeHandler}></textarea>
            <button onClick = {submitComment}>Submit Comment</button>
            <sub>{statusMessage}</sub>
        </div>: 
        <div className = {styles.CreateCommentContainer}>
            <p>Login First To Comment</p>
        </div>}
        {myComments}      
    </div>);
}

export default CommentsSection;