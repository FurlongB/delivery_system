import React from 'react'

import Icon from '../../../assets/icon.png'

import classes from './icon.css'

const icon = (props)=>(
    <div className={classes.Icon}>
        <img src={Icon} alt="Map Icon" />
    </div>    
);

export default icon;