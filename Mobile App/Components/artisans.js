
import React from 'react';
import {
  StyleSheet,View,TextInput
  ,Button, FlatList,Text,
  ActivityIndicator, Dimensions,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash'
import artisans from '../Helpers/artisanData'
import ArtisanItem from './artisanItem'
import config from '../configuration'
class Artisan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artisans:[],
      isLoading: true,
    }
  }
  _displayArtisanDetails = (artisan)=>{
    const {navigate} = this.props.navigation ;
    navigate("ArtisanDetails", {artisan:artisan})
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const url = config.API_GEOLOC+
                    config.API_GEOLOC_TOKEN+
                    config.LATITUDE+lat+config.LONGITUDE
                    +long+config.RESUL_FORMAT;
      this._locationGeoCoding(url);
    });
  }
  _locationGeoCoding(url){
      fetch(url)
      .then((response) =>response.json())
      .then((responseJson)=> {
        console.log('Geocodin result: '+JSON.stringify(responseJson));
        this._loadArtisans(
              responseJson.address.state,
              responseJson.address.county,
              responseJson.address.city
        );
        //this._setRegion();
      })
      .catch((err)=>{
        console.log("Geocoding failed => "+err);
      });
  }
  _loadArtisans(state, county, city){
    this.setState({isLoading:true});
    const url = config.SERVER_URL+"artisans";
    fetch(url,{
              method:'POST',
              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({state:state,city:city,county:county}),
    })
    .then((response) =>response.json())
    .then((responseJson)=> {
      this.setState({artisans:responseJson.artisans});
      this.setState({isLoading: false});
    })
    .catch((err)=>{
      console.log("error loading artisans "+err);
    });
  }
  _registrationForm(){
    const {navigate} = this.props.navigation ;
    navigate("UserRegistration");
  }
  render(){
//    console.log('==========================each===================================');
    const {artisan} = this.props;
    return(
      this.state.isLoading ?
      <View style={{flex:1}}>
        <View style={styles.searchBar}>
          <TextInput  placeholder='First name'
                style={styles.textinput}
                placeholderTextColor='#fff'
                onChangeText={(fname)=>this.setState({fname:fname})}/>
          <TouchableOpacity
              onPress={()=>this._registrationForm()}
              style={styles.buttonStyle}
              >
              <Text style={styles.btnText} >Search</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#330066"/>
          </View>
        </View>
      </View>
      :
      <View style={{flex:1}}>
        <View style={styles.searchBar}>
          <TextInput  placeholder="Artisan's name"
                style={styles.textinput}
                placeholderTextColor='#fff'
                onChangeText={(fname)=>this.setState({fname:fname})}/>
          <TouchableOpacity
              onPress={()=>this._registrationForm()}
              style={styles.buttonStyle}
              >
              <Text style={styles.btnText} >Search</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
          <FlatList
            style={{ paddingBottom: 20 }}
            data = {this.state.artisans}
            keyExtractor={(item) => item._id}
            onReachedThreshold={0.5}
            onEndReached={()=>{
              console.log('end reached a mahmoud');
            }}
            renderItem = {({item}) => <ArtisanItem artisan={item} displayArtisanDetails={this._displayArtisanDetails} />}
            />
        </View>
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
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
export default Artisan;
