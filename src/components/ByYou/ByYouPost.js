import React, {useState} from 'react';
import styles from './ByYouPost.module.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';

const ByYouPost = (props) =>
{
    const [showPost, updateShowPost] = useState(true);

    return (
        <>
            {showPost?<div className = {styles.ByYouPostContainer}>
                <h2>{props.title}</h2>
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