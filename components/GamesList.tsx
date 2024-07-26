import React, {useContext} from 'react';
import {FlatList, View} from "react-native";
import GameItem from "./GameItem";
import {GamesContext} from "../context/GamesContext";
import {useNavigation} from "@react-navigation/native";


function GamesList(){
const {games} = useContext(GamesContext);

    return (
        <View>
            <FlatList
                data={games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <GameItem item={item}/>
                )}
            />
        </View>
    )
}

export default GamesList;