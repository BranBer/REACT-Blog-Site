import React, {useEffect, useState} from 'react';

const GeneralContext = React.createContext();

const GeneralContextProvider = (props) =>
{
    //Not gunna lie, this context is garbage but it does its job
    const [value, updateValue] = useState({
        token: sessionStorage.getItem('token'),
        isSuperUser: false,
        isLoggedIn: sessionStorage.getItem('token')!==null && sessionStorage.getItem('token')!=='null',
        updateLoginFunction: null
    });

    useEffect(()=>{
        let token = sessionStorage.getItem('token');
            
        if(token == null || token == 'null')
        {
            let newValue = value;

            newValue.isLoggedIn = false;
            updateValue(newValue);
        }
        else
        {
            let newValue = value;
            newValue.isLoggedIn = true;
            updateValue(newValue);
        }
    }, []);

    const updateLogin = (loginStatus) =>
    {
        let myValues = value;
        myValues.isLoggedIn = loginStatus;
        updateValue(myValues);
    }

    //Can pass in a function from other components that can be called in other components
    const loadFunction = (myFunction) =>
    {
        let myValues = value;
        myValues.updateLoginFunction = myFunction;
        updateValue(myValues);
    }
    
    //Executes the function passed in by load function if it is not null
    const executeLoadFunction = () =>
    {
        if(value.updateLoginFunction !== null)
        {
            value.updateLoginFunction();
        }
    }

    return (
        <GeneralContext.Provider
        value = {{
            value: value,
            updateLogin: updateLogin,
            loadFunction: loadFunction,
            executeLoadFunction: executeLoadFunction}}>
            {props.children}
        </GeneralContext.Provider>
        );
}

export {GeneralContext, GeneralContextProvider};