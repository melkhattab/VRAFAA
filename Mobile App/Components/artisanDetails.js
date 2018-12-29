import React from 'react' ;
import config from '../configuration'
import {
  View, TextInput,
  FlatList, Button,
  StyleSheet, Text,
  Image, Icon,
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
  artisanDetails(){
    console.log("View more details");
  }
  render(){
    const artisan = this.props.navigation.state.params.artisan ;
    return(
      <View>
      <View style={styles.main_container}>
        <Image
         style={styles.image}
         source={{uri: "image"}}
       />
       <View style={styles.content_container}>
         <View style={styles.header_container}>
             <Text style={styles.title_text}>{artisan.fname} {artisan.lname}</Text>
             <Text style={styles.vote_text}>{artisan.votes}</Text>
             <Entypo  name="heart-outlined"
                      size={32}
                      color="green"
                      onPress={()=>this.registerVote()}
            />
         </View>
         <View style={styles.description_container}>
           <Text style={styles.description_text} >{artisan.description}</Text>
           {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
         </View>
       </View>
      </View>
      <View style={styles.videos_container}>
        <FlatList
          data = {artisan.videos}
          keyExtractor={(item) => item.url}
          renderItem = {({item}) => <VideoItem video={item}/>}
          />
      </View>
      </View>

    )
  }
}
export default ArtisanDetails

const styles = StyleSheet.create({
  main_container: {
    height: 160,
    flexDirection: 'row'
  },
  image: {
    width: 100,
    height: 140,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5,
    backgroundColor:'green',
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#666666'
  },
  description_container: {
    flex: 6
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  videos_container:{

    backgroundColor:'red'
  }
})
