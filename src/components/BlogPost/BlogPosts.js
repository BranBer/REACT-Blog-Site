import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GalleryImage from '../GalleryImage/GalleryImage';
import BlogPost from './BlogPost';
import styles from './BlogPosts.module.scss';
import { GeneralContext } from '../GeneralContext';
import { Link } from 'react-router-dom';

const BlogPosts = (props) =>
{    
    const postsPerPage = 4;
    const position = parseInt(props.position,10);
    let previous = position - postsPerPage < 0? 0: position - postsPerPage;
    let next = position + postsPerPage;

    let myContext = useContext(GeneralContext);

    const [PostData, updatePostData] = useState({data: {},
        position: position});

    const [outOfBounds, updateOutOfBounds] = useState(false);


    const getPostData = () => 
    {
        axios.get(myContext.value.url + '/posts/' + PostData.position + '/'+ postsPerPage + '/')
        .then(response => {
            updatePostData({data: response.data.slice(1, response.data.length),
                            position: PostData.position});

            if(response.data[0] == true)
            {
                updateOutOfBounds(true);
            }
        });
    }


    useEffect( () => { 
        getPostData();        
    }, []);


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
                <Link to =  {'/BlogPosts/' + previous}>
                    <button>◀ </button>
                </Link>
                <h2>Posts By You</h2>
                <Link to =  {outOfBounds?'/BlogPosts/' + position:'/BlogPosts/' + next}>
                    <button>▶</button>
                </Link>
        </div>

        <hr/>

       {posts}
    </div>);
}

export default BlogPosts;