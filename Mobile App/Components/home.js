import React from 'react';
import {
  StyleSheet,View,TextInput
  ,Button, FlatList,Text,
  ActivityIndicator, Dimensions,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash'
import config from '../configuration';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artisans:[],
      isLoading: true,
      latitude:null,
      longitude:null,
      city:'',
      county:'',
      state:''
    }
  }
  _locationGeoCoding(url){
      fetch(url)
      .then((response) =>response.json())
      .then((responseJson)=> {
        console.log('Geocodin result: '+JSON.stringify(responseJson));
        this.setState({
              state:responseJson.address.state,
              county:responseJson.address.county,
              city: responseJson.address.city
        });
      })
      .catch((err)=>{
        console.log("Getting state, county and city failed"+err);
      });
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const url = config.API_GEOLOC+
                    config.API_GEOLOC_TOKEN+
                    config.LATITUDE+lat+config.LONGITUDE
                    +long+config.RESUL_FORMAT;
      rponse = this._locationGeoCoding(url);
      console.log('wal3adaw ha resultat : '+rponse);
      this.setState({
            latitude:lat,
            longitude:long
        });
    });
  }
  render(){
    const {artisan} = this.props;
    return(
      <View>
        <Text> Bonjour Mahmoud, your are at : </Text>
        <Text> Your Longitude: {this.state.longitude}</Text>
        <Text> Your Latitude : {this.state.latitude}</Text>
        <Text> City Name:   {this.state.city} </Text>
        <Text> Departement: {this.state.county}  </Text>
        <Text> Region Name: {this.state.state} </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  activityIndicator: {
    flex:1,
    marginTop: 150,
    justifyContent:"center",
    alignItems: "center",
  },
  searchBar:{
    flexDirection:'row',
    marginLeft:10,
    marginRight:10
  },
  textinput:{
    flex:1,
    borderRadius: 15,
    backgroundColor:'#36485f',
    paddingBottom:5,
    paddingRight:10,
    marginBottom:10,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    //borderBottomColor:'#199187',
    borderBottomWidth:1,
    color:'#fff',
    fontWeight:'bold',

  },
  buttonStyle:{
    marginBottom:10,
    marginTop:10,
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#59cbbd',
    borderRadius:25,
    color:'#fff',
    fontWeight:'bold',
    width:80
  },
  btnText:{
      color:'#fff',
      fontWeight:'bold'
  },
  hr:{
    borderBottomColor:'black',
    borderBottomWidth: 1,
  },
});
export default Home;
