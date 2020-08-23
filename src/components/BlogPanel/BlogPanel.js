import React, { useState } from 'react';
import styled from 'styled-components';
import BlogPosts from '../BlogPost/BlogPosts';
import styles from './BlogPanel.module.scss';

const Panel = () => 
{
    const [ MyBlogPosts, ChangeBlogPosts ] = useState(
    {
        posts: []
    });

    return (
    <div className = {styles.BlogPanel}>
        <h1 id = {styles.BlogPanelHeading}>Posts</h1>
        <BlogPosts/>
    </div>);
}

export default Panel;