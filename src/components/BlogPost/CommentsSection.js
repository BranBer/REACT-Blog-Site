import React, {useState, useEffect} from 'react';
import styles from './CommentsSection.module.scss';
import axios from 'axios';

const CommentsSection = (props) =>{
    const [comments, updateComments] = useState([]);

    useEffect(() => 
    {
        let mounted = true;

        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/comments/' + props.post_id + '/';
        
        axios.get(url)
        .then(response =>{
            if(mounted)
            {
                updateComments([...response.data]);
            }
        })
        .catch(err => {
            console.log("Something went wrong");
        });

        return () => mounted = false;
    });

    return (
    <div>

    </div>);
}

export default CommentsSection;