import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GalleryImage from '../GalleryImage/GalleryImage';
import BlogPost from './BlogPost';
import styles from './BlogPosts.module.scss';
import { GeneralContext } from '../GeneralContext';

const BlogPosts = (props) =>
{
    const [PostData, updatePostData] = useState({data: {},
                                                position: 0});
    
    const postsPerPage = 4;

    let myContext = useContext(GeneralContext);

    useEffect( () => {
        let mounted = true;

        axios.get(myContext.value.url + '/posts/' + PostData.position + '/'+ postsPerPage + '/')
        .then(response => {
            
            if(mounted)
            {
                updatePostData({data: response.data,
                                position: PostData.position});
            }
        });

        return () => mounted = false;

    });

    const getNextPosts = () =>
    {
        let myPostData = PostData;
        myPostData.position += postsPerPage;
        updatePostData(myPostData);

        const prevData = PostData.data;

        let token = sessionStorage.getItem('token');
    

        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/'+ PostData.position + '/' + postsPerPage + '/';
        axios.get(url)
        .then((response) => {
            let newPos = PostData.position;
            
            if(JSON.stringify(response.data) == JSON.stringify(prevData))
            {
                newPos -= postsPerPage;
            }

            updatePostData(
            {
                position: newPos,
                posts: response.data
            });       
        })
        .catch((error) =>
        {                
            console.log('Out of bounds');       
        });
    }
    
    const getPrevPosts = () =>
    {
        let myPostData = PostData;
        myPostData.position = myPostData.position - 4 > 0? myPostData.position - 4: 0;
        updatePostData(myPostData);

        let token = sessionStorage.getItem('token');


        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/'+ PostData.position + '/' + postsPerPage + '/';
        axios.get(url, {})
        .then((response) => {
            let myPosts = PostData;
            myPosts.posts = response.data;
            updatePostData(
            {
                position: PostData.position,
                posts: response.data
            });       

            console.log(PostData);
        })
        .catch((error) =>
        {
            console.log('Out of bounds');       
        });
    }

    const posts = PostData.data !== undefined?Object.entries(PostData.data).map(
        (object, index) => 
        {
            return (<BlogPost key = {index}
                              title = {object[1]['post_title']}
                              author = {object[1]['author']}
                              likes = {object[1]['likes']}
                              views = {object[1]['views']}
                              content = {object[1]['post_content']}
                              date = {object[1]['date']}
                              images = {object[1]['images']}
                              id = {object[1]['id']}
                               />);
        }
    ):null;

    return (
    <div className = {styles.BlogPostsContainer}>
        <div className = {styles.PostCycler}>
            <button onClick = {getPrevPosts}>◀ </button>
            <h2>Posts</h2>
            <button onClick = {getNextPosts}>▶</button>
        </div>

        <hr/>

       {posts}
    </div>);
}

export default BlogPosts;