import React, {useState, useContext} from 'react';
import axios from 'axios';
import styles from '../ForgotPassword/ForgotPassword.module.scss';
import {Link, useHistory} from 'react-router-dom';
import { GeneralContext } from '../GeneralContext';

const ResetPassword = (props) =>
{
    const [showLoginButton, updateShowLoginButton] = useState(false);
    const [statusMessage, updateStatusMessge] = useState('');
    const [fields, updateFields] = useState({
        code: '',
        password: '',
        password2: ''
    });

    let myContext = useContext(GeneralContext);

    let history = useHistory();

    const handleCodeChange = (event) =>
    {
        let myFields = fields;
        fields.code = event.target.value;
        updateFields(myFields);
    }

    const handlePasswordChange = (event) =>
    {
        let myFields = fields;
        fields.password = event.target.value;
        updateFields(myFields);

        if(fields.password !== fields.password2)
        {
            updateStatusMessge('Passwords Must Match');
        }
        else
        {
            updateStatusMessge('');
        }
    }

    const handlePassword2Change = (event) =>
    {
        let myFields = fields;
        fields.password2 = event.target.value;
        updateFields(myFields);

        if(fields.password !== fields.password2)
        {
            updateStatusMessge('Passwords Must Match');
        }
        else
        {
            updateStatusMessge('');
        }
    }

    const ChangePassword = () =>
    {
        if (fields.password == fields.password2)
        {
            let url = myContext.value.url + '/User/ChangePassword/';
            
            let body = new FormData();
            body.append('code', fields.code);
            body.append('password', fields.password);

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            axios.post(url, body, config)
            .then(
                response =>
                {
                    updateShowLoginButton(true);
                    updateStatusMessge(response.data);
                }
            )
            .catch(
                err =>
                {
                    updateShowLoginButton(false);
                    updateStatusMessge('Invalid code');
                }
            );
        }
        else
        {
            updateStatusMessge('Passwords Must Match');
        }
    }


    return(
        <>
            <div className = {styles.ForgotPasswordContainer}>
                <h2>Change Password</h2>
                <hr/>

                <div className = {styles.InputAlign}>
                    <label>Code:</label>
                    <input className = {styles.CodeInput} maxLength = '6' type = "text" onChange = {handleCodeChange}/>
                </div>

                <div className = {styles.InputAlign}>
                    <label>Password:</label>
                    <input type = "password" onChange = {handlePasswordChange}/>
                </div>
                
                <div className = {styles.InputAlign}>
                    <label>Password Again: </label>
                    <input type = "password" onChange = {handlePassword2Change}/>
                </div>

                <sub className = {styles.BackLink} onClick = {() => history.goBack()}>Go Back</sub>
                {statusMessage !== ''?<sub>{statusMessage}</sub>:null}

                <hr/>
                <button onClick = {ChangePassword}>Change Password</button>

                {showLoginButton? 
                <Link to = '/login'><button>Login Here</button></Link>                
                :
                null}
            </div>
        </>
    );
}

export default ResetPassword;