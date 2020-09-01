import React, {useState, useEffect} from 'react';
import styles from './ByYouPanel.module.scss';
import ByYouPost from './ByYouPost';
import axios from 'axios';

const ByYouPanel = () =>
{
    const postsPerPage = 4;

    const [postData, updatePostData] = useState({
        posts: [],
        position: 0
    });

    useEffect(()=>
    {
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/ByYou/' + postData.position + '/' + postsPerPage + '/';

        axios.get(url)
        .then(
            response =>
            {
                updatePostData({
                    posts: response.data,
                    position: postData.position
                });
            }
        )
        .catch(err =>
            {
                console.log('Something went wrong');
            });
    });

    return (
    <div className = {styles.byYouPanelContainer}>
        <div>
            <h2>Posts By You</h2>
        </div>
    </div>);
}

export default ByYouPanel;