import React, {useState} from 'react';
import styled from 'styled-components';
import Panel from '../BlogPanel/BlogPanel';

const SiteContent = (props) =>
{
    const [currentSelect, changeSelect] = useState({current: props.content});
    let content = null;

    if(currentSelect.current === 'Blog')
    {
        content = (<Panel/>);
    }

    return (
            <div> 
                {content} 
            </div> 
            );
}

export default SiteContent;