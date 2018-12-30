import React from 'react' ;
import config from '../configuration'
import {
  View, TextInput,
  FlatList, Button,
  StyleSheet, Text,
  Image, Icon,
  TouchableOpacity
} from 'react-native' ;
import Divider from 'react-native-elements'
import { Ionicons, Entypo } from '@expo/vector-icons';
var url = config.SERVER_URL;
class ArtisanItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      artisan: this.props.artisan,
      index: this.props.index
    }
  }
  registerVote(){
    artisan = this.props.artisan ;
    artisan.votes += 1 ;
    this.setState({artisan: artisan});

    params = {artisanId:this.state.artisan._id}
    fetch(url+"updatevote",{
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body:
                  JSON.stringify(params)
    })
    .then((response)=> {
      console.log("success updating vote"+url);
    })
    .catch((err)=>{
      console.log("error updating vote");
    });
    console.log("I like this artisan"+this.state.artisans);
  }
  render(){
    const {artisan, displayArtisanDetails, index} = this.props ;
    return(
      <View>
      <TouchableOpacity
          onPress={()=>displayArtisanDetails(artisan)}
          style={styles.main_container}>
          <Image
           style={styles.avatar}
           source={require('../assets/male.png')}
         />
         <View style={styles.content_container}>
           <View style={styles.header_container}>
               <Text style={styles.title_text}>{artisan.fname} {artisan.lname}</Text>
               <Entypo  name="heart-outlined"
                        size={26}
                        color="green"
                        onPress={()=>this.registerVote()}
              />
           </View>
           <View style={styles.description_container}>
              <Text  numberOfLines={2}
                    style={styles.description_text} >
                  {artisan.description}
              </Text>
             {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
           </View>
           <View style={styles.date_container}>
              <Text style={styles.date_text}>Created on 01/01/18 {artisan.videos.url}</Text>
              <Text style={styles.votes}>Votes : {artisan.votes}</Text>
           </View>
         </View>
      </TouchableOpacity>
      </View>
    )
  }
}
export default ArtisanItem

const styles = StyleSheet.create({
  main_container: {
    height: 120,
    flexDirection: 'row',
    backgroundColor:'#F2EFFB',

  },
  avatar: {
    width: 80,
    height: 80,
    marginTop: 20,
    marginLeft: 5,
//    backgroundColor: '#fff'
  },
  content_container: {
    flex: 1,
    margin: 5,
//    backgroundColor:'red',
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
    paddingLeft:5,
  },
  title_text:{
    fontWeight: 'bold',
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#666666'
  },
  description_container: {
    flex: 6,
    paddingLeft:5,
    paddingRight:5,
//    backgroundColor:'green'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
//    backgroundColor:'gray',
    flexDirection:'row',
    paddingLeft:5,
  },
  date_text: {
    flex:1,
    textAlign: 'left',
    fontSize: 10,
    color:'gray',
    fontStyle:'italic',
//    backgroundColor:'cyan',
  },
  votes:{
    fontSize: 14,
    fontWeight:'bold',
    textAlign: 'right',
//    color:'#fff',
    marginRight: 5,
//    backgroundColor:'black',
  },
  hr:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
})
