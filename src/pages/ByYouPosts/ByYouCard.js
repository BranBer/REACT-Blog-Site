import React, {useState} from 'react';
import styles from './ByYouPosts.module.scss';
import axios from 'axios';

const ByYouCard = (props) =>
{
    const [showPost, updateShowPost] = useState(true);
    const [visible, UpdateVisibility] = useState(props.visibility.toString().toLowerCase() == 'true'? true: false)

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

    const visibilityHander = () =>
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
                UpdateVisibility(!visible);
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
            {showPost?
            <div className = {styles.ByYouCard}>
                <div className = {styles.ByYouContent}>
                    <h2>{props.title}</h2>
                    <sub>{props.author}</sub>
                    <br/>
                    <sub>{props.date}</sub>
                    <hr/>
                    <p>
                        {props.content}
                    </p>
                </div>
    
                <div className = {styles.PostOptions}>
                    <button onClick = {visibilityHander} 
                            className = {!visible?styles.makeVisibleButton:styles.makeInvisibleButton}>Make Visible</button>
                    <button onClick = {deleteHandler} 
                            className = {styles.deleteButton}>Delete</button>
                </div>
            </div>: null}
        </>
    )
}

export default ByYouCard;