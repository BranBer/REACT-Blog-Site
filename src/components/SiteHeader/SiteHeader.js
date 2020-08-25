import React, {useState} from 'react';
import StyledTitle from '../SiteTitle/SiteTitle'
import styled from 'styled-components';
import Panel from '../BlogPanel/BlogPanel';
import SubmissionForm from '../Submissions/SubmissionForm'

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

    background-image: url('/forest_pic.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 10% 5%;
`;

const SiteHeader = () => 
{   

    return(
        <HeaderDiv>
            <SiteLogo src = '/logo.png'/>
            <StyledTitle/>
            <BannerImg/>             
        </HeaderDiv>
    );
}

export default SiteHeader;