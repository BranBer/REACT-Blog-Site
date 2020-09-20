import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import styles from './Home.module.scss';
import { GeneralContext } from '../GeneralContext';

const Home = (props) =>
{
    let token = sessionStorage.getItem('token');
    let myContext = useContext(GeneralContext);
    const [isSuperUser, updateIsSuperUser] = useState(false);
    const [descriptionFields, updateDescriptionFields] = useState(
        {message: 'This is a platform that allows you to dive in to the collective experiences of Sarah and other disabled persons.',
        date: new Date().toLocaleDateString()
        }
    );

    const [description, updateDescription] = useState({
        message: '',
        date: ''
    })

    const getIsSupserUser = () =>
    {
        if(token !== null && token !== 'null')
        {
            axios.get(myContext.value.url + '/User/IsSuperUser/', { headers:{ Authorization: 'Token ' + token } })
            .then(
                response =>
                {
                    if(response.data == true)
                    {
                        updateIsSuperUser(true);
                    }
                    else
                    {
                        updateIsSuperUser(false);
                    }
                }
            )
        }
    }

    const getWelcomeMessage = () =>
    {
        axios.get(myContext.value.url + '/GetWelcomeMessage/')
        .then(
            response =>
            {
                updateDescription({message: response.data.WelcomeMessage, date: new Date(response.data.date_posted).toLocaleDateString()});
            }
        )
    }

    useEffect(() => 
    {
        getIsSupserUser();
        getWelcomeMessage();
    }, []);

    return (
        <>
            <div className = {styles.HomeContainer}>
                <h2>Welcome</h2>
                <sub>{new Date().toDateString()}</sub>
                <hr/>
                <p>
                    {description.message}
                </p>
                <sub>{description.date}</sub>
                <br/>
                {isSuperUser?
                <div className = {styles.ModifyDescription}>
                    <label>New Description</label>
                    <textarea onChange = {(event) => {updateDescriptionFields({message: event.target.value, date: descriptionFields.date})}}/>
                    <button>Submit</button>
                </div>
                :null}
            </div>


        </>
    );
}

export default Home;