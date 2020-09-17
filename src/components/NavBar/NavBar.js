import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {GeneralContext} from '../GeneralContext';
import axios from 'axios';
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

    const [isLoggedIn, updateIsLoggedIn] = useState((sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== 'null')?true:false);
    const [profileLabel, updateProfileLabel] = useState('Profile');
    let myContext = useContext(GeneralContext);

    const getUserDisplayName = () =>
    {
                //Retrieve User display name for profile nav bar option
                let url = 'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/User/GetUser/';
                let config = {
                    headers: {
                        'Authorization': 'Token ' + sessionStorage.getItem('token')
                    }
                };
        
                axios.get(url, config)
                .then(
                    response =>
                    {
                        updateProfileLabel(response.data.display_name);
                    }
                )
                .catch(
                    err =>
                    {
                        updateProfileLabel('Profile');
                    }
                )
    }


    const updateLogin = () =>
    {
        let token = sessionStorage.getItem('token');
        
        if(token !== null && token !== 'null')
        {
            getUserDisplayName();
            updateIsLoggedIn(true);
        }
        else
        {
            updateIsLoggedIn(false);
        }
    }

    useEffect(() =>
    {
        updateLogin();
        myContext.loadFunction(updateLogin);

        getUserDisplayName();
    }, []);



    let userPortal = isLoggedIn?"/Login":"/Profile";
    //♛
    return (
        <NavSection current = { props.currentContent }>            
                <li><StyledLink to = "/">Home</StyledLink></li>
                <li><StyledLink to = "/BlogPosts">Blog</StyledLink></li>
                <li><StyledLink to = "/BlogPostsByYou">Blog by You</StyledLink></li>
                <li><StyledLink to = "/Submit">Submit</StyledLink></li>
                <li><StyledLink to = "/About">About</StyledLink></li>                
                {!isLoggedIn?<li><StyledLink to = "/Login">Login</StyledLink></li>:null}
                {isLoggedIn?<li><StyledLink to = "/Profile">{profileLabel}</StyledLink></li>:null}
        </NavSection>
    );
}

export default NavBar;