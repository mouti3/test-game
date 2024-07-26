import React, {useContext} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import GamesList from "../components/GamesList";
import GamesDetails from "../components/GamesDetails";
const Stack = createStackNavigator();

export default function Games() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="List" options={{ headerShown: false }} component={GamesList} />
            <Stack.Screen name="Details"  options={{ headerShown: false }}   component={GamesDetails} />
        </Stack.Navigator>
    )
}
