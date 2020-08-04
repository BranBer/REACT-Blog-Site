import React from 'react';
import styled from 'styled-components';
import NavO from './NavOption';

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


    li:hover
    {
        color: #FF6565;
    }

    li:active
    {
        color: #DAD3FF;
        font-size: 24px;   
    }
`;

const NavBar = (props) => 
{
    var currentContent = 'Blog';


    return (
        <NavSection current = { props.currentContent }>
            <ul>
                <NavO selected = { props.selected }>Home</NavO>
                <NavO selected = { props.selected }>Blog</NavO>
                <NavO selected = { props.selected }>Submit</NavO>
                <NavO selected = { props.selected }>About</NavO>
            </ul>
        </NavSection>
    );
}

export default NavBar;