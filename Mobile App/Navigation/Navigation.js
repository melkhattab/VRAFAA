import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
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
  ArtisanForm:{
    screen:ArtisanForm
  },
  UserRegistration:{
    screen:UserAuthentification
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
  },
  SignIn:{
    screen:RegisterStack,
  },
  SignUp:{
    screen:SignInStack,
  },
});
export default createAppContainer(TabNavigator);
