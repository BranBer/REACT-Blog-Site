import React, {useState, useEffect} from 'react';
import styles from './SelectedByYouPost.module.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const SelectedByYouPost = (props) =>
{
    const id = props.match.params.id;
    const [ByYouPostData, UpdateByYouPostData] = useState(null);
    let history = useHistory();

    useEffect(() =>
    {
        let mounted = true;
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/' + id + '/'
        
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
        <div className = {styles.SelectedByYouContainer}>
            {ByYouPostData !== null?
            <div >
                <h2>{ByYouPostData[0].post_title}</h2>
                <hr/>
                <p>{ByYouPostData[0].post_content}</p>
                <br/>
                <sub>{ByYouPostData[0].author}</sub>
                <br/>
                <sub>{(new Date(ByYouPostData[0].date)).toLocaleString()}</sub>

            </div>
            :
            <p>'Something Went Wrong Here...'</p>}

            <br/>
            <button onClick = {() => history.goBack()}>⬅ Go Back</button>
        </div>);
}

export default SelectedByYouPost;