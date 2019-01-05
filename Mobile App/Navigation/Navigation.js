import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Artisans from '../Components/artisans'
import UserAuthentification from '../Components/Forms/userAuthentification';
import UserRegistration from '../Components/Forms/userRegistration';
import ArtisanForm from '../Components/Forms/artisanForm';
import ArtisanDetails from '../Components/artisanDetails' ;
import Home from '../Components/home' ;

const HomeStack = createStackNavigator({

  Artisants: {
    screen:Artisans,
  },
  Home: {
    screen:Home,
  },
  ArtisanDetails:{
    screen:ArtisanDetails
  },
});

const RegisterStack = createStackNavigator({
  UserRegistration:{
    screen:UserRegistration
  },
  Artisants: {
    screen:Artisans,
  },
});

const SignInStack = createStackNavigator({

  UserRegistration:{
    screen:UserAuthentification
  },
  ArtisanForm:{
    screen:ArtisanForm
  },
  Artisants: {
    screen:Artisans,
  },
});

/*
const RegisterStack = createAppContainer(RegisterStack);
export default RegisterStack ; */

const TabNavigator = createBottomTabNavigator({
  Home:{
    screen:HomeStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name={'ios-home'}
          size={26}
          style={{ color: tintColor }}
          />
      )
    }
  },
  SignUp:{
    screen:RegisterStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name={'ios-person-add'}
          size={26}
          style={{ color: tintColor }}
          />
      )
    }
  },
  SignIn:{
    screen:SignInStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name={'ios-log-in'}
          size={26}
          style={{ color: tintColor }}
          />
      )
    }
  },
  addArtisan:{
    screen:ArtisanForm,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name={'ios-person-add'}
          size={26}
          style={{ color: tintColor }}
          />
      )
    }
  },
});
export default createAppContainer(TabNavigator);
