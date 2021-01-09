import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ReviewScreen from '../Screens/ReviewScreen';
import {Icon} from 'react-native-elements';


export const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions :{
      tabBarIcon:<Icon name = 'home' type = 'font-awesome' color='#000000'/>,
      tabBarLabel : "Home",
    }
  },
  Review: {
    screen: ReviewScreen,
    navigationOptions :{
      tabBarIcon : <Icon name = 'plus-square' type = 'font-awesome' color='#000000'/>,
      tabBarLabel : "Review",
    }
  }
});
