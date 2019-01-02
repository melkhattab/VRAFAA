import React from 'react';
import {
  StyleSheet,View,TextInput
  ,Button, FlatList,Text,
  ActivityIndicator, Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  ImagePicker
}
from 'expo';
import _ from 'lodash'
import config from '../configuration';

//var RNFetchBlob = require('rn-fetch-blob').default
class Home extends React.Component {
  constructor(props) {
    super(props);
    const url = config.SERVER_URL+'upload';
    this.state = {
      video:null,
      url:url,
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
/*
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
  */

  takePicture = async() =>{
      //const data = FormData();
      const options = {
        mediaTypes:ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality:1,
        base64: true,
      }
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled){
        this.setState({
          video: result,
        });
        this._uploadVideo();
      }
  };
  _uploadVideo(){
    const data = new FormData();
    const video = this.state.video;
    data.append('name', 'avatar');
    data.append('fileData', {
      uri : video.uri,
      type: video.type,
      name: 'video.mp4.'
     });
     const config = {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      },
      body: data,
     };

    fetch(this.state.url + "upload", config)
     .then((response)=>{
       console.log(response);
     })
     .catch((err)=>{console.log(err)});
    console.log(data);
  }
  render(){
    const {artisan} = this.props;
    return(
      <View>
        <Text> Bonjour Mahmoud, your are at : </Text>

        <TouchableOpacity onPress={this.takePicture.bind(this)}>
          <Text>Take picture</Text>
        </TouchableOpacity>
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
