import axios from 'axios';
import React, {useState, useEffect} from 'react';
import GalleryImage from '../GalleryImage/GalleryImage';
import styles from './BlogPostSelected.module.scss';

const BlogPostSelected = (props) =>
{
    const [SelectedPostData, UpdateSelectedPostData] = useState({data: null});

    useEffect(()=>
    {
        let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/posts/' + props.match.params.id + '/';

        let mounted = true; 
        axios.get(url)
        .then(response => {
            if(mounted)
            {
                let data = response.data;
                let date = new Date(data['date']);
                
                data['date'] = date.toLocaleString();

                
                UpdateSelectedPostData({data: data});
            }
        });

        return () => mounted = false;
    });

    return (
    <div className = {styles.SelectedPostContainer}>
        {
            SelectedPostData.data !== null?
            <div className = {styles.SelectedPost}>
                <h1>{SelectedPostData.data[0].post_title}</h1>

                <div className = {styles.PostGalleryImage}>
                    <GalleryImage images = {SelectedPostData.data[0].images}/>
                </div>

                <br/>
                <div dangerouslySetInnerHTML={{__html: SelectedPostData.data[0].post_content }}/>       
                <hr/>
                <sub>{SelectedPostData.data[0].author}</sub>
                <br/>
                <sub>{(new Date(SelectedPostData.data[0].date)).toLocaleString()}</sub>
            </div>
            : <p>Not Loaded</p>
        }
    </div>);
}

export default BlogPostSelected;