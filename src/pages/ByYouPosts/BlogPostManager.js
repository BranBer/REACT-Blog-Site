import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import styles from './BlogPostManager.module.scss';
import BlogPostManageable from './BlogPostManageable';
import { GeneralContext } from '../../components/GeneralContext';

const BlogPostManager = (props) => 
{
    const [PostData, updatePostData] = useState({data: {},
        position: 0});

    const postsPerPage = 4;

    let myContext = useContext(GeneralContext);
    let myUrl = myContext.value.url;

    useEffect( () => {
        const token = sessionStorage.getItem('token');        
        
        if(token !== null)
        {
            axios.get(myUrl + '/posts/' + PostData.position + '/'+ postsPerPage + '/')
            .then(response => {
                updatePostData({data: response.data,
                position: PostData.position});      
            });
        }
        
    }, []);

    const getNextPosts = () =>
    {
        let myPostData = PostData;
        myPostData.position += postsPerPage;
        updatePostData(myPostData);

        const prevData = PostData.data;

        let token = sessionStorage.getItem('token');
    
        if(token !== null && token !== 'null')
        {
            let url = myUrl + '/posts/'+ PostData.position + '/' + postsPerPage + '/';
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
                    data: response.data
                });       

                

                console.log(response.data);
            })
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
            let url = myUrl + '/posts/'+ PostData.position + '/' + postsPerPage + '/';
            axios.get(url, {})
            .then((response) => {
                let myPosts = PostData;
                myPosts.posts = response.data;
                updatePostData(
                {
                    position: PostData.position,
                    data: response.data
                });       

            })
        }
    }

    let posts = PostData.data !== undefined?Object.entries(PostData.data).slice(1,PostData.data.length).map(
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