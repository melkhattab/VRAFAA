import React, { Component } from 'react';
import axios from 'axios';
import './userRegistration.css';
import config from '../config/configFile';
import UserProfile from '../data/userProfile';
import ArtisansList from '../artisans/artisansList'
import {BrowserRouter, Router, Redirect} from 'react-router-dom'

class UserAuthentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password: ''
    };
  }

  handleChangeEmail=(event)=>{
    this.setState({email:event.target.value});
  }

  handleChangePassword = (event)=>{
    this.setState({password:event.target.value});
  }

  handleSubmit= (event)=>{
    event.preventDefault();

    const url = config.SERVER_URL+'signIn';
    axios.post(url,{
      password:this.state.password,
      email:this.state.email
    })
    .then(response => {
      console.log("user authentication succed ");
      UserProfile.setUser(response.data.user);
      window.sessionStorage.setItem("user_id", response.data.user._id);
      window.sessionStorage.setItem("fname", response.data.user.fname);
      window.sessionStorage.setItem("lname", response.data.user.lname);
      window.sessionStorage.setItem("email", response.data.user.email);
      var user = window.sessionStorage.getItem("user_id");
      return(
        <Redirect to="/artisans" />
      );

    })
    .catch(err =>{
      console.log("user authentication failed");
      console.log(err.response.data);
    });
    //event.preventDefault();
  }
  render(){

    var user_id = window.sessionStorage.getItem("user_id");
    console.log("user id : "+(user_id==="null"));
    if(user_id === "null"){
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2> Sign In </h2>
            <form  onSubmit={this.handleSubmit} noValidate>
              <div className="email">
                <label>E-mail</label>
                <input  type="text"
                        onChange={this.handleChangeEmail}
                      />
              </div>
              <div className="password">
                <label>Password</label>
                <input  type="password"
                        onChange={this.handleChangePassword}
                      />
              </div>
              <div className="createAccount">
                <button
                      type="submit"
                      value="Submit"
                      >
                      Log In
                </button>
                <small>Don't have an account ? Sign up</small>
              </div>
            </form>
          </div>
        </div>
      );
    }
    else{
      console.log("dddddddddddddddddddddddddddddddddd");
      return(<Redirect to="/artisans" />);
    }
  }
}

export default UserAuthentication;
