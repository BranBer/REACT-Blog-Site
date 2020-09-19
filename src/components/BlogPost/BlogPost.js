import React, {useState, useContext} from 'react';
import GalleryImage from '../GalleryImage/GalleryImage';
import styles from './BlogPost.module.scss';
import axios from 'axios';

import {Link} from 'react-router-dom';
import { SelectedPostContext } from './SelectedPostContext';
import { GeneralContext } from '../GeneralContext';

const BlogPost = (props) =>
{
    const date = new Date(props.date);
    const formattedDate = date.toLocaleString();
    const myContext = useContext(GeneralContext);
    const PostContext = useContext(SelectedPostContext);
    const ToUrl = props.title + date.toString();

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
                    'Authorization': 'Token ' + url
                }
            };

            axios.post(url, body, url)
            .then(
                response =>
                {

                }
            )
            .catch(
                err =>
                {
                    
                }
            );
        }
    }


    //console.log(img);

    // useEffect(() => {
    // }, []);

    return (
        <div className = {styles.BlogPostContainer}>            
            <h1>{props.title}</h1>
            <div className = {styles.BlogPost}>
                <div className = {styles.PostHeader}>
                    {props.images[0] !== undefined?<img src = {myContext.value.url + '/media/' + props.images[0]}/>:null}
                    <sub>{props.author}</sub>
                    <br/>
                    <sub>{formattedDate}</sub>
                    <br/>
                    <sub><span className = {styles.Like}>❤</span> {props.likes}</sub>
                    <br/>
                    <sub><span className = {styles.View}>👁</span>{props.views}</sub>
                </div>
    
                <div className = {styles.PostContentContainer}>                
                    
                    <div className = {styles.PostContent} dangerouslySetInnerHTML = {{__html: props.content }}/>
                    
                </div>
            </div>

            <Link to = {'/post/' + props.id}
                  style = {{alignSelf: 'flex-end'}}
                  onClick = {(newPost) => PostContext.UpdatePost({ToUrl, ...props})}>
                <button>Continue Reading...</button>
            </Link>
        </div>
    );
}


export default BlogPost;