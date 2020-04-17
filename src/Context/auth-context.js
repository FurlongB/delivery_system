import React from 'react';

const authContext = React.createContext({status: {ID: null, area:null}, login: (stat) => {}});

export default authContext;