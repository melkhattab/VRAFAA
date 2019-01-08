import React, { Component } from 'react';
import axios from 'axios'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import config from '../config/configFile';
import MenuBar from '../includes/menuBar'
class ArtisansList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artisans: null,
    };
    this.handleRequest= this.handleRequest.bind(this)
    console.log('constructor');

  }
  componentWillMount(){
    console.log("componentWillMount");
    this.handleRequest();
  }
  handleRequest(){
    console.log("Request Handling");
    const url = config.SERVER_URL+'allArtisans';
    axios.post(url)
    .then(response => {
      console.log("Get artisan's response with success: ");
      this.setState({artisans:response.data.artisans});
    }).catch(err =>{
      console.log("Get artisan's response with error ");
      console.log(err.response.data);
    });
  }

  render() {

    const columns=[
      {
        Header:"First Name",
        accessor:"fname"
      },
      {
        Header:"Last Name",
        accessor:"lname",

      },
      {
        Header:"Votes",
        accessor:"votes",

      },
      {
        Header:"State",
        accessor:"location.state",
        sortable:false
      },
      {
        Header:"County",
        accessor:"location.county",
        sortable:false
      }
      ,
      {
        Header:"City",
        accessor:"location.city",
        sortable:false
      },
      {
        Header:"Description",
        accessor:"description",
        sortable:false
      },
      {
        Header:"Actions",
        Cell: props=>{
          return(<button className="">Choisir</button>)
        },
        width:100,
        minWidth:100,
        maxWidth:100,
      },
    ]

    const artisans = this.state.artisans;
    if(artisans){
      return(
        <div>
          <MenuBar />
          <div style={{width:"80%", marginLeft:"10%"}}>
          <ReactTable
            columns={columns}
            data={artisans}
            noDataText={"Please wait until we bring data for you ..."}
            showPagination={false}
            >
          </ReactTable>
          </div>
        </div>
      );
    }
    else{
      return(
        <div> Downloading ...</div>
      )
    }
  }
}

export default ArtisansList;
