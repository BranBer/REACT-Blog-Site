import React, {useState, useContext} from 'react';
import GalleryImage from '../GalleryImage/GalleryImage';
import styles from './BlogPost.module.scss';

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