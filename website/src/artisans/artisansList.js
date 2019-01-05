import React, { Component } from 'react';
import './style.css';
import axios from 'axios'

import config from '../config/configFile';

class ArtisansList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artisans: null,
    };

  }
  componentWillMount(){
    console.log("componentWillMount");
    this.handleRequest();

  }
  handleRequest(){
    console.log("Request Handling");
    const url = config.SERVER_URL+'allArtisans';
    axios.get(url)
    .then(response => {
      console.log("Get artisan's response with success: ");
      console.log(response);
    }).catch(err =>{
      console.log("Get artisan's response with error ");
      console.log(err);
    });
    console.log("hhhhhhhhhhhhhh");
  }
  render() {
    return (
      <div className="App">
        <button type="submit"
                value="Submit"
              >
                Create Account
        </button>
      </div>

    );
  }
}

export default ArtisansList;
