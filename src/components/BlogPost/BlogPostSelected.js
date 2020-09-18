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

    let history = useHistory();
    let myContext = useContext(GeneralContext);

    useEffect(()=>
    {
        let url = myContext.value.url + '/posts/' + props.match.params.id + '/';

        axios.get(url)
        .then(response => {
                let data = response.data;
                let date = new Date(data['date']);
                
                data['date'] = date.toLocaleString();

                
                UpdateSelectedPostData({data: data});
        });
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