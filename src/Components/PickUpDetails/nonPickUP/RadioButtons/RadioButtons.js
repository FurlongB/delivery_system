import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Amber from '@material-ui/core/colors/amber';
import Teal from '@material-ui/core/colors/teal';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  blueAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: blueGrey[500],
  },
  amberAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: Amber[500],
  },
  tealAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: Teal[500],
  },
};


const LetterAvatars = (props) => {
    const handleChange = (label) => {
      props.clicked(label);
    };

    const { classes } = props;
    return (
        <Grid container justify="flex-start" alignItems="flex-start">
            <Avatar className={classes.avatar} onClick={handleChange.bind(this, 'Not-In')}>NI</Avatar>
            <Avatar className={classes.blueAvatar} onClick={handleChange.bind(this, 'Not-Ready')}>NR</Avatar>
            <Avatar className={classes.orangeAvatar} onClick={handleChange.bind(this, 'No-Money')}>NM</Avatar>
            <Avatar className={classes.purpleAvatar} onClick={handleChange.bind(this, 'Cancelled')}>CN</Avatar>
            <Avatar className={classes.amberAvatar} onClick={handleChange.bind(this, 'Already PickedUp')}>AP</Avatar>
            <Avatar className={classes.tealAvatar} onClick={handleChange.bind(this, 'No Access')}>NA</Avatar>
        </Grid>
    );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterAvatars);









