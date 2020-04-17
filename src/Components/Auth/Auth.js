import React, {useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Logo from '../Logo/Logo';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AuthContext from '../../Context/auth-context';
import authClass from './Auth.css'



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const OutlinedTextFields = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenicate, setAuth] = useState(false);
  const authStatus = useContext(AuthContext);
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
   };

   const submitHandler = (event) =>{
    event.preventDefault();
    const authData = {
        email: email,
        password: password
    }
    console.log(authData)
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD_YQybJo76MZGxntST14TIn56IX8wUyNs';
    axios.post(url, authData)
    .then(res => {
        console.log(res)
        authStatus.login(res.data.localId);
        setAuth(true);
    })
    .catch(err =>{
        console.log(err)
        setAuth(false);
    });

}

    const { classes } = props;

    return (
        <div className={authClass.Auth}>
            <Logo/>
            <form className={classes.container} noValidate autoComplete="off">
            
                <TextField
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                value={email}
                onChange={emailChange.bind(this)}
                autoComplete="email"
                margin="normal"
                variant="outlined"
                />

                <TextField
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                value={password}
                onChange={passwordChange.bind(this)}
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                />
                <Button variant="contained" className={classes.button} onClick={submitHandler.bind(this)}>
                    Login
                </Button>
                {authenicate ? <Redirect to="/home"/>: null}
            </form>
        </div>
    );
  
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
