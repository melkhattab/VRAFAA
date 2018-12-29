import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ScrollView
} from 'react-native';
class ContentWithScroll extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

  }
  render(){
    return(
      <ScrollView
        scrolledEnabled={false}
        onContentSizeChange={this.onContentSizeChange}>
        <View style={styles.container}>
            <Text>
            hhhhhhhhhhhjvf_gkplkxvsgjjbdbssgvxbshvfyghbsjhsxgdygd_gbdd_uugd
            hhhhhhhhhhhjvf_gkplkxvsgjjbdbssgvxbshvfyghbsjhsxgdygd_gbdd_uugd
            hhhhhhhhhhhjvf_gkplkxvsgjjbdbssgvxbshvfyghbsjhsxgdygd_gbdd_uugd
            
            </Text>
        </View>
      </ScrollView>
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
    borderBottomWidth:1
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
export default ContentWithScroll;
