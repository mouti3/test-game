import React, {useContext} from 'react'
import {FlatList, Text, View} from 'react-native'
import {GamesContext} from "../context/GamesContext";
import GameItem from "../components/GameItem";

const Favourites = () => {
    const {favourites} = useContext(GamesContext);
    return (
        <View>
            <FlatList
                data={favourites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <GameItem item={item}/>
                )}
            />
        </View>)
}

export default Favourites