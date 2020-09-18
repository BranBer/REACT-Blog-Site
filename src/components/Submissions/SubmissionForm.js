import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import AddImage from './AddImage';
import base64Stringtofile from './stringToFile';
import axios from 'axios';
import Editor from './Editor';
import styles from './SubmissionForm.module.scss'
import { GeneralContext } from '../GeneralContext';

const SubmissionForm = (props) =>
{
    const [images, updateImages] = useState({count: [1]});
    const [token, updateToken] = useState(sessionStorage.getItem('token'));
    const [postData, updatePostData] = useState({
        post_title: null,
        author: null,
        date: null
    });

    let myContext = useContext(GeneralContext);

    useEffect(() =>
    {
        updateToken(sessionStorage.getItem('token'));
    });

    const addAnotherImage = () =>
    {
       // let data = postData;

        let numbers = images.count;
        numbers.push(numbers[numbers.length - 1] + 1);

        updateImages({count: numbers});
    }

    
    const updateNewImage = (id, img) =>
    {
        let data = postData;
        let key = 'image' + id.toString();
        let today = Date.now().toString();
        let nonceString = Math.random().toString(36).substring(2, 7);
        let filename = key + today + nonceString + '.' + img.fileExtension;        

        console.log(filename);

        const croppedImageFile = base64Stringtofile(img.img, filename);
        data[key] = croppedImageFile;

        updatePostData(data);
    }

    const removeImage = (id) =>
    {
        let key = 'image' + id.toString();
        let data = postData;
        
        console.log(key);
        console.log('before');
        console.log(data);
        data[key] = undefined;

        console.log('after');
        console.log(data);
        updatePostData(data);
    }

    const updateTitle = (event) =>
    {   
        let data = postData;
        data['post_title'] = event.target.value;

        updatePostData(data);
    }

    const updateAuthor = (event) =>
    {   
        let data = postData;
        data['author'] = event.target.value;

        updatePostData(data);
    }

    const updateContent = (value) =>
    {   
        let data = postData;
        console.log(data);
        
        data['post_content'] = value;

        updatePostData(data);
    }

    const uploadContent = () =>
    {
        let data = postData;

        let url = myContext.value.url + '/create/';

        let form_data = new FormData();
        let dataEntries = Object.entries(data);
        let config = {
            headers : {
            'Content-Type': 'multipart/form-data'
            }
        }

        for (let v in dataEntries)
        {
            //console.log(dataEntries[v]);
            let key = dataEntries[v][0];
            let value = dataEntries[v][1];

            if(key.substring(0,5) == 'image' && value !== undefined)
            {                
                form_data.append(key, value, value.name);
            }
            else if(value !== undefined)
            {
                form_data.append(key, value);
            }
        }
        
        if(token !== null)
        {
            const authToken = 'Token ' + token.toString();
            config = {
                headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization': authToken
                }
            };
        
            axios.post(
                url,
                form_data,
                config
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch(err => console.log(err));
        }
        else
        {
            console.log("You must be logged in first!")
        }        
    }


    return (
        <div className = {styles.submission}>
            <div>
                <form method = {'POST'} id = "post_maker">
                    <label className = {styles.inputLabel}>Title</label>
                    <input type = "text" placeholder = "Post Title" id = "post_title" onChange = {(event) => updateTitle(event)}/>
    
                    <label className = {styles.inputLabel}>Author</label>
                    <input type = "text" placeholder = "Post Author" id = "post_author" onChange = {(event) => updateAuthor(event)}/>
    
    
                    {
                        images.count.map((number, index) => 
                        {
                            return (<AddImage key = {"AddImage" + index.toString()} 
                                              ieid = {"ie" + number.toString()} 
                                              imageUpdater = {updateNewImage}
                                              removeImage = {removeImage}/>);
                        })
                    }

                    <button className = {styles.addAnotherImage} type = "button" onClick = {() => addAnotherImage()}>+Image</button>
    
                    <div className = {styles.editor}>
                        <Editor updateContent = {updateContent}/>    
                    </div>                         
    
                    <button type = "button" id = {styles.submitButton} onClick = {uploadContent}>Submit Post</button>
                </form>
            </div>
        </div>);
}

export default SubmissionForm;
