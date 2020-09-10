import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './BlogPostManager.module.scss';
import BlogPostManageable from './BlogPostManageable';

const BlogPostManager = (props) => 
{
    const [PostData, updatePostData] = useState({data: {},
        position: 0});

        const postsPerPage = 4;

    useEffect( () => {
        let mounted = true;
        const token = sessionStorage.getItem('token');        
        
        if(token !== null)
        {
            axios.get('http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/' + PostData.position + '/'+ postsPerPage + '/')
            .then(response => {
                if(mounted)
                {
                    updatePostData({data: response.data,
                    position: PostData.position});
                }
            });
        }       
        
        return () => mounted = false;
    });

    const getNextPosts = () =>
    {
        let myPostData = PostData;
        myPostData.position += postsPerPage;
        updatePostData(myPostData);

        const prevData = PostData.data;

        let token = sessionStorage.getItem('token');
    
        if(token !== null && token !== 'null')
        {
            let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/'+ PostData.position + '/' + postsPerPage + '/';
            axios.get(url)
            .then((response) => {
                let newPos = PostData.position;
                
                console.log(response.data);

                if(JSON.stringify(response.data) == JSON.stringify(prevData))
                {
                    newPos -= postsPerPage;
                }

                updatePostData(
                {
                    position: newPos,
                    posts: response.data
                });       
                console.log(prevData);
            })
            .catch((error) =>
            {                
                console.log('Out of bounds');       
            });
        }
    }
    
    const getPrevPosts = () =>
    {
        let myPostData = PostData;
        myPostData.position = myPostData.position - 4 > 0? myPostData.position - 4: 0;
        updatePostData(myPostData);

        let token = sessionStorage.getItem('token');

        if(token !== null)
        {
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
    }

    let posts = PostData.data !== undefined?Object.entries(PostData.data).map(
        (object, index) => 
        {
            return (<BlogPostManageable key = {'manageablePost' + index.toString()}
                              title = {object[1]['post_title']}
                              author = {object[1]['author']}
                              content = {object[1]['post_content']}
                              date = {object[1]['date']}
                              images = {object[1]['images']}
                              id = {object[1]['id']}
                              isVisible = {object[1]['isVisible']}
                               />);
        }
    ): null;

    return(
    <div className = {styles.BlogPostManager}>
        <div className = {styles.PostCycler}>
            <button onClick = {getPrevPosts}>◀ </button>
            <h2>Posts By You</h2>
            <button onClick = {getNextPosts}>▶</button>
        </div>

        {posts}
    </div>)
}

export default BlogPostManager;