import Axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import ByYouCard from './ByYouCard';
import styles from './ByYouPosts.module.scss';
import { GeneralContext } from '../../components/GeneralContext';

const BlogPostByYouManager = (props) =>
{
    const postsPerPage = 4;
    let myContext = useContext(GeneralContext);
    let myUrl = myContext.value.url;

    const [postData, updatePosts] = useState({
        position: 0,
        posts: {}});

    useEffect(() => {

        const token = sessionStorage.getItem('token');

        if(token !== null)
        {
            let url = myUrl + '/posts/ByYou/All/'+ postData.position + '/' + postsPerPage + '/';
            axios.get(url)
            .then((response) => {
                    updatePosts(
                    {
                        position: postData.position,
                        posts: response.data
                    });
            
            })
        }

    }, []);

    /*
    Gets the next pages of posts. If the next pages of posts is the same as before, the page does not change
    */
    const getNextPosts = () =>
    {
        let myPostData = postData;
        myPostData.position += postsPerPage;
        updatePosts(myPostData);

        const prevData = postData.posts;

        let token = sessionStorage.getItem('token');

        if(token !== null)
        {
            let url = myUrl + '/posts/ByYou/All/'+ postData.position + '/' + postsPerPage + '/';
            axios.get(url)
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

            })
            .catch((error) =>
            {
                console.log('Out of bounds');       
            });
        }
    }
    
    /*
    Gets Previous page of posts. User cannot go below page 0
    */
    const getPrevPosts = () =>
    {
        let myPostData = postData;
        myPostData.position = myPostData.position - 4 > 0? myPostData.position - 4: 0;
        updatePosts(myPostData);

        let token = sessionStorage.getItem('token');

        if(token !== null && token !== 'null')
        {
            let url = myUrl + '/posts/ByYou/All/'+ postData.position + '/' + postsPerPage + '/';
            axios.get(url)
            .then((response) => {
                let myPosts = postData;
                myPosts.posts = response.data;

                updatePosts(
                {
                    position: postData.position,
                    posts: response.data
                });       
            })
            .catch((error) =>
            {
                console.log('Out of bounds');       
            });
        }
    }

    let posts = Object.entries(postData.posts).slice(1, postData.posts.length).map(
        (object, index) =>
        {
            //console.log(object[1]['id'] + ': ' + object[1]['isVisible']);
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
