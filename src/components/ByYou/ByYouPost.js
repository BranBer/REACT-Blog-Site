import React from 'react';
import styles from './ByYouPost.module.scss';

const ByYouPost = (props) =>
{
    return (
        <div className = {styles.ByYouPostContainer}>
            <h2>{props.title}</h2>
            <sub>{props.author}</sub>
            <sub>{props.date}</sub>
            <hr/>

            <div>
                <p>{props.content}</p>
            </div>
        </div>
    );
}

export default ByYouPost;