import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../auth-context';


const Logout = () => {
    const authLogin = useContext(AuthContext);   
    authLogin.login(false);
    return <Redirect to="/" />
}



export default Logout;