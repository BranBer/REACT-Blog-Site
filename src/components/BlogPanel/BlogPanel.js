import React, { useState } from 'react';
import styled from 'styled-components';
import BlogPosts from '../BlogPost/BlogPosts';
import GalleryImage from '../GalleryImage/GalleryImage';


const StyledPanel = styled.div`
    position: absolute;
    display: block;
    
    width: 700px;;
    height: 100%;
    margin-left: 10%;

    overflow-y: scroll;

    top: 40%;

    background-color: #4D457A;
    z-index: 1;

    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    border: 5px solid #4D457A;

    color: #FF6565;

    h2
    {
        font-family: 'Roboto', sans-serif;
        text-align: center;
        font-size: 42px;
    }

    hr
    {
        width: 75%;
        border: 2px solid #FF6565;
    }
`;

const Panel = () => 
{
    const [ MyBlogPosts, ChangeBlogPosts ] = useState(
    {
        posts: []
    });

    return (
    <StyledPanel>
        <h2>Posts</h2>
        <BlogPosts/>
    </StyledPanel>);
}

export default Panel;