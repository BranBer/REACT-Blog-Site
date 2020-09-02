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
        <BlogPosts/>
    </div>);
}

export default Panel;