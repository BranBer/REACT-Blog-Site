import React from 'react';
import StyledTitle from '../SiteTitle/SiteTitle'
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import Panel from '../BlogPanel/BlogPanel';
import SiteContent from '../SiteContent/SiteContent';
import {CurrentSelected} from '../../contexts/currentSelected';

const SiteLogo = styled.img`
    height: 175px;
    width: 175px;
    display: inline-block;
    position: relative;
    float: left;
    margin: 10px 0px 0px 10px;
`;

const HeaderDiv = styled.div`
    background-color: #4D457A;
    height: 225px;
    width: 100%;
    min-width: 1000px;
`

const BannerImg = styled.div`
    height: 300px;
    width: 100%;
    display: block;
    vertical-align: top;
    overflow: hidden;

    border-bottom-color: #FF6565;
    border-bottom-style: solid; 

    border-top-color: #FF6565;
    border-top-style: solid; 

    border-bottom-width: 5px;
    border-top-width: 5px;

    background-image: url('forest_pic.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 10% 5%;
`;

const SiteHeader = () => 
{
    let selected = null;
    let currentContent = null;

    const changeCurrentSelected = (content) =>
    {
        selected = content;
        console.log(selected);

        if(selected == 'Blog')
        {
            currentContent = (<Panel/>);
        }
    }

    return(
        <HeaderDiv>
            <SiteLogo src = 'logo.png'/>
            <StyledTitle selected = { changeCurrentSelected }/>
            <BannerImg />

             { currentContent }
        </HeaderDiv>
    );
}

export default SiteHeader;