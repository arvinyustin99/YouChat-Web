import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './providers/UserProviders.jsx';

import Mock from './pages/Mock';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';

const PrivateRoute = ({ authenticated, ...rest }) => {
  
  return (
    <Route {...rest} path={`${authenticated === true? "/" : "/login"}`}>
      {
        authenticated === true
        ? <Home />
        : <Login />
      }
    </Route>
  );
}

const App = () => {
  const userContext = useContext(UserContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup" >
          <SignUp />
        </Route>
        <PrivateRoute authenticated={userContext ? true : false} />
        <Route default component={Mock} />
      </Switch>

    </Router>
  );
}

export default App;