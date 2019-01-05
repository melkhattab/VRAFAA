import React, { Component } from 'react';
import './userRegistration.css';
import config from '../config/configFile';
import axios from 'axios';

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
    console.log("Handling submit:");
    console.log({
      email: this.state.email,
      password: this.state.password,
    });

    const url = config.SERVER_URL+'signIn';
    axios.post(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then(response => {
      console.log("user authentication succed ");
      console.log(response);
    })
    .catch(err =>{
      console.log("user authentication failed");
      console.log(err.response.data);
    });
    //event.preventDefault();
  }

  render() {
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
}

export default UserAuthentication;
