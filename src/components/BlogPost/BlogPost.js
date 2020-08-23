import React, {useEffect} from 'react';
import GalleryImage from '../GalleryImage/GalleryImage';
import styles from './BlogPost.module.scss';

const BlogPost = (props) =>
{
    const date = new Date(props.date);
    const formattedDate = date.toLocaleString();

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

            <button>Continue Reading...</button>
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