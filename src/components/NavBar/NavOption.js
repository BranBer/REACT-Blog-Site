import React, {useState} from 'react';
import {CurrentSelected} from '../../contexts/currentSelected';

const NavO = (props) => 
{
    const style = 
    {
        display: 'inline-block',     
        paddingRight: '50px',
        textAlign: 'left',
    };



    return (
            <li onClick = {(content) => props.selected(props.children)} style = { style }> { props.children } </li>
    );
}

export default NavO;