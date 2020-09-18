import React from 'react';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar'


//light purple: #DAD3FF
const StyledTitleDiv = styled.div`
        font-family: 'Roboto';
        font-size: 36px;
        min-width: 750px;
        color: black;
        overflow:hidden;
        position: relative;
        float: left;
        text-align: left;
        top: -10%;

        display: block;
        vertical-align: top;
        
        h1
        {
                height: 30px;     
                margin: 50px 0 0 35px;;         
        }

        h4 
        {
                height: 10px;
                font-size: 16px;
                margin: 75px 0 0 35px;
        }
`;

const StyledTitle = (props) =>
{
    return (
    <StyledTitleDiv>
            <h1>Blogy</h1>
            <h4>"To be or not to be, that is the question" -Shakespeare</h4>            
            <NavBar selected = { props.selected } />
    </StyledTitleDiv>);
}

export default StyledTitle;