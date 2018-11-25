import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator,TextInput } from 'react-native';
import Artisant from './Components/artisants';
export default class App extends React.Component {
  constractor(props){
    this.state = { text:'what are you looking for ?' }
  }
  render() {
    return (
      <Artisant /> 
    )
  }
}
