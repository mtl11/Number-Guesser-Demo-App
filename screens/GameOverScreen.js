import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import DefaultStyles from '../constants/default-styles'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainButton from '../componets/MainButton';

const GameOverScreen = props => {
    return(
    <View style ={styles.screen}>
    <Text style = {DefaultStyles.title}>The Game is Over</Text>
    <View style = {styles.imageContainer}>
        <Image 
        //This is for local images
        //source={require('../assets/success.png')}
        // For images on Web
        source={{uri: 'https://cache.desktopnexus.com/thumbseg/836/836599-bigthumbnail.jpg'}} 
        style={styles.image}
        resizeMode = {'cover'}
        /> 
    </View>
    <View style = {styles.resultContainer}>
        <Text style = {DefaultStyles.title}>
            This AI needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess your number of <Text style={styles.highlight}>{props.userNumber}</Text> 
        </Text>
    </View>
    <MainButton onClick = {props.onRestart}>
        RESTART GAME
    </MainButton>
    </View>
    )};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
        
    }
});

export default GameOverScreen;
