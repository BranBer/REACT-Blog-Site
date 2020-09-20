import React, { useState } from 'react';
import styled from 'styled-components';
import BlogPosts from '../BlogPost/BlogPosts';
import styles from './BlogPanel.module.scss';

const Panel = (props) => 
{
    const [ MyBlogPosts, ChangeBlogPosts ] = useState(
    {
        posts: []
    });

    let position = props.match.params.position;

    return (
    <div className = {styles.BlogPanel}>
        <BlogPosts position = {position}/>
    </div>);
}

export default Panel;