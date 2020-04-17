import React, {useState} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import HomeScreen from './Components/HomeScreen/HomeScreen'
import AuthContext from './Context/auth-context';

const App = () =>{
    const [authStatus, setStatus] = useState(null);


    const setAuth = (stat) =>{
      console.log('stat', stat)
      let area = '';
      if(stat === 'GOIP3etEbrUMJJ9N7OVldwEpkD23'){
        area = 'Enniscorthy'
      }
      setStatus({ID: stat, area: area});
    }
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/home" component={HomeScreen}/>
        <Redirect to="/" /> 
      </Switch>
    );
    return (
      <div className="App">
        <AuthContext.Provider value={{status: authStatus, login: setAuth}}>
          {routes}
        </AuthContext.Provider>
      </div>
    );
}

export default withRouter(App);
