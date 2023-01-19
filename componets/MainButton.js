import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Color from '../constants/colors';

const MainButton = props => {
    return (
    <TouchableOpacity onPress={props.onClick}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>
                {props.children}
            </Text>
        </View>
    </TouchableOpacity>
    )};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize:18
    }
});

export default MainButton;