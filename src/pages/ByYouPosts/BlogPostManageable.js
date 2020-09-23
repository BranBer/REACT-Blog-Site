import React, {useState, useContext} from 'react';
import styles from './BlogPostManager.module.scss';
import axios from 'axios';
import { GeneralContext } from '../../components/GeneralContext';

const BlogPostManageable = (props) =>
{
    const [visible, updateVisibility] = useState(props.isVisible);
    const [showPost, updateShowPost] = useState(true);

    let myContext = useContext(GeneralContext);
    let myUrl = myContext.value.url;

    const VisibilityHandler = () =>
    {
        const token = sessionStorage.getItem('token');
        let url = myUrl + '/posts/UpdateVisibility/';
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
        let url = myUrl + '/posts/delete/';
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
                        {props.images[0] !== undefined?<img src = {myUrl + '/media/' + props.images[0]}/>:null}
            
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