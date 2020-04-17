import React from 'react'

import Logo from '../../assets/logo.png'

import classes from './Logo.css'

const logo = (props)=>(
    <div className={classes.Logo}>
        <img src={Logo} alt="UPS" />
    </div>    
);

export default logo;