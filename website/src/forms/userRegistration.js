import React, { Component } from 'react';
import './userRegistration.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

import config from '../config/configFile';

class UserResgistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname:'',
      email:'',
      password:'',
      confPassword:'',
    };

//    this.handleChange = this.handleChange.bind(this);
//    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeFirstName = (event)=>{
    this.setState({fname:event.target.value});
  }
  handleChangeLastName = (event)=>{
    this.setState({lname:event.target.value});
  }
  handleChangeEmail = (event)=>{
    this.setState({email:event.target.value});
  }
  handleChangePassword = (event)=>{
    this.setState({password:event.target.value});
  }
  handleChangeConfPassword = (event)=>{
    this.setState({confPassword:event.target.value});
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    const url = config.SERVER_URL+'add_user';

    console.log(this.state.fname);
    console.log(this.state.lname);
    console.log(this.state.email);
    console.log(this.state.password);

    axios.post(url,{
      fname:this.state.fname,
      lname:this.state.lname,
      password:this.state.password,
      email:this.state.email
    })
    .then(response => {
      console.log("user authentication succed ");
      window.sessionStorage.setItem("user_id", response.data.user._id);
      this.props.history.push("/artisans");
    })
    .catch(err =>{
      console.log("user registration failed"+err);
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2> Create Account </h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label>FirstName</label>
              <input  type="text"
                      value={this.state.value}
                      onChange={this.handleChangeFirstName}
                    />
            </div>
            <div className="lastName">
              <label>Last Name</label>
              <input  type="text"
                      value={this.state.value}
                      onChange={this.handleChangeLastName}
                    />
            </div>
            <div className="email">
              <label>E-mail</label>
              <input  type="text"
                      value={this.state.value}
                      onChange={this.handleChangeEmail}
                    />
            </div>
            <div className="password">
              <label>Password</label>
              <input  type="password"
                      value={this.state.value}
                      onChange={this.handleChangePassword}
                    />
            </div>
            <div className="confPassword">
              <label>Confirm password</label>
              <input  type="password"
                      value={this.state.value}
                      onChange={this.handleChangeConfPassword}
                    />
            </div>
            <div className="createAccount">
              <button  type="submit"
                      value="Submit">
                      Create Account
              </button>
              <small>Already have an account ?<Link to="/user/login"> Log In</Link></small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserResgistration;
