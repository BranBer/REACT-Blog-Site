import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`

    position: absolute;
    display: block;

    width: 700px;;
    height: 100%;
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
`;

const SubmissionForm = (props) =>
{
    
    return (
    <StyledForm>
        <form method = {'POST'} id = "post_maker">
            <label></label>
            <input type = "text" placeholder = "Post Title" id = "post_title"/>

            <label></label>
            <input type = "text" placeholder = "Post Author" id = "post_author"/>

            <label></label>
            <input type = "file" accept="image/png, image/jpeg" id = "post_image"/>

            <label></label>
            <textarea form = "post_maker" placeholder = "Enter Post Content"></textarea>
            <input type = "submit" value = "Submit Post" id = "post_submit"/>
        </form>
    </StyledForm>);
}

export default SubmissionForm;
