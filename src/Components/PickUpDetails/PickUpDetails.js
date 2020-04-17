import React, {useState, useContext} from 'react';
import AuthContext from '../../Context/auth-context';
import axios from 'axios';

import NonPickUp from './nonPickUP/nonPickUP';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import PhoneIcon from '@material-ui/icons/PhoneAndroid';
import CarIcon from '@material-ui/icons/DirectionsCar';
import Slide from '@material-ui/core/Slide';
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    width: '100%',
  },
  flexed:{
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  fab: {
    margin: theme.spacing.unit,
  },
});

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

const FullScreenDialog = (props) => {
  const [open, setOpen] = useState(true);
  const [openPack, setOpenPack] = useState(false)
  const [packages, setPackages] = useState(0);
  const [nonDel, setNonDel] = useState(false);
  const authStatus = useContext(AuthContext);

  const getDirectionsHandler = () =>{

  };

  const handleOpen =()=>{
    setOpenPack(true);
  }

  const handleClose =()=>{
    setOpenPack(false);
  }

  const handleChange =(event)=> {
    setPackages(event.target.value);
  };

  const completeHandler = (label) =>{
    console.log('label', label)
     setNonDel(false);
    const authData = {
      name: props.details.name,
      address: props.details.address,
      phone: props.details.phone,
      eircode: props.details.eircode,
      type: props.details.type,
      area: props.details.area,
      status: props.details.status,
      userId: authStatus.status.ID,
      track_num: props.details.track_num,
      itemstatus: label
    } 
    let url = `https://my-ups-4b5b7.firebaseio.com/${authStatus.status.area}/${props.id}.json`
      axios.put(url, authData)
        .then(res => {
            console.log(res)
            props.clicked();
        })
        .catch(err =>{
            console.log(err)

        })
    
  };

  const nonCompleteHandler =()=>{
    setNonDel(true)
  }

  const { classes } = props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={props.clicked}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={props.clicked} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Parcel Details
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem >
              <ListItemText primary={"Name: "+ props.details.name}/>
            </ListItem>
            <ListItem >
              <ListItemText primary={"Address: "+props.details.address} />
            </ListItem>
            <ListItem>
              <ListItemText primary={"Route: "+props.details.area} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={"Delivery Type: "+props.details.type} />
            </ListItem>
            <Divider />
            <ListItem button>
              <PhoneIcon />
              <ListItemText primary={props.details.phone} />
            </ListItem>
            <Divider />
            <ListItem button onClick={getDirectionsHandler}>
              <CarIcon />
              <ListItemText primary={props.details.eircode} />
            </ListItem>
            <Divider />
          </List>
          <form autoComplete="off">
        
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">Packages</InputLabel>
              <Select
                open={openPack}
                onClose={handleClose}
                onOpen={handleOpen}
                value={packages}
                onChange={handleChange}
                inputProps={{
                  name: 'Packages',
                  id: 'demo-controlled-open-select',
                }}
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </form>
          <div className={classes.flexed}>
            <Fab color="primary" aria-label="Edit" className={classes.fab} onClick={completeHandler.bind(this, 'Picked-Up')}>
              <DoneIcon/>
            </Fab>
            <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={nonCompleteHandler}>
              <CloseIcon/>
            </Fab>
          </div>
       
    </Dialog>

    {nonDel ? <NonPickUp clicked={completeHandler.bind(this)}/> : null};
        
  </div>   
  );
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
