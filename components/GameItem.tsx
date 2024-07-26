import React, {useContext} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Button} from "react-native";
import {Game} from "../models/Game";
import Ionicons from '@expo/vector-icons/Ionicons';
import {GamesContext} from "../context/GamesContext";
import {useNavigation} from "@react-navigation/native";


interface GameItemProps {
    item?: Game
}

const GameItem = ({item}: GameItemProps) => {
    const {handleFavourite} = useContext(GamesContext);
    const navigation = useNavigation();


    const goToDetails = () => {
        navigation.navigate('Details', {
            itemId: item?.id
        })
    }
    const addToFavouriteHandler = (isFavourite: boolean) => {
        handleFavourite(item,isFavourite);
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {item?.iconURL && <Image source={{
                    uri: item.iconURL
                }} style={{
                    height:50,
                    width: 50
                }}/>}
                <View>
                <Text>{item?.title}</Text>
                <Text>{item?.rating}</Text>
                </View>
                <View style={styles.favouriteContainer}>
                    <TouchableOpacity onPress={() => addToFavouriteHandler(!item?.isFavourite)}>
                    <Ionicons name="heart" color={item?.isFavourite ? 'black' : 'white'} size={32} />
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <Button title="Call To Action" onPress={goToDetails}>Call To Action</Button>
            </View>
        </View>
    );
}

export default GameItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 5,
        justifyContent: 'center',
        borderWidth: 1
    },
    body: {
      flex: 1,
      flexDirection: 'row',
        justifyContent: 'space-around'
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    favouriteContainer: {
        justifyContent: 'center'
    },
    favouriteBtn: {
        height: 40,
        width: 40
    }
})