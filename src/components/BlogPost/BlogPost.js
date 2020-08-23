import React, {useEffect} from 'react';
import GalleryImage from '../GalleryImage/GalleryImage';
import styles from './BlogPost.module.scss';

const BlogPost = (props) =>
{


    return (
        <div className = {styles.BlogPost}>
            <img src = {'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/media/' + props.images[0]}/>  

            
            <div className = {styles.Post}>
                <h3>{props.title}</h3>
                <sub>{props.author}</sub>
                <br/>
                <sub>{props.date}</sub>
            </div>

            <div className = {styles.PostContent} dangerouslySetInnerHTML = {{__html: props.content }}/>
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