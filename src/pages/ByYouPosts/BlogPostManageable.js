import React, {useState} from 'react';
import styles from './BlogPostManager.module.scss';
import axios from 'axios';

const BlogPostManageable = (props) =>
{
    const [visible, updateVisibility] = useState(props.isVisible);
    const [showPost, updateShowPost] = useState(true);

    const VisibilityHandler = () =>
    {
        const token = sessionStorage.getItem('token');
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/UpdateVisibility/';
        let body = new FormData();
        body.append('id', props.id);
        let config = {headers: {'Content-Type': 'multipart/form-data',
                                'Authorization': 'Token ' + token}};

        axios.post(url, body, config)
        .then(response => {  
            if(token !== null)
            {
                updateVisibility(!visible);
            }
            else
            {
                console.log("You are not logged in...How did you get here...?");
            }  
        })
        .catch(err => {
            console.log(err);
        });
    }

    const deleteHandler = () =>
    {
        const token = sessionStorage.getItem('token');
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/delete/';
        let body = new FormData();
        body.append('id', props.id);
        let config = {headers: {'Content-Type': 'multipart/form-data',
                                'Authorization': 'Token ' + token}};

        axios.post(url, body, config)
        .then(response => {
            if(token !== null)
            {
                updateShowPost(false);
            }
            else
            {
                console.log("You are not logged in...How did you get here...?");
            }    
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            {
                showPost?<div className = {styles.BlogPostManageableFlex}> 
        
                    <div className = {styles.BlogPostManageableContainer}>
                        <img src = {'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/media/' + props.images[0]}/>
            
                        <div className = {styles.BlogPostManageable}>
                            <h2>{props.title}</h2>
                            <sub>by {props.author}</sub>
                            <br/>
                            <sub>{props.date}</sub>
                            <hr/>
                        </div>
            
                        <div className = {styles.BlogPostManageableOptions}>
                            <button 
                                    onClick = {VisibilityHandler}
                                    className = {visible?styles.makeVisibleButton:styles.makeInvisibleButton}>{visible?'Hide':'Show'}</button>
                
                            <button 
                                    onClick = {deleteHandler}
                                    className = {styles.deleteButton}>Delete</button>
                        </div>   
                    </div>
        
                    <div className = {styles.BlogPostManageableContent} >
                        <div dangerouslySetInnerHTML = {{__html: props.content}}/>
                    </div>
            </div>: null
            }  
        </>
    );
}

export default BlogPostManageable;