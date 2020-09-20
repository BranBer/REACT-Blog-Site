import React, {useState, useEffect, useContext} from 'react';
import styles from './SelectedByYouPost.module.scss';
import axios from 'axios';
import CommentsSection from '../Comments/CommentsSection';
import {useHistory} from 'react-router-dom';
import { GeneralContext } from '../GeneralContext';

const SelectedByYouPost = (props) =>
{
    const id = props.match.params.id;
    const [ByYouPostData, UpdateByYouPostData] = useState(null);
    const [hasLiked, updateHasLiked] = useState({color: 'white'});

    let history = useHistory();

    let myContext = useContext(GeneralContext);

    /*
    Allows a user to like a post once if they are logged in
    */
   const likePost = () =>
   {
       let token = sessionStorage.getItem('token');

       if(token !== null && token !== 'null' && ByYouPostData.data !== null)
       {
           let url = myContext.value.url + '/posts/like/';

           let body = new FormData();
           body.append('id', ByYouPostData[0].id);

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

   const getPostData = () =>
   {
        let url = myContext.value.url + '/posts/' + id + '/';
        let token = sessionStorage.getItem('token');
            
        axios.get(url)
        .then(response => {
                let data = response.data;
                let date = new Date(data['date']);
                
                data['date'] = date.toLocaleString();
                
                UpdateByYouPostData(data);

                let url = myContext.value.url + '/posts/UserHasLiked/';
                console.log(ByYouPostData);
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
                        console.log(response.data);
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

    useEffect(() =>
    {
        getPostData();    
    }, []);

    return (
        <div className = {styles.SelectedByYouParent}>
            {ByYouPostData !== null?
            <div className = {styles.SelectedByYouContainer}>
                <div className = {styles.SelectedByYouContent}>
                    <h2>{ByYouPostData[0].post_title}</h2>
                    <sub><span className = {styles.Like} style = {hasLiked} onClick = {likePost}>❤</span> {ByYouPostData[0].likes} </sub>
                    <hr/>
                    <p>{ByYouPostData[0].post_content}</p>
                    <br/>
                    <sub>{ByYouPostData[0].author}</sub>
                    <br/>
                    <sub>{(new Date(ByYouPostData[0].date)).toLocaleString()}</sub>
                </div>

            </div>
            :
            <p>'Something Went Wrong Here...'</p>}

            <br/>
            <button className = {styles.GoBackButton}
                    onClick = {() => history.goBack()}>
                        ⬅ Go Back
            </button>


            {
                ByYouPostData !== null?
                <div className = {styles.CommentsSectionContainer}>
                    <h2>Comments</h2>
                    <CommentsSection post_id = {id}/>
                </div>
                :null
            }
        </div>);
}

export default SelectedByYouPost;