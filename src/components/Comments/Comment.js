import React, {useState, useEffect} from 'react';
import styles from './CommentsSection.module.scss';
import axios from 'axios';

const Comment = (props) =>
{
    
    let replies = null;
    let [showComment, updateShowComment] = useState(false);
    let [netScore, updateNetScore] = useState(props.votes);

    let [showReply, updateShowReply] = useState(false);
    let [reply, updateReply] = useState('');

    if(props.replies !== [])
    {
        replies = props.replies.map((object, index) =>
        {
            let newReplyLength = props.replies.length - 1;
            return (
                    <Comment key = {'comment' + object.id.toString()}
                             comment_id = {object.id}
                             comment = {object.comment} 
                             author = {object.display_name}
                             date = {object.date_posted}
                             votes = {object.net_votes}
                             reloadComments = {props.reloadComments}
                             replies = {object.reply}
                             replyLength = {newReplyLength}/>
            );
        });
    }

    //Get the current comment's vote count
    /*
    As processed by the backend, a vote_type of True is an upvote;
    A vote_type of False is a downvote.
    */
    const vote = (vote_type) =>
    {
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/comments/vote/';
        let token = sessionStorage.getItem('token')
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token
            }
        };

        let form_data = new FormData();
        form_data.append('id', props.comment_id);
        form_data.append('vote_type', vote_type);

        if(token !== null)
        {
            axios.post(url, form_data, config)
            .then( 
                response =>
                {
                    console.log("Successfully Voted");
                    updateNetScore(response.data.net_votes);
                })
            .catch(
                err =>
                {
                    console.log(err.response.data);
                }
            )
        }
        else
        {
            console.log("You must log in first to vote");
        }
    }

    const submitReply = () =>
    {
        let token = sessionStorage.getItem('token');

        if(reply !== '' && (token !== null && token !== 'null'))
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/create/comment/';
            
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + token
                }
            };

            let form_data = new FormData();
            form_data.append('comment', reply);
            form_data.append('comment_id', props.comment_id);

            axios.post(url, form_data, config)
            .then(
                response =>
                {
                    console.log("Successfully replied to comment " + props.comment_id);
                    updateShowReply(false);
                    props.reloadComments();
                }
            )
            .catch(                
                err =>
                {
                    console.error("Something went wrong.");
                }                
            );
        }
    }

    const updateReplyHandler = (event) =>
    {
        updateReply(event.target.value);
    }
    
    return(
    <div className = {styles.CommentContainer}>
        <div className = {styles.CommentContent}>
            <div className = {styles.CommentHeaderContainer}>
                <div style = {{display: 'flex',
                               flexDirection: 'row',
                               alignItems: 'center'}}>

                    <span>{netScore}</span>
                    <div className = {styles.Voting}>
                        <button onClick = {(vote_type) => vote('True')}>▲</button>
                        <button onClick = {(vote_type) => vote('False')}>▼</button>
                    </div>

                    <div className = {styles.CommentHeader}> 
                        <sub>{props.author}</sub>
                            <br/>
                        <sub>{new Date(props.date).toLocaleString()}</sub>
                    </div>
                </div>

                {replies.length > 0?
                <button onClick = {() => {updateShowComment(!showComment)}}>{showComment?'-':'+'}</button>
                :null}
                
            </div>
            
            <p>
                {props.comment}
            </p>
        </div>
        
        <div className = {styles.CommentOptions}>
            <ul>
                <hr/>
                <li onClick = {() => updateShowReply(!showReply)}
                    style = {showReply?{borderBottom: '4px solid darkgrey'}:{}}
                    >Reply</li>
                <hr/>
                <li>Report</li>
                <hr/>
            </ul>
        </div>

        {props.replies.length > 0? <p>{props.replyLength + 1} Replies</p>
        : props.replies.length == 1? <p>1 Reply </p> :null}

        {showReply?
                    <div className = {styles.CommentOptionForm}>
                        <textarea onChange = {updateReplyHandler}></textarea>
                        <button onClick = {submitReply}>Submit Reply</button>
                    </div>:null}

        {showComment?<div>
            {replies}
        </div>:null}
        <br/>
    </div>);
}

export default Comment;