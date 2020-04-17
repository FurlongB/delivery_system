import React, {useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../Context/auth-context';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '10px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 350,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    width: 350,
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const areas = [
  {
    value: 'Enniscorthy',
    label: 'Enniscorthy',
  },
  {
    value: 'Wexford',
    label: 'Wexford',
  },
  {
    value: 'New Ross',
    label: 'New Ross',
  },
  {
    value: 'Gorey',
    label: 'Gorey',
  },
];

const types = [
    {
      value: 'Express Saver',
      label: 'Express Saver',
    },
    {
      value: 'Express',
      label: 'Express',
    },
    {
      value: 'Saver',
      label: 'Saver',
    },
    {
      value: 'Standard',
      label: 'Standard',
    },
  ];

const TextFields = props => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [eircode, setEircode] = useState('');
    const [type, setType] = useState('Express Saver');
    const [area, setArea] = useState('Enniscorthy');
    const [status, setStatus] = useState('');
    const authStatus = useContext(AuthContext);
 
    const nameChange = (event) => {
        setName(event.target.value)

    };

    const addressChange = (event) => {
        setAddress(event.target.value)

    };

    const phoneChange = (event) => {
        setPhone(event.target.value)

    };

    const eircodeChange = (event) => {
        setEircode(event.target.value)

    };

    const typeChange = (event) => {
        setType(event.target.value)

    };

    const areaChange = (event) => {
        setArea(event.target.value)

    };

    const statusChange = (event) => {
        setStatus(event.target.value)

    };

    // dec2hex :: Integer -> String
    // i.e. 0-255 -> '00'-'ff'
    const dec2hex =(dec)=> {
      return ('0' + dec.toString(16)).substr(-2)
    }

    // generateId :: Integer -> String
    const generateId = (len)=> {
      var arr = new Uint8Array((len || 40) / 2)
      window.crypto.getRandomValues(arr)
      return Array.from(arr, dec2hex).join('')
    }

    const submitHandler = (event) =>{
        
        event.preventDefault();
        const authData = {
            name: name,
            address: address,
            phone: phone,
            eircode: eircode,
            type: type,
            area: area,
            status: status,
            userId: authStatus.status.ID,
            track_num: generateId(20),
            itemstatus: 'null'
        }
        console.log(authData)
        let url = `https://my-ups-4b5b7.firebaseio.com/${area}.json`
        axios.post(url, authData)
        .then(res => {
            console.log(res)
           //authStatus.status;
        })
        .catch(err =>{
            console.log(err)

        });
    }


    const { classes } = props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={nameChange.bind(this)}
          margin="normal"
        />

        <TextField
          id="standard-name"
          label="Address"
          className={classes.textField}
          value={address}
          onChange={addressChange.bind(this)}
          margin="normal"
        />

        <TextField
          required
          id="standard-name"
          label="Phone"
          className={classes.textField}
          value={phone}
          onChange={phoneChange.bind(this)}
          margin="normal"
        />

        <TextField
          required
          id="standard-name"
          label="Eircode"
          className={classes.textField}
          value={eircode}
          onChange={eircodeChange.bind(this)}
          margin="normal"
        />

        <TextField
          required
          id="standard-select-currency-native"
          select
          label=""
          className={classes.textField}
          value={type}
          onChange={typeChange.bind(this)}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your Parcel type"
          margin="normal"
        >
          {types.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
          required
          id="standard-select-currency-native"
          select
          label=""
          className={classes.textField}
          value={area}
          onChange={areaChange.bind(this)}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your Area"
          margin="normal"
        >
          {areas.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Type of Package</FormLabel>
          <RadioGroup
            aria-label="Type of Package"
            name="package"
            className={classes.group}
            value={status}
            onChange={statusChange.bind(this)}
          >
            <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
            <FormControlLabel value="pickup" control={<Radio />} label="PickUp" />
          </RadioGroup>
        </FormControl>
        

        
        <Button variant="contained" className={classes.button} onClick={submitHandler.bind(this)}>
            Submit
        </Button> 
        {!authStatus.status ? <Redirect to="/" />: null}
        </form>
          
    );
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
