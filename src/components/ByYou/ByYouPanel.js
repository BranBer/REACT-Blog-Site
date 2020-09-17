import React, {useState, useEffect, useContext} from 'react';
import styles from './ByYouPanel.module.scss';
import ByYouPost from './ByYouPost';
import axios from 'axios';
import { GeneralContext } from '../GeneralContext';

const ByYouPanel = () =>
{
    const postsPerPage = 4;

    const [PostData, updatePostData] = useState({
        posts: {},
        position: 0
    });

    let myContext = useContext(GeneralContext);

    useEffect(()=>
    {
        let url = myContext.value.url + '/posts/ByYou/' + PostData.position + '/' + postsPerPage + '/';
        let mounted = true;


        axios.get(url)
        .then(
            response =>
            {
                if(mounted)
                {
                    updatePostData({
                    posts: response.data,
                    position: PostData.position
                    });
                }
            }
        )
        .catch(err =>
            {
                console.log('Something went wrong');
            });

        return () => mounted = false;
    });

    const getNextPosts = () =>
    {
        let myPostData = PostData;
        myPostData.position += postsPerPage;
        updatePostData(myPostData);

        const prevData = PostData.posts;

        let token = sessionStorage.getItem('token');
    
        if(token !== null)
        {
            let url = myContext.value.url + '/posts/ByYou/'+ PostData.position + '/' + postsPerPage + '/';
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
    }
    
    const getPrevPosts = () =>
    {
        let myPostData = PostData;
        myPostData.position = myPostData.position - 4 > 0? myPostData.position - 4: 0;
        updatePostData(myPostData);

        let token = sessionStorage.getItem('token');

        if(token !== null)
        {
            let url = myContext.value.url + '/posts/ByYou/'+ PostData.position + '/' + postsPerPage + '/';
            axios.get(url, {})
            .then((response) => {
                let myPosts = PostData;
                myPosts.posts = response.data;
                updatePostData(
                {
                    position: PostData.position,
                    posts: response.data
                });       
            })
            .catch((error) =>
            {
                console.log('Out of bounds');       
            });
        }
    }

    const posts = Object.entries(PostData.posts).map((object, index) => 
    {
        let key = 'byYouPpst' + object[1]['id'].toString();
        return (
        <ByYouPost  key = {key}
                    id = {object[1]['id']}
                    author = {object[1]['author']}
                    date = {object[1]['date']}
                    content = {object[1]['post_content']}
                    title = {object[1]['post_title']}
                    visibility = {object[1]['isVisible']}/>);
    });

    return (
    <div className = {styles.byYouPanelContainer}>
        <div>
            <div className = {styles.PostCycler}>
                <button onClick = {getPrevPosts}>◀ </button>
                <h2>Posts By You</h2>
                <button onClick = {getNextPosts}>▶</button>
            </div>
        </div>

        {posts}
    </div>);
}

export default ByYouPanel;