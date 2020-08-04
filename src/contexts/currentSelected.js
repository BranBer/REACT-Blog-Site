import React from 'react';
import Panel from '../components/BlogPanel/BlogPanel'

const CurrentSelected = React.createContext();

const Provider = (props) =>
{
    var current = 'Blog';
    var currentContent = 'null';

    const updateSelected = (newContent) => 
    {
        current = newContent;
        console.log(current);
    }

    if(current == 'Blog')
    {
        currentContent = (<p>lorem  ipsum </p>);
        console.log('current is blog');
        console.log(currentContent);
    }

    return (
    <CurrentSelected.Provider value = { 
        {
            update: updateSelected, 
            content: currentContent,
        } }>
       { props.children }
    </CurrentSelected.Provider>);
}

export {Provider, CurrentSelected};
