import React, {useState, useEffect} from 'react';
import styles from './CommentsSection.module.scss';
import axios from 'axios';
import Comment from './Comment';

const CommentsSection = (props) => {
    const [comments, updateComments] = useState({});

    useEffect(() => {
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
    }, []); //Passing an array as a second parameter makes it so that useEffect is only called after the first render


    //Prepare comments for rendering
    const myComments = Object.entries(comments).map((object, index) => {       
        return (
            <Comment key = {'comment' + object[1].id.toString()}
                     comment = {object[1].comment} 
                     author = {object[1].username}
                     date = {object[1].date_posted}
                     replies = {object[1].reply}/>
        );
    });


    return (
    <div className = {styles.CommentsSectionContainer}>
        {myComments}      
    </div>);
}

export default CommentsSection;