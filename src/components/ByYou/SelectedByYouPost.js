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
    let history = useHistory();

    let myContext = useContext(GeneralContext);

    useEffect(() =>
    {
        let mounted = true;
        let url = myContext.value.url + '/posts/' + id + '/'
        
        axios.get(url)
        .then(response => {
            if(mounted)
            {
                let data = response.data;
                let date = new Date(data['date']);
                
                data['date'] = date.toLocaleString();
                
                UpdateByYouPostData(data);
            }
        });
    
        return () => mounted = false;
    });

    return (
        <div className = {styles.SelectedByYouParent}>
            {ByYouPostData !== null?
            <div className = {styles.SelectedByYouContainer}>
                <div className = {styles.SelectedByYouContent}>
                    <h2>{ByYouPostData[0].post_title}</h2>
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