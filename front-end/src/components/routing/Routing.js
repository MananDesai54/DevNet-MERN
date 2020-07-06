import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import CreateProfile from '../profile-form/CreateProfile';
import EditProfile from '../profile-form/EditProfile';
import PrivateRoute from '../routing/PrivateRoute';
import AddExperience from '../profile-form/AddExperience';
import AddEducation from '../profile-form/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../ProfileDisplay/Profile';
import Posts from '../Posts/Posts';
import PostDetail from '../Post/PostDetail';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import PageNotFound from '../layout/PageNotFound';

const Routing = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profiles" component={Profiles}/>
              <Route path="/profile/:id" component={Profile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/create-profile" component={CreateProfile} />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              <PrivateRoute path="/add-experience" component={AddExperience} />
              <PrivateRoute path="/add-education" component={AddEducation} />
              <PrivateRoute path="/posts" component={Posts} />
              <PrivateRoute path="/post/:id" component={PostDetail} />
              <Route component={PageNotFound} />
            </Switch>
        </section>
    )
}

export default Routing;