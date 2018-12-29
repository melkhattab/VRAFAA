import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity, KeyboardAvoidingView,
} from 'react-native';
import config from '../../configuration';
class UserAuthentification extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: 'mahmoud',
      lname: 'elkhattab',
      email:'email@email.com',
      password:'pass',
      confirmPass:'pass'
    };

  }
  _verifyPassword(){

  }
  _addUser(){
    if(this.state.confirmPass===this.state.password ){
      console.log('Post request for adding user : '+this.state);
      const {navigate} = navigation ;
      navigate("Artisants")
      /* -- This code marche bien
      const url = config.SERVER_URL+'add_user';
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
        console.log(responseJson);
        console.log("HOST_NAME:"+ config.SERVER_URL);
      })
      .catch((err)=>{
        console.log("error adding artisan "+err);
      });
      */
    }
    else{
      console.log('passwords do not match');
    }
  }
  _cancelAddingUser(){
    console.log('cancel adding user to dbase');
  }
  render(){
    return(
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.header} > Authentification</Text>
          <TextInput  placeholder='E-mail'
                style={styles.textinput}
                onChangeText={(email)=>this.setState({email:email})}/>
          <TextInput  placeholder='Password'
                secureTextEntry={true}
                style={styles.textinput}
                onChangeText={(password)=>this.setState({password:password})}/>
          <TouchableOpacity
              onPress={()=>this._addUser()}
              style={styles.buttonStyle}
              >
              <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

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
    paddingBottom:8,
    color:'#fff',
    marginBottom:30,
    borderBottomColor:'#199187',
    borderBottomWidth:1,
    textAlign:'center',
  },
  textinput:{
    alignSelf:'stretch',
    borderBottomColor:'#f8f8f8',
    color:'#fff',
    marginBottom:30,
    borderBottomWidth:1,
    height: 30,
  },
  buttonStyle:{
    alignSelf:'stretch',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
    marginTop:15,
    backgroundColor:'#59cbbd',

  },
  btnText:{
      color:'#fff',
      fontWeight:'bold'
  }
});
export default UserAuthentification;
