import React, { Component } from 'react';
import './userRegistration.css';

class UserResgistration extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

//    this.handleChange = this.handleChange.bind(this);
//    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2> Create Account </h2>
          <form onSubmit={this.handleSubmit.bind(this)} noValidate>
            <div className="firstName">
              <label>FirstName</label>
              <input  type="text"
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                    />
            </div>
            <div className="lastName">
              <label>Last Name</label>
              <input  type="text"
                      value={this.state.value}
                      onChange={this.state.value}
                    />
            </div>
            <div className="email">
              <label>E-mail</label>
              <input  type="text"
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                    />
            </div>
            <div className="password">
              <label>Password</label>
              <input  type="password"
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                    />
            </div>
            <div className="confPassword">
              <label>Confirm password</label>
              <input  type="password"
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                    />
            </div>
            <div className="createAccount">
              <button  type="submit"
                      value="Submit"
                      onClick={this.handleSubmit.bind(this)}>
                      Create Account
              </button>
              <small>Already have an account ?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserResgistration;
