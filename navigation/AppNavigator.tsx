import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Games from '../screens/Games';
import Favourites from '../screens/Favourites';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen name="Games" component={Games} />
    <Tab.Screen name="Favourites" component={Favourites} />
  </Tab.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator