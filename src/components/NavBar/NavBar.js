import React, {useState} from 'react';
import styled from 'styled-components';

import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';

import AboutPage from '../../pages/AboutPage';


const NavSection = styled.ul`
    list-style: none;
    display: block;
    position: relative;
    vertical-align: bottom;
    float: left;
    margin: 0 0 0 0;
    padding: 30px 0 0 0;

    font-family: 'Roboto';
    font-size: 20px;
    color: white;

    height: 30px;

    li
    {
        display: inline-block;
        margin-left: 50px;
    }

    #AdminPage
    {
    }

    #AdminPage:hover
    {       
        display: block;
    }

    #logoutOption:hover
    {
        cursor: pointer;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;

    &:hover
    {
        color: #FF6565;
    }

    &:active
    {
        color: #DAD3FF;
        font-size: 24px;   
    }

    &:focus
    {
        font-size: 24px; 
        color: #FF6565;
    }
`;

const NavBar = (props) => 
{
    return (
        <NavSection current = { props.currentContent }>            
                <li><StyledLink to = "/">Home</StyledLink></li>
                <li><StyledLink to = "/BlogPosts">Blog</StyledLink></li>
                <li><StyledLink to = "/BlogPostsByYou">Blog by You</StyledLink></li>
                <li><StyledLink to = "/Submit">Submit</StyledLink></li>
                <li><StyledLink to = "/About">About</StyledLink></li>
                <li><StyledLink to = "/AdminLogin">♛</StyledLink></li>
        </NavSection>
    );
}

export default NavBar;