import React, {useState, useEffect, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../Context/auth-context'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';

import Add from '../Add/Add';
import Deliveries from '../Deliveries/Deliveries';
import Messages from '../Deliveries/Deliveries'

const LinkTab = (props) => {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#b8b8bb',
  },
});

const NavTabs =(props) => {
  const [value, setValue] = useState(0);
  const [deliveries, setDeliveries] = useState(null);
  const [curStatus, setCurStatus] = useState('delivery');
  const authStatus = useContext(AuthContext);
  const [totalDel, setTotalDel] = useState(0);
  const [totalPic, setTotalPic] = useState(0);

  useEffect(() =>{
    loadContent();
    return () =>{
      setDeliveries(null)
      setTotalDel(0)
      setTotalPic(0)
      console.log('Clean Up');
    }
  }, [curStatus]);

  const loadContent = () =>{
    axios.get(`https://my-ups-4b5b7.firebaseio.com/${authStatus.status.area}.json`)
    .then(res =>{
      const checkData = res.data
      const loadDeliveries = [];
      let delivery = 0;
      let pickup = 0
       for (const key in checkData ){
         if(curStatus === checkData[key].status){
          loadDeliveries.push({id: key, name: checkData[key].name, address: checkData[key].address, area: checkData[key].area, status:checkData[key].itemstatus})
        } 
        if(checkData[key].status === 'delivery' && checkData[key].itemstatus === 'null'){
          delivery++;
        }else if(checkData[key].status === 'pickup' && checkData[key].itemstatus === 'null'){
         pickup++;
        }
       }
      setDeliveries(loadDeliveries);
      setTotalDel(delivery)
      setTotalPic(pickup)

    })
    .catch(err =>{
      console.log(err)
    });
  }

  const updateData = () =>{
    console.log('You making it here')
    loadContent();
  };


  const handleChange = (event, value) => {
      setValue(value);
      if(value === 0){
        setCurStatus('delivery')
      }else if(value === 1){
        setCurStatus('pickup')
      }else if(value === 2){
        setCurStatus('messages')
      }else{
        setCurStatus('add')
      }
  };
 

  const { classes } = props;

   return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs variant="fullWidth" value={value} onChange={handleChange.bind(this)}>
              <LinkTab label={"Deliveries ("+totalDel+")"} href="page1" />
              <LinkTab label={"PickUps ("+totalPic+")"} href="page2" />
              <LinkTab label={"Comms"} href="page3" />
              {authStatus.status.ID === 'GOIP3etEbrUMJJ9N7OVldwEpkD23' ? <LinkTab label="Add" href="page4" /> : null}
            </Tabs>
          </AppBar>
          {value === 0 && deliveries ? <Deliveries locations={deliveries} clicked={updateData}/>: null}
          {value === 1 && deliveries ? <Deliveries locations={deliveries} clicked={updateData}/>: null}
          {value === 2 && <Messages />}
          {value === 3 && authStatus.status.ID === 'GOIP3etEbrUMJJ9N7OVldwEpkD23' ? <Add />: null}
          {!authStatus.status.ID ? <Redirect to="/" />: null}
        </div>
        
      </NoSsr>
    );
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);