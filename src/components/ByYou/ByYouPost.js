import React, {useState, useEffect, useContext} from 'react';
import styles from './ByYouPost.module.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { GeneralContext } from '../GeneralContext';

const ByYouPost = (props) =>
{
    const [showPost, updateShowPost] = useState(true);
    const [likes, updateLikes] = useState(props.likes);
    const [hasLiked, updateHasLiked] = useState({color: 'white'});

    let myContext = useContext(GeneralContext);

    /*
    Check if the user has liked the post before. If they like the post, color the heart red.
    */
    const checkUserHasLiked = () => 
    {
        let token = sessionStorage.getItem('token');

        if(token !== null && token !== 'null')
        {
            let url = myContext.value.url + '/posts/UserHasLiked/';

            let body = new FormData();
            body.append('id', props.id);

            let config = {
                headers:
                {
                    Authorization: 'Token ' + token
                }
            };

            axios.post(url, body, config)
            .then(
                response =>
                {
                    if(response.data.HasLiked == true)
                    {
                        updateHasLiked({color: 'red'});
                    }
                    else
                    {
                        updateHasLiked({color: 'white'});
                    }
                }
            )
        }
    }


    /*
    Allows a user to like a post once if they are logged in
    */
    const likePost = () =>
    {
        let token = sessionStorage.getItem('token');

        if(token !== null && token !== 'null')
        {
            let url = myContext.value.url + '/posts/like/';

            let body = new FormData();
            body.append('id', props.id);

            let config = {
                headers: {
                    'Authorization': 'Token ' + token
                }
            };

            axios.post(url, body, config)
            .then(
                response =>
                {                    
                    if(response.data.Liked == true)
                    {
                        updateHasLiked({color: 'red'});
                        updateLikes(likes + 1);
                    }
                    else
                    {
                        updateHasLiked({color: 'white'});
                        updateLikes(likes - 1);
                    }
                }
            );
        }
    }

    useEffect(() =>
    {
        checkUserHasLiked();
    }, []);

    return (
        <>
            {showPost?<div className = {styles.ByYouPostContainer}>
                <h2>{props.title}</h2>
                <sub><span className = {styles.Like} style = {hasLiked} onClick = {likePost}>❤</span> {likes}</sub>
                <sub>{props.author}</sub>
                <sub>{props.date}</sub>
                <hr/>

                <div className = {styles.PostContentContainer}>
                    <p>{props.content}</p>
                </div>

                <br/>
                
                <Link to = {{
                            pathname: '/postsByYou/' + props.id,
                            }}
                  style = {{alignSelf: 'flex-end'}}>
                    <button>Continue Reading...</button>
                </Link>
            </div>: null}
        </>
    );
}

export default ByYouPost;