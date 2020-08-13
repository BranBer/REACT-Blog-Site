import React, {useState} from 'react';
import styled from 'styled-components';
import AddImage from './AddImage';

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

        margin: 0px 0 0px 0;
        background-color: lightgreen;
        position: absolute;

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
        data['image' + id.toString()] = img;

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
        data['post_content'] = event.target.value;

        updatePostData(data);
    }

    return (
        <StyledForm>
            <form method = {'POST'} id = "post_maker">
                <label></label>
                <input type = "text" placeholder = "Post Title" id = "post_title" onChange = {(event) => updateTitle(event)}/>

                <input type = "text" placeholder = "Post Author" id = "post_author" onChange = {(event) => updateAuthor(event)}/>
                
                {
                    images.count.map((number, index) => 
                    {
                        return (<AddImage key = {"AddImage" + index.toString()} ieid = {"ie" + number.toString()}/>);
                    })
                }

                <br/>
                <button id = "AnotherImage" type = "button" onClick = {() => addAnotherImage()}>+</button>
                <br/>

                <textarea form = "post_maker" placeholder = "Enter Post Content" onChange = {(event) => updateContent(event)}></textarea>
                <input type = "submit" value = "Submit Post" id = "post_submit"/>
            </form>
        </StyledForm>);
}

export default SubmissionForm;
