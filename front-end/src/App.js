import React,{ Fragment,useEffect } from 'react';
import './assets/styles/App.scss';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setToken';
import Routing from './components/routing/Routing';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ()=> {

  useEffect(()=> {
    store.dispatch(loadUser())
  },[]);

  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routing} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
