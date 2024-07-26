import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Games from './screens/Games';
import Favourites from './screens/Favourites';
import {GamesProvider} from './context/GamesContext';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <GamesProvider>
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Games" component={Games} />
          <Tab.Screen name="Favourites" component={Favourites} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
      </GamesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
