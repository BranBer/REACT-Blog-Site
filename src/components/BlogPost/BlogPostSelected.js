import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import GalleryImage from '../GalleryImage/GalleryImage';
import styles from './BlogPostSelected.module.scss';
import {useHistory} from 'react-router-dom';
import CommentsSection from '../Comments/CommentsSection';
import { GeneralContext } from '../GeneralContext';

const BlogPostSelected = (props) =>
{
    const [SelectedPostData, UpdateSelectedPostData] = useState({data: null});
    const [hasLiked, updateHasLiked] = useState({color: 'white'});

    let history = useHistory();
    let myContext = useContext(GeneralContext);


    const getPostData = () =>
    {
        let url = myContext.value.url + '/posts/' + props.match.params.id + '/';
        let token = sessionStorage.getItem('token');

        axios.get(url)
        .then(response => {
                let data = response.data;
                let date = new Date(data['date']);
                
                data['date'] = date.toLocaleString();
                
                UpdateSelectedPostData({data: data});

                let url = myContext.value.url + '/posts/UserHasLiked/';

                let body = new FormData();
                body.append('id', response.data[0].id);

                let config = {
                    headers:
                    {
                        Authorization: 'Token ' + token
                    }
                };

                axios.post(url, body, config)
                .then(
                    response =>
                    {
                        if(response.data.HasLiked == true)
                        {
                            updateHasLiked({color: 'red'});
                        }
                        else
                        {
                            updateHasLiked({color: 'white'});
                        }
                    }
                )
        });
    }

    /*
    Allows a user to like a post once if they are logged in
    */
   const likePost = () =>
   {
       let token = sessionStorage.getItem('token');

       if(token !== null && token !== 'null' && SelectedPostData.data !== null)
       {
           let url = myContext.value.url + '/posts/like/';

           let body = new FormData();
           body.append('id', SelectedPostData.data[0].id);

           let config = {
               headers: {
                   'Authorization': 'Token ' + token
               }
           };

           axios.post(url, body, config)
           .then(
               response =>
               {                    
                   if(response.data.Liked == true)
                   {
                       updateHasLiked({color: 'red'});
                   }
                   else
                   {
                       updateHasLiked({color: 'white'});
                   }
                   getPostData();
               }
           );
       }
   }

    useEffect(()=>
    {
        getPostData();
    }, []);

    return (
    <div className = {styles.SelectedPostParent}>
        <div className = {styles.SelectedPostContainer}>
            {
                SelectedPostData.data !== null?
                <>
                    <div className = {styles.SelectedPost}>
                        <h1>{SelectedPostData.data[0].post_title}</h1>

                        {SelectedPostData.data[0].images.length > 0?
                        <div className = {styles.PostGalleryImage}>
                            <GalleryImage images = {SelectedPostData.data[0].images}/>
                        </div>: null
                        }

                        <br/>
                        
                        <sub><span className = {styles.Like} style = {hasLiked} onClick = {likePost}>❤</span> {SelectedPostData.data[0].likes} </sub>

                        <br/>
                        <div dangerouslySetInnerHTML={{__html: SelectedPostData.data[0].post_content }}/>       
                        <hr/>
                        <br/>
                        <sub>{SelectedPostData.data[0].author}</sub>
                        <sub>{(new Date(SelectedPostData.data[0].date)).toLocaleString()}</sub>
                        <br/>
                    </div>
                </>
                : <p>Not Loaded</p>
            }
            
            <button onClick = {() => history.goBack()}>⬅ Go Back</button>
        </div>
        
        {
            SelectedPostData.data !== null?
            <div className = {styles.CommentsSectionContainer}>
                <h2>Comments</h2>
                <CommentsSection post_id = {SelectedPostData.data[0].id}
                />
            </div>
            :null
        }
    </div>
    );
}

export default BlogPostSelected;