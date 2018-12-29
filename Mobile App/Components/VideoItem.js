import React from 'react' ;
import {
  View, TextInput,
  FlatList, Button,
  StyleSheet, Text,
  Image, Icon,
  TouchableOpacity
} from 'react-native' ;

import { Ionicons, Entypo } from '@expo/vector-icons';
var url = "http://192.168.43.93:3000/";
//const url = "http://192.168.0.14:3000/";
class VideoItem extends React.Component{
  constructor(props){
    super(props)
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
    const {video} = this.props ;
    return(
      <TouchableOpacity
          style={styles.video_container}>
          <View style={styles.image}>
            <Image
             source={{uri: "image"}}
           />
         </View>
         <View style={styles.video_content}>
           <View style={styles.video_title}>
             <Text style={styles.description_text} >{video.url}</Text>
           </View>
           <View style={styles.duration_container}>
              <Text style={styles.date_text}>Duration {video.duration}</Text>
           </View>
         </View>
      </TouchableOpacity>
    )
  }
}
export default VideoItem

const styles = StyleSheet.create({
  videos_container: {
    flex:1,
    height: 70,
    flexDirection: 'column'
  },
  video_content:{
    backgroundColor:'green'
  },
  image: {
    width: 60,
    height: 70,
    margin: 10,
    backgroundColor: 'gray'
  }
})
