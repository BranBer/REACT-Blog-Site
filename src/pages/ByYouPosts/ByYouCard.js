import React, {useState, useContext, useEffect} from 'react';
import styles from './ByYouPosts.module.scss';
import axios from 'axios';
import { GeneralContext } from '../../components/GeneralContext';

const ByYouCard = (props) =>
{
    let visibilityStatus = props.visibility;

    const [showPost, updateShowPost] = useState(true);
    const [visible, UpdateVisibility] = useState(visibilityStatus == 'true' || visibilityStatus == true? true: false)

    let myContext = useContext(GeneralContext);
    let myUrl = myContext.value.url;

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
    }

    useEffect(()=>
    {
        UpdateVisibility(visibilityStatus == 'true' || visibilityStatus == true? true: false);
    }, []);

    const visibilityHander = () =>
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
                UpdateVisibility(!visible);
            }
            else
            {
                console.log("You are not logged in...How did you get here...?");
            }  
        })
    }

    return (
        <>
            {showPost?
            <div className = {styles.ByYouCard}>
                <div className = {styles.ByYouContent}>
                    <div className = {styles.ByYouHeader}>
                        <h2>{props.title}</h2>
                        <sub>{props.author}</sub>
                        <sub>{props.date}</sub>
                    </div>
                    <div className = {styles.PostOptions}>
                        <button onClick = {visibilityHander} 
                                className = {visible?styles.makeVisibleButton:styles.makeInvisibleButton}>{visible?'Hide':'Show'}</button>
                        <button onClick = {deleteHandler} 
                                className = {styles.deleteButton}>Delete</button>
                    </div>
                </div>

                <p>
                    {props.content}
                </p>
    

            </div>: null}
        </>
    )
}

export default ByYouCard;