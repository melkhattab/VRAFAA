import React from 'react' ;
import config from '../configuration'
import {
  View, TextInput,
  FlatList, Button,
  StyleSheet, Text,
  Image, Icon,
  TouchableOpacity
} from 'react-native' ;
import { Ionicons, Entypo } from '@expo/vector-icons';
var url = config.SERVER_URL;
class ArtisanItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      artisan: this.props.artisan
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
    const {artisan, displayArtisanDetails} = this.props ;
    return(
      <View>
      <TouchableOpacity
          onPress={()=>displayArtisanDetails(artisan)}
          style={styles.main_container}>
          <Image
           style={styles.image}
           source={require('../assets/male.png')}
         />
         <View style={styles.content_container}>
           <View style={styles.header_container}>
               <Text style={styles.title_text}>{artisan.fname} {artisan.lname}</Text>
               <Text style={styles.vote_text}>{artisan.votes}</Text>
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
              <Text style={styles.date_text}>More ... {artisan.videos.url}</Text>
           </View>
         </View>
      </TouchableOpacity>
      <View
        style={styles.hr}
      />
      </View>
    )
  }
}
export default ArtisanItem

const styles = StyleSheet.create({
  main_container: {
    height: 120,
    flexDirection: 'row',
    backgroundColor:'#36485f',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 5,
    //backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
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
    flex: 6
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    backgroundColor:'green'
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  hr:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
})
