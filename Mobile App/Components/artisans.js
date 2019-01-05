
import React from 'react';
import {
  StyleSheet,View,TextInput
  ,Button, FlatList,Text,
  ActivityIndicator, Dimensions,
  TouchableOpacity
} from 'react-native';
import { Badge, Divider, SearchBar } from 'react-native-elements';
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
      fullData:[],
      query:''
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
      this.setState({
        artisans:responseJson.artisans,
        fullData:responseJson.artisans
      });
      this.setState({isLoading: false});
    })
    .catch((err)=>{
      console.log("error loading artisans "+err);
    });
  }
  _handleRequest(text){
    console.log(text);
    const query = text.toLowerCase();
    const filterdData = _.filter(this.state.fullData, artisan => {
      return this._contains(artisan, query);
    });
    this.setState({query:query, artisans:filterdData});
  }
  _contains(artisan, query){
    console.log("artisan name : "+artisan.fname+"  : query : "+query+" : test : "+artisan.fname.includes(query));
    if( artisan.fname.toLowerCase().includes(query)||
        artisan.lname.toLowerCase().includes(query)){
      return true ;
    }
    return false;
  }
  _renderSeparator = ()=>{
    return(
      <View
      style={{
        height:2,
        backgroundColor:"#CED0CE",
        width:"94%",
        marginLeft: "3%",
      }}
        />
    );
  };
  _handleRefresh = ()=>{
    console.log('l9lawwwwwwwwwwwwwwwwwiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
  }
  render(){
//    console.log('==========================each===================================');
    const {artisan} = this.props;
    return(
      this.state.isLoading ?
      <View style={{flex:1}}>
        <SearchBar  placeholder="search ..."
                    lightTheme round
                    cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={(text)=>this._handleRequest(text)}
                    />
          <View>
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#330066"/>
          </View>
        </View>
      </View>
      :
      <View style={{flex:1}}>
        <SearchBar  placeholder="search ..."
                    lightTheme round
                    cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    onChangeText={(text)=>this._handleRequest(text)}
                    />
        <Divider style={{ backgroundColor: 'blue', height:2 }} />
        <View>
          {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
          <FlatList
            style={{ paddingBottom: 20 }}
            data = {this.state.artisans}
            keyExtractor={(item) => item._id}
            onReachedThreshold={0.5}
            ItemSeparatorComponent={this._renderSeparator}
            onEndReached={()=>{
              console.log('end reached a mahmoud');
            }}
            renderItem = {({item}) => <ArtisanItem index={0} artisan={item} displayArtisanDetails={this._displayArtisanDetails} />}
            extraData={this.state}
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
    backgroundColor:'#E6E0F8'
  },
  textinput:{
    flex:1,
    borderRadius: 15,
    backgroundColor:'#BDBDBD',
    paddingBottom:5,
    paddingRight:10,
    marginBottom:10,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
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
