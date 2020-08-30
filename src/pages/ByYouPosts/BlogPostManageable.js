import React, {useState} from 'react';
import styles from './BlogPostManager.module.scss';

const BlogPostManageable = (props) =>
{
    return (
        <div className = {styles.BlogPostManageableFlex}> 

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
                            className = {true?styles.makeVisibleButton:styles.makeInvisibleButton}>Make Visible</button>
        
                    <button 
                            className = {styles.deleteButton}>Delete</button>
                </div>   
            </div>

            <div className = {styles.BlogPostManageableContent} >
                <div dangerouslySetInnerHTML = {{__html: props.content}}/>
            </div>
        </div>  
    );
}

export default BlogPostManageable;