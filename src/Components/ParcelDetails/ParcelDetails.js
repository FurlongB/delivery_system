import React, {useState, useContext} from 'react';
import AuthContext from '../../Context/auth-context';
import axios from 'axios';

import GetDirections from '../Directions/DirectionsIndex'

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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

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
  chip: {
    margin: theme.spacing.unit,
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
  const [delStatus, setDelStatus] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [navigate, setNavigate] = useState(false)
  const authStatus = useContext(AuthContext);

  const getDirectionsHandler = () =>{
    setNavigate(true);
  };

  const handleClick = (label)=> {
    setDelStatus(label);
    completeHandler();
    //authStatus.status.itemstatus
  }

  const handleDelete = () => {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
  }

  const handleChange = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false)
  };

  const completeHandler = () =>{
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
      itemstatus: delStatus
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
          <div className={classes.root}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Delivered</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.flexed}>
                    <Chip
                      avatar={<Avatar>FD</Avatar>}
                      label="Front Door"
                      clickable
                      className={classes.chip}
                      color="primary"
                      onClick={handleClick.bind(this, 'Del-FD')}
                      onDelete={handleDelete}
                      deleteIcon={<DoneIcon />}
                      variant="outlined"
                    />
                    <Chip
                      avatar={<Avatar>BD</Avatar>}
                      label="Back Door"
                      clickable
                      className={classes.chip}
                      color="primary"
                      onClick={handleClick.bind(this, 'Del-BD')}
                      onDelete={handleDelete}
                      deleteIcon={<DoneIcon />}
                      variant="outlined"
                    />
                    <Chip
                      avatar={<Avatar>MB</Avatar>}
                      label="Mail Box"
                      clickable
                      className={classes.chip}
                      color="primary"
                      onClick={handleClick.bind(this, 'Del-MB')}
                      onDelete={handleDelete}
                      deleteIcon={<DoneIcon />}
                      variant="outlined"
                    />
                    <Chip
                      avatar={<Avatar>MB</Avatar>}
                      label="Side Door"
                      clickable
                      className={classes.chip}
                      color="primary"
                      onClick={handleClick.bind(this, 'Del-SD')}
                      onDelete={handleDelete}
                      deleteIcon={<DoneIcon />}
                      variant="outlined"
                    />
                    <Chip
                      avatar={<Avatar>GR</Avatar>}
                      label="Garage"
                      clickable
                      className={classes.chip}
                      color="primary"
                      onClick={handleClick.bind(this, 'Del-GR')}
                      onDelete={handleDelete}
                      deleteIcon={<DoneIcon />}
                      variant="outlined"
                    />
                </div>  
          </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Non-Delivered</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.flexed}>
                <Chip
                  avatar={<Avatar>WA</Avatar>}
                  label="Wrong Address"
                  clickable
                  className={classes.chip}
                  color="secondary"
                  variant="outlined"
                  onClick={handleClick.bind(this, 'Non-WA')}
                  onDelete={handleDelete}
                 />
                 <Chip
                  avatar={<Avatar>SR</Avatar>}
                  label="Signature Required"
                  clickable
                  className={classes.chip}
                  color="secondary"
                  variant="outlined"
                  onClick={handleClick.bind(this, 'Non-SR')}
                  onDelete={handleDelete}

                 />
                 <Chip
                  avatar={<Avatar>NI</Avatar>}
                  label="Not In"
                  clickable
                  className={classes.chip}
                  color="secondary"
                  variant="outlined"
                  onClick={handleClick.bind(this, 'Non-NI')}
                  onDelete={handleDelete}
                 />
                 <Chip
                  avatar={<Avatar>RF</Avatar>}
                  label="Refused"
                  clickable
                  className={classes.chip}
                  color="secondary"
                  variant="outlined"
                  onClick={handleClick.bind(this, 'Non-RF')}
                  onDelete={handleDelete}
                 />
                 <Chip
                  avatar={<Avatar>CN</Avatar>}
                  label="Cancelled"
                  clickable
                  className={classes.chip}
                  color="secondary"
                  variant="outlined"
                  onClick={handleClick.bind(this, 'Non-CD')}
                  onDelete={handleDelete}
                 />
              </div> 
          </ExpansionPanelDetails>
        </ExpansionPanel>
        
      </div>
    </Dialog>
    {navigate ? <GetDirections /> : null}     
  </div>   
  );
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
