import React, {useState} from 'react';

const SelectedPostContext = React.createContext();

const SelectedPostProvider = (props) =>
{
    const [CurrentPostData, UpdateCurrentPostData] = useState({
        ToUrl: '/',
        content: '',
        author: '',
        date: '',
        title: '',
        images: []
    });

    const UpdatePost = (newPost) =>
    {
        UpdateCurrentPostData(newPost);
    }

    return (
    <SelectedPostContext.Provider 
        value = {{
            CurrentPostData: CurrentPostData,
            UpdatePost: UpdatePost
        }}>
        {props.children}
    </SelectedPostContext.Provider>);
}

export {SelectedPostContext, SelectedPostProvider};