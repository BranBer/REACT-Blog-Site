import React, {useState, useEffect, useContext} from 'react';
import styles from './ByYouPanel.module.scss';
import ByYouPost from './ByYouPost';
import axios from 'axios';
import { GeneralContext } from '../GeneralContext';
import { Link, Redirect } from 'react-router-dom';

const ByYouPanel = (props) =>
{
    const postsPerPage = 4;
    const position = parseInt(props.match.params.position,10);
    let previous = position - postsPerPage < 0? 0: position - postsPerPage;
    let next = position + postsPerPage;

    const [outOfBounds, updateOutOfBounds] = useState(false);

    const [PostData, updatePostData] = useState({
        posts: {},
        position: position
    });

    let myContext = useContext(GeneralContext);

    const getPostData = () =>
    {
        let url = myContext.value.url + '/posts/ByYou/' + PostData.position + '/' + postsPerPage + '/';

        axios.get(url)
        .then(
            response =>
            {
                updatePostData({
                posts: response.data.slice(1, response.data.length),
                position: PostData.position
                }); 

                if(response.data[0] == true)
                {
                    updateOutOfBounds(true);
                }
            }
        )
        .catch(err =>
            {
                console.log('Something went wrong');
            });
    }

    useEffect(()=>
    {
        getPostData();
    }, []);

    const posts = Object.entries(PostData.posts).map((object, index) => 
    {
        let key = 'byYouPpst' + object[1]['id'].toString();
        return (
        <ByYouPost  key = {key}
                    id = {object[1]['id']}
                    author = {object[1]['author']}
                    date = {object[1]['date']}
                    likes = {object[1]['likes']}
                    content = {object[1]['post_content']}
                    title = {object[1]['post_title']}
                    visibility = {object[1]['isVisible']}/>);
    });

    return (
    <div className = {styles.byYouPanelContainer}>
        <div>
            <div className = {styles.PostCycler}>
                <Link to =  {'/BlogPostsByYou/' + previous}>
                    <button>◀ </button>
                </Link>
                <h2>Posts By You</h2>
                <Link to =  {outOfBounds?'/BlogPostsByYou/' + position:'/BlogPostsByYou/' + next}>
                    <button>▶</button>
                </Link>
            </div>
        </div>

        {posts}
    </div>);
}

export default ByYouPanel;