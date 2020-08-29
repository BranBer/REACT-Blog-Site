import React from 'react';
import styles from './ByYouPosts.module.scss';

const ByYouCard = (props) =>
{
    return (
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
                <button className = {styles.makeVisibleButton}>Make Visible</button>
                <button className = {styles.deleteButton}>Delete</button>
            </div>
        </div>
    )
}

export default ByYouCard;