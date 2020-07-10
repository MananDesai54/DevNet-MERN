import React,{ useEffect } from 'react';
// import './assets/styles/App.scss';
import './assets/styles/style.scss';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import Landing from './components/layout/Landing';
import { connect } from 'react-redux';
// import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setToken';
import Routing from './components/routing/Routing';
import PropTypes from 'prop-types';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ theme:{
  darkTheme
},loadUser })=> {

  useEffect(()=> {
    loadUser();
  },[loadUser]);
  // window.addEventListener('click',e=>{
  //   console.log(e.target);
  // })

  return(
    // <Provider store={store}>
      <Router>
        <div className={`theme__${darkTheme?'dark':'light'}`}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routing} />
          </Switch>
        </div>
      </Router>
    // </Provider>
  )
}

App.propTypes = {
  theme:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    theme:state.theme,
  }
}

export default connect(mapStateToProps,{
  loadUser
})(App);
