import React from 'react';
import styled from 'styled-components';
import GalleryImage from '../GalleryImage/GalleryImage';

const Post = styled.div`
    background-color: #FF6565;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    font-size: 18px;
    color: #4D457A;

    min-height:400px;

    border-radius: 50px 50px 50px 50px;

    display:block;
    vertical-align: top;

    padding-top: 50px;
    margin-top: 40px;
`;

//            <GalleryImage images = {props.images}/>                

const BlogPost = (props) =>
{
    return (
        <Post>
            <h3>{props.title}</h3>
            <sub>{props.author}</sub>
            <sub>{props.date}</sub>
            <hr/>
            <p>{props.content}</p>   
            <GalleryImage images = {props.images}/>  
        </Post>
    );
}

export default BlogPost;