import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ByYouCard from './ByYouCard';
import styles from './ByYouPosts.module.scss';

const BlogPostManager = (props) =>
{
    const [postData, updatePosts] = useState({
        position: 0,
        posts: {}});

    useEffect(() => {
        let mounted = true;

            let token = sessionStorage.getItem('token');

            if(token !== null)
            {
                let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/ByYou/'+ postData.position + '/' + (postData.position + 1) + '/';
                axios.post(url, {isVisible: 'False'})
                .then((response) => {
                    if(mounted)
                    {
                        let myPosts = postData;
                        myPosts.posts = response.data;
                        updatePosts(
                        {
                            position: postData.position,
                            posts: response.data
                        });
                    }
                })
            }

        return () => mounted = false;
    });

    const getNextPosts = () =>
    {
        let myPostData = postData;
        myPostData.position += 1;
        updatePosts(myPostData);

        let token = sessionStorage.getItem('token');

        if(token !== null)
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/ByYou/'+ postData.position + '/' + (postData.position + 1) + '/';
            axios.post(url, {isVisible: 'False'})
            .then((response) => {
                let myPosts = postData;
                myPosts.posts = response.data;
                updatePosts(
                {
                    position: postData.position,
                    posts: response.data
                });       

                console.log(postData);
            })
            .catch((error) =>
            {
                
                let myPosts = postData;
                let newPosition = myPosts.position - 1;
                myPosts.position = newPosition;
                updatePosts(myPosts);

                console.log('Out of bounds');       
            });
        }
    }
    
    const getPrevPosts = () =>
    {
        let myPostData = postData;
        myPostData.position -= 1;
        updatePosts(myPostData);

        let token = sessionStorage.getItem('token');

        if(token !== null)
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/ByYou/'+ postData.position + '/' + (postData.position + 1) + '/';
            axios.post(url, {isVisible: 'False'})
            .then((response) => {
                let myPosts = postData;
                myPosts.posts = response.data;
                updatePosts(
                {
                    position: postData.position,
                    posts: response.data
                });       

                console.log(postData);
            })
            .catch((error) =>
            {
                
                let myPosts = postData;
                let newPosition = myPosts.position + 1;
                myPosts.position = newPosition;
                updatePosts(myPosts);

                console.log('Out of bounds');       
            });
        }
    }

    let posts = Object.entries(postData.posts).map(
        (object, index) =>
        {
            let key = 'byYou' + object[1]['id'].toString();
            return (<ByYouCard key = {key}
                               author = {object[1]['author']}
                               date = {object[1]['date']}
                               content = {object[1]['post_content']}
                               title = {object[1]['post_title']} />);
        }
    );
    
    return (
    <div className = {styles.ByYouPanel}>
        <div className = {styles.PostCycler}>
            <button>|◀ </button>
            <button onClick = {getPrevPosts}>◀ </button>
            <button onClick = {getNextPosts}>▶</button>
            <button>▶|</button>
        </div>

        {posts}
        
    </div>);
}

export default BlogPostManager;
