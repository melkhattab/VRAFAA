import React from 'react';
import {StyleSheet, View, TextInput, Button, FlatList,Text} from 'react-native';
import artisants from '../Helpers/artisantData'

class Artisant extends React.Component {
  constructor() {
    super()
  }
  render(){
    return(
      <View style={{marginTop:20}}>
        <TextInput placeholder='Artisant name' style={styles.textinput}/>
        <Button style={{marginLeft:5}} title='Search' onPress={()=>{}}/>
        {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
        <FlatList
          data={artisants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <Text>{item.title} </Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
});
export default Artisant;
