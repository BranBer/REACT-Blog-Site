import React, {useState} from 'react';
import styled from 'styled-components';
import AddImage from './AddImage';
import base64Stringtofile from './stringToFile';
import axios from 'axios';
import extractImageFileExtensionFromBase64 from './utils';

const StyledForm = styled.div`

    position: absolute;
    display: block;

    width: 700px;
    height: auto;
    margin-left: 10%;

    top: 40%;

    background-color: #4D457A;
    z-index: 1;

    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    border: 5px solid #4D457A;

    input
    {
        display:block;
        vertical-align: top;

        margin-top: 20px;
    }

    #post_submit
    {
        display:block;
        vertical-align: top;
        height: auto;
        width: auto;
        margin-top: 20px;
    }

    textarea
    {
        display:block;
        vertical-align: top;
        height: auto;
        min-height: 400px;
        min-width: 600px;
        margin-top: 20px;
    }

    #AnotherImage
    {
        display:block;
        vertical-align: top;

        margin: 50px 0 0px 0;
        background-color: lightgreen;
        position: relative;

        border-radius: 50px;
        border: 1px solid lightgreen;
    }
`;

const SubmissionForm = (props) =>
{
    const [images, updateImages] = useState({count: [1]});

    
    const [postData, updatePostData] = useState({
        post_title: null,
        author: null,
        post_content: null,
        date: null
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
        let filename = key + '.' + img.fileExtension;

        console.log(filename);

        const croppedImageFile = base64Stringtofile(img.img, filename);
        data[key] = croppedImageFile;

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

    const updateContent = (event) =>
    {   
        let data = postData;
        console.log(data);
        
        data['post_content'] = event.target.value;

        updatePostData(data);
    }

    const uploadContent = () =>
    {
        let data = postData;
        console.log(data);
        
        axios.post(
            'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/create/',
            {...data}            
        ).then((response) => {
            console.log(response.data);
        });
    }

    return (
        <StyledForm>
            <form method = {'POST'} id = "post_maker">
                <label></label>
                <input type = "text" placeholder = "Post Title" id = "post_title" onChange = {(event) => updateTitle(event)}/>

                <input type = "text" placeholder = "Post Author" id = "post_author" onChange = {(event) => updateAuthor(event)}/>

                <button id = "AnotherImage" type = "button" onClick = {() => addAnotherImage()}>+Image</button>

                {
                    images.count.map((number, index) => 
                    {
                        return (<AddImage key = {"AddImage" + index.toString()} ieid = {"ie" + number.toString()} imageUpdater = {updateNewImage}/>);
                    })
                }

                <textarea form = "post_maker" placeholder = "Enter Post Content" onChange = {(event) => updateContent(event)}></textarea>
                <button type = "button" id = "post_submit" onClick = {uploadContent}>Submit Post</button>
            </form>
        </StyledForm>);
}

export default SubmissionForm;
