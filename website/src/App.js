import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import ArtisansList from './artisans/artisansList';
import UserAuthentication from './forms/userAuthentication';
import UserResgistration from './forms/userRegistration';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={UserAuthentication} exact />
          <Route path="/artisans" component={ArtisansList} />
          <Route path="/user/login" component={UserAuthentication} />
          <Route path="/user/sign_up" component={UserResgistration} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
