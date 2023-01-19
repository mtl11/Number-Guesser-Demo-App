import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../componets/Card';
import Colors from '../constants/colors';
import Input from '../componets/Input';
import MainButton from '../componets/MainButton';


const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);

    };
    
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99){
            Alert.alert('Invalid Number','Number has to be from 1 - 99',[{text:'okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss()
    };
    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
        <View style = {styles.numberScreen}>
            <Text style = {styles.numberText}> Confirmed Number</Text>
            <View style = {styles.numberContainer}>
                <Text style = {styles.numberTextContainer}>
                    {selectedNumber}
                </Text>
            </View>
            <MainButton onClick={() => props.onStartGame(selectedNumber)}>
                START GAME
            </MainButton>
        </View>
    }
    return (
        <TouchableWithoutFeedback onPress = {() => {
                Keyboard.dismiss()}
        }>
    <View style = {styles.screen}>
        <Text style = {styles.title}>New Game</Text>
        <Card style={styles.inputContainer}>
            <Text>Select a Number</Text>
            <Input style = {styles.input} 
            blurOnSubmit 
            autoCapitalize = "none" 
            autoCorrect ={false} 
            keyboardType = "number-pad" 
            maxLength = {2}
            onChangeText ={numberInputHandler}
            value = {enteredValue}
            
            />
            <View style= {styles.buttonContainer}>
                <View style = {styles.button}><Button title = "Reset" onPress = {resetInputHandler} color = {Colors.second}/></View>
                <View style = {styles.button}><Button title = "Confirm" onPress = {confirmInputHandler} color = {Colors.primary}/></View>
            </View>
        </Card>
        {confirmedOutput}
    </View>
    </TouchableWithoutFeedback>
    );
};
    


const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical:10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
        
    },
    input: {
        
        width: 50,
        textAlign: 'center'
    },
    numberScreen: {
        padding: 25,
        paddingTop: 20,
        width: '80%',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginTop: 20
    },
    numberText: {
        fontSize: 25,
        color: 'white'
    },
    numberContainer: {
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'white',
        padding: 10
    },
    numberTextContainer:{
        fontSize: 25,
        color: 'white'
    }
});

export default StartGameScreen;
