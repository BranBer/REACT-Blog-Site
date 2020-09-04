import React, {useState} from 'react';
import styles from './CommentsSection.module.scss';


const Comment = (props) =>
{
    
    let replies = null;

    if(props.replies !== [])
    {
        replies = props.replies.map((object, index) =>
        {
            return (
                    <Comment key = {'comment' + object.id.toString()}
                             comment = {object.comment} 
                             author = {object.username}
                             date = {object.date_posted}
                             replies = {object.reply}/>
            );
        });
    }


    return(
    <div className = {styles.CommentContainer}>
        <div className = {styles.CommentContent}>
            <div className = {styles.CommentHeader}>
                <sub>{props.author}</sub>
                    <br/>
                <sub>{new Date(props.date).toLocaleString()}</sub>
            </div>
            
            <p>
                {props.comment}
            </p>
            

        </div>

        <div>
            {replies}
        </div>
        <br/>
    </div>);
}

export default Comment;