import React, { Component } from 'react';
import axios from 'axios'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import config from '../config/configFile';
import MenuBar from '../includes/menuBar'
import  {Redirect} from 'react-router-dom'
class ArtisansList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artisans: null,
      fullData:null
    };
    this.handleRequest= this.handleRequest.bind(this)
    console.log('constructor');

  }
  componentDidMount(){
    console.log("componentWillMount");
    this.handleRequest();
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
  _winnersPerRegion = (event)=>{
    event.preventDefault();
    var allStates = [];
    this.state.artisans.map(artisan => {
      console.log(artisan.location.state);
      if(allStates.includes(artisan.location.state)=== false){
        allStates.push(artisan.location.state);
      }
    });
    if(this.state.artisans !== null){
      this.setState({fullData:this.state.artisans});
      this.setState({artisans:[]});
    }
    // selection the max
    var max_votes = 0 ;
    var winner = null;
    var winnersPerState = [];

    allStates.map(state => {
      this.state.artisans.map(artisan => {
        //console.log("maxvotes: "+max_votes+" : artisan : artisan : "+ artisan.fname+" :votes: "+artisan.votes +": state : "+artisan.location.state);
        if(artisan.votes >= max_votes && artisan.location.state === state ){
          max_votes = artisan.votes ;
          winner = artisan ;
        }
      });
      if(winner !== null){
        winnersPerState.push(winner) ;
      }
      winner = null ;
      max_votes = 0;
    });
    this.setState({fullData:this.state.artisans})
    this.setState({artisans:winnersPerState});

  }
  _allArtisans = (event)=>{
    if(this.state.fullData !== null){
      this.setState({artisans:this.state.fullData});
      this.setState({fullData:[]})
    }
  }

  render() {

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
          return(
            <button className=""
                    onClick={ (event)=>{
                      var winner_id = props.original.creator ;
                      console.log("the global winner is : ",props.original.creator)

                      const url = config.SERVER_URL+'setWinner';
                      console.log(" url ::::::::::::::: ", url);
                      axios.put(url, {
                        creator:winner_id,
                      })
                      .then(response => {
                        console.log("Winner is set");
                      }).catch(err =>{
                        console.log("Winner is not set", err);
                      });
                    }}>
              Winner
            </button>)
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
            <div style={{width:"26%", marginLeft:"64%"}}>
              <button  onClick={this._allArtisans}> All Artisans</button>
              <button  onClick={this._winnersPerRegion}> Winners Per Ragion Artisans</button>
            </div>
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

  }
}

export default ArtisansList;
