import React, {useEffect, useState} from 'react';

const GeneralContext = React.createContext();

const GeneralContextProvider = (props) =>
{
    const [value, updateValue] = useState({
        token: sessionStorage.getItem('token'),
        isSuperUser: false,
        isLoggedIn: sessionStorage.getItem('token')!==null,
    });

    useEffect(()=>{
        let mounted = true;

        if(mounted)
        {
            console.log(sessionStorage.getItem('token')==null?'Not Logged in': 'Logged in');
            
            if(sessionStorage.getItem('token')==null)
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
        }

        return () => mounted = false;
    });

    const login = () =>
    {
        
    }

    return (
        <GeneralContext.Provider
        value = {value}>
            {props.children}
        </GeneralContext.Provider>
        );
}

export {GeneralContext, GeneralContextProvider};