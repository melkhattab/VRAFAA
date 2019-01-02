import React from 'react' ;
import config from '../configuration'
import {
  View, TextInput,
  FlatList, Button,
  StyleSheet, Text,
  Image, Icon,ScrollView
} from 'react-native' ;
import { Ionicons, Entypo } from '@expo/vector-icons';
import VideoItem from './VideoItem'
// var url = "http://192.168.43.93:3000/";
var url = config.SERVER_URL;
class ArtisanDetails extends React.Component{
  constructor(props){
    super(props)
  }
  registerVote(){
    // Artisan = this.props.Artisan ;
    // Artisan.votes += 1 ;
    // this.setState({Artisan: Artisan});
    //
    // params = {ArtisanId:this.state.Artisan._id}
    // fetch(url,{
    //             method: 'PUT',
    //             headers: {
    //               'Accept': 'application/json',
    //               'Content-Type': 'application/json'
    //             },
    //             body:
    //               JSON.stringify(params)
    // })
    // .then((response)=> {
    //   console.log("success updating vote"+url);
    // })
    // .catch((err)=>{
    //   console.log("error updating vote");
    // });
    console.log("I like this artisan"+this.state.artisans);
  }
  _displayArtisan(){
    const artisan = this.props.navigation.state.params.artisan ;
    return (
        <ScrollView style={styles.scrollview_container}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Image
              style={styles.image}
              source={require("../assets/male.png")}
            />
            <Text style={styles.title_text}>{artisan.fname} {artisan.lname}</Text>
          </View>
          <View>
            <Text style={styles.description_text}>{artisan.description} </Text>
            <Text style={styles.default_text}>Votes : {artisan.votes} times</Text>
            <Text style={styles.default_text}>Created on : 01/01/2018</Text>
            <Text style={styles.default_text}>Created by : EL KHATTAB Mahmoud</Text>
          </View>
        </ScrollView>
      );
  }
  render(){
    return(
      <View style={styles.main_container}>
        {this._displayArtisan()}
      </View>
    );
  }
}
export default ArtisanDetails

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 180,
    width: 180,
    marginTop: 10,
    flex:1,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
  }
})
