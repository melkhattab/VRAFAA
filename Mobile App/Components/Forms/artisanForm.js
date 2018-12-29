import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import config from '../../configuration'
import ImagePicker from 'react-native-image-picker';
//var ImagePicker = require("react-native-image-picker")

class ArtisanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          fname:'Mahmoud',
          lname:'EL KHATTAB',
          description:'I am a moroccan ambitious student at'+
                      '2nd year of master\'s degree in CERI',
          creator:'',
          longitude: '',
          latitude:'',
          city:'',
          county:'',
          state: ''
    }
  }
  /* This method allow picking an image from gallery*/
  _loadPicture = ()=>{
    console.log("Looding an artisan's picture");
    const options = {
    };
    ImagePicker.showImagePicker(options, response=> {
      console.log('Response = ', response);
    });
  }
  /* This method add an artisan to the database */
  _setFirstName(fname){
    this.setState({fname:fname})
  }
  _setLastName(lname){
    this.setState({lname:lname})
  }
  _setDescription(desc){
    this.setState({description:desc})
  }
  _setRegion(){
    this.setState({city:'Paris'});
    this.setState({county:'île de france'});
    this.setState({state:'île de france'});
  }
  /*This method is to be updated with real creator */
  _setCreator(){
    this.setState({creator:'5bf9d3d2c01b69286ddfa5fc'})
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
        //this._setRegion();
      })
      .catch((err)=>{
        console.log("Geocoding failed => "+err);
      });
  }
  componentDidMount(){
    this._setCreator();
    navigator.geolocation.getCurrentPosition((position)=>{
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const url = config.API_GEOLOC+
                    config.API_GEOLOC_TOKEN+
                    config.LATITUDE+lat+config.LONGITUDE
                    +long+config.RESUL_FORMAT;
      this._locationGeoCoding(url);
      this.setState({
            latitude:lat,
            longitude:long
        });
    });
  }
  _addArtisan(){
      const url = config.SERVER_URL+'add_artisan';
      fetch(url,{
                method:'POST',
                headers:{
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(this.state),
              }
      )
      .then((response) =>response.json())
      .then((responseJson)=> {
        this.props.navigation.navigate("Artisants");
      })
      .catch((err)=>{
        console.log("error adding artisan "+err);
      });
  }
  _cancelAddingArtisan(){
      //this.props.navigation.navigate("Artisants");
  }

  /* Rendering the view ( form for adding an artisan to database )*/
  render(){
    return(
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
          <Text style={styles.header} > Artisan's form</Text>
          <TextInput  placeholder='First name'
                style={styles.textinput}
                onChangeText={(fname)=>this._setFirstName(fname)}/>
          <TextInput  placeholder='Last name'
                style={styles.textinput}
                onChangeText={(lname)=>this._setLastName(lname)}/>
          <TextInput  placeholder='Description'
                numberOfLines={2}
                multilines={true}
                style={styles.textinput}
                onChangeText={(desc)=>this._setDescription(desc)}/>

          <TouchableOpacity
              onPress={()=>this._addArtisan()}
              style={styles.buttonStyle}
              >
              <Text style={styles.btnText}>Add Artisan</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>this._cancelAddingArtisan()}
              style={styles.buttonStyle}
              >
              <Text style={styles.btnText} >Cancel</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default ArtisanForm
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#36485f',
    justifyContent:'center',
    paddingLeft:50,
    paddingRight:50
  },
  header:{
    fontSize:20,
    paddingBottom:10,
    color:'#fff',
    marginBottom:40,
    borderBottomColor:'#199187',
    borderBottomWidth:1
  },
  textinput:{
    alignSelf:'stretch',
    borderBottomColor:'#f8f8f8',
    color:'#fff',
    marginBottom:30,
    borderBottomWidth:1,
    height: 40,
  },
  buttonStyle:{
    alignSelf:'stretch',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
    marginTop:20,
    backgroundColor:'#59cbbd'
  },
  btnText:{
      color:'#fff',
      fontWeight:'bold'
  }
});
