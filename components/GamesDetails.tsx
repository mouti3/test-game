import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground} from "react-native";
import {GamesContext} from "../context/GamesContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

function GamesDetails({route}) {
    const {currentGame, loadCurrentGame} = useContext(GamesContext);
    const id = route.params.itemId;


    const {handleFavourite} = useContext(GamesContext);
    const navigation = useNavigation();


    const backToHome = () => {
        navigation.goBack();
    }
    const addToFavouriteHandler = (isFavourite: boolean) => {
        handleFavourite(currentGame,isFavourite);
    }

    useEffect(() => {
        if(id) {
            loadCurrentGame(id)
        }
    },[route])
    if (!currentGame) {
        return  null;
    }
    return (
        <View style={styles.container}>
           <ImageBackground style={styles.headerContainer} source={{uri: currentGame.bannerURL}}>
               <TouchableOpacity onPress={backToHome}>
                   <Ionicons name="arrow-back-circle" size={32} />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => addToFavouriteHandler(!currentGame?.isFavourite)}>
                   <Ionicons name="heart" color={currentGame?.isFavourite ? 'black' : 'white'} size={32} />
               </TouchableOpacity>
        </ImageBackground>
            <View style={styles.imageContainer}>
                <View style={styles.image}>
                {currentGame?.iconURL && <Image  source={{
                    uri: currentGame.iconURL
                }} style={{
                    height:50,
                    width: 50
                }}/>}
                </View>
            </View>
           <View style={styles.detailsContainer}>
               <Text>
                   {currentGame.title}
               </Text>
               <Text>
                   {currentGame.rating}
               </Text>
           </View>
        </View>
    );
}

export default GamesDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flex: 2,
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
      marginTop: -100
    },
    detailsContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
})