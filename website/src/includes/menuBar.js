import React, { Component } from 'react';
import {BrowserRouter, Link, Router, Redirect} from 'react-router-dom'

class MenuBar extends Component {
  constructor(props) {
    super(props);
  }
  logout(){
    console.log('gggggggggggggggggggggggggggggggggg');
    window.sessionStorage.setItem("user_id", null);
  }
  render(){
      return (
        <div>
          <div>
            <ul>
              <li>Home</li>
              <li>Profile </li>
              <li><Link to="/user/login" onClick={this.logout()}>Log out</Link></li>
            </ul>
          </div>
        </div>
      );
  }
}

export default MenuBar;
