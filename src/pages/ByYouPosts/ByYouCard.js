import React, {useState} from 'react';
import styles from './ByYouPosts.module.scss';
import axios from 'axios';

const ByYouCard = (props) =>
{
    const [showPost, updateShowPost] = useState(true);
    const [visible, UpdateVisibility] = useState(props.visibility.toString().toLowerCase() == 'true'? true: false)

    const deleteHandler = () =>
    {
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/delete/';
        let body = new FormData();
        body.append('id', props.id);
        let config = {headers: {'Content-Type': 'multipart/form-data'}};

        axios.post(url, body, config)
        .then(response => {
            updateShowPost(false);      
        })
        .catch(err => {
            console.log(err);
        });
    }

    const visibilityHander = () =>
    {
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/ByYou/UpdateVisibility/';
        let body = new FormData();
        body.append('id', props.id);
        let config = {headers: {'Content-Type': 'multipart/form-data'}};

        axios.post(url, body, config)
        .then(response => {  
            UpdateVisibility(!visible);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
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
        </div>
    )
}

export default ByYouCard;