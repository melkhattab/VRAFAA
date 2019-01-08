import React, { Component } from 'react';
import axios from 'axios'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import config from '../config/configFile';
import MenuBar from '../includes/menuBar'
import  {Redirect} from 'react-router-dom'
class WinnerPerRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: null,
      data:[]
    };
    this.handleRequest= this.handleRequest.bind(this)
    console.log('constructor');

  }
  componentWillMount(){
    console.log("componentWillMount");
    this.handleRequest();
  }
  componentDidMount(){
    console.log("componentDidlMount");
    console.log(this.state.artisans);
    console.log('hhhh');
  }
  componentWillUnMount(){
    console.log("componentWillUnMount");
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
    console.log(this.state.artisans);
    console.log('rendering');
    const columns=[
      {
        Header:"First Name",
        accessor:"fname",
        sortable:false,
        width:120,
        minWidth:120,
        maxWidth:120,
      },
      {
        Header:"Last Name",
        accessor:"lname",
        sortable:false,
        width:120,
        minWidth:120,
        maxWidth:120,

      },
      {
        Header:"Description",
        accessor:"description",
        sortable:false
      },
      {
        Header:"Votes",
        accessor:"votes",
        width:60,
        minWidth:60,
        maxWidth:60,
      },
      {
        Header:"State",
        accessor:"location.state",
      },
      {
        Header:"County",
        accessor:"location.county",
        sortable:false,
        width:100,
        minWidth:100,
        maxWidth:100,
      }
      ,
      {
        Header:"City",
        accessor:"location.city",
        sortable:false,
        width:100,
        minWidth:100,
        maxWidth:100,
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

    var user_id = window.sessionStorage.getItem("user_id");
    console.log("artisans list : user id : "+user_id);
//    if(user_id !== "null" && user_id !== null){
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
              showPagination={true}
              defaultPageSize={5}
              className="-striped -highlight"
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
  /*
    }
    else{
      console.log("gvvvvvvvvvvvvvvvvvvvvvvvvv");
      return(<Redirect to="/user/login" />);
    }*/
  }
}

export default WinnerPerRegion;
