import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ByYouCard from './ByYouCard';
import styles from './ByYouPosts.module.scss';

const BlogPostByYouManager = (props) =>
{
    const postsPerPage = 4;

    const [postData, updatePosts] = useState({
        position: 0,
        posts: {}});

    useEffect(() => {
        let mounted = true;

        const token = sessionStorage.getItem('token');

        if(token !== null)
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/ByYou/'+ postData.position + '/' + postsPerPage + '/';
            axios.post(url, {isVisible: 'False'})
            .then((response) => {
                if(mounted)
                {
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
        myPostData.position += postsPerPage;
        updatePosts(myPostData);

        const prevData = postData.posts;

        let token = sessionStorage.getItem('token');

        if(token !== null)
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/ByYou/'+ postData.position + '/' + postsPerPage + '/';
            axios.post(url, {isVisible: 'False'})
            .then((response) => {
                let newPos = postData.position;

                if(JSON.stringify(response.data) == JSON.stringify(prevData))
                {
                    newPos -= postsPerPage;
                }


                updatePosts(
                {
                    position: newPos,
                    posts: response.data
                });       

                console.log(response.data);
            })
            .catch((error) =>
            {
                console.log('Out of bounds');       
            });
        }
    }
    
    const getPrevPosts = () =>
    {
        let myPostData = postData;
        myPostData.position = myPostData.position - 4 > 0? myPostData.position - 4: 0;
        updatePosts(myPostData);

        let token = sessionStorage.getItem('token');

        if(token !== null && token !== 'null')
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/ByYou/'+ postData.position + '/' + postsPerPage + '/';
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
                console.log('Out of bounds');       
            });
        }
    }

    let posts = Object.entries(postData.posts).map(
        (object, index) =>
        {
            let key = 'byYou' + object[1]['id'].toString();
            return (<ByYouCard key = {key}
                               id = {object[1]['id']}
                               author = {object[1]['author']}
                               date = {object[1]['date']}
                               content = {object[1]['post_content']}
                               title = {object[1]['post_title']}
                               visibility = {object[1]['isVisible']}/>);
        }
    );
    
    return (
    <div className = {styles.ByYouPanel}>
        <div className = {styles.PostCycler}>
            <button onClick = {getPrevPosts}>◀ </button>
            <h2>Posts By Viewers</h2>
            <button onClick = {getNextPosts}>▶</button>
        </div>

        {posts}
        
    </div>);
}

export default BlogPostByYouManager;
