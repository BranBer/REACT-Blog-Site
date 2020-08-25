import React, {useState, useContext} from 'react';
import GalleryImage from '../GalleryImage/GalleryImage';
import styles from './BlogPost.module.scss';

import {Link} from 'react-router-dom';
import { SelectedPostContext } from './SelectedPostContext';

const BlogPost = (props) =>
{
    const date = new Date(props.date);
    const formattedDate = date.toLocaleString();
    const PostContext = useContext(SelectedPostContext);
    const ToUrl = props.title + date.toString();

    // useEffect(() => {
    //     console.log(props);
    // });

    return (
        <div className = {styles.BlogPostContainer}>            
            <h1>{props.title}</h1>
            <div className = {styles.BlogPost}>
                <div className = {styles.PostHeader}>
                    <img src = {'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/media/' + props.images[0]}/>
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

/*

        <div className = {styles.BlogPost}>
            <h3>{props.title}</h3>
            <sub>{props.author}</sub>
            <sub>{props.date}</sub>
            <hr/>
            <div dangerouslySetInnerHTML = {{__html: props.content }}/>
            <GalleryImage images = {props.images}/>  
        </div>
*/


export default BlogPost;