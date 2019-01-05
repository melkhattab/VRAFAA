import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator,TextInput } from 'react-native';
import Artisan from './Components/artisans';
import TabNavigator from './Navigation/Navigation'
import ArtisanForm from './Components/Forms/artisanForm'
import UserAuthentification from './Components/Forms/userAuthentification'
import UserRegistration from './Components/Forms/userRegistration'
import ContentWithScroll from './Components/scrollContent'
import Home from './Components/home'
export default class App extends React.Component {
  constractor(props){
    this.state = { text:'what are you looking for ?' }
  }
  render() {
    return (
      <TabNavigator />
    )
  }
}
