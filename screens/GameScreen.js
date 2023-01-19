import React, {useState, useRef, useEffect}from 'react';
import {View,Text, StyleSheet, Button, Alert, ScrollView, FlatList} from 'react-native';
import Card from '../componets/Card';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../componets/MainButton';
import { Ionicons } from '@expo/vector-icons';

const randomNumGen = (min, max, exclusive) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min))+min
    if (rndNum === exclusive){
        return randomNumGen(min,max,exclusive)
    } else {
        return rndNum
    }
}

// for flat list
const renderListItem = (listLength, itemData) => (
    <View style= {styles.listItem}>
        <Text style={DefaultStyles.bodyText}>#{listLength-itemData.index}</Text>
        <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>
)
/* // for scroll view
const renderListItem = (value, numOfRound) => (
    <View key = {value} style= {styles.listItem}>
        <Text style={DefaultStyles.bodyText}>#{numOfRound}</Text>
        <Text style={DefaultStyles.bodyText}>{value}</Text>
    </View>
)
*/

const GameScreen = props => {
    const initialGuess = randomNumGen(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver } = props;

    useEffect(()=>{
        if (currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t Lie', 'You know you were wrong bud', [{text: 'Sorry', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower'){
            currentHigh.current = currentGuess;
        } else{
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = randomNumGen(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1);

        setPastGuesses(currPastGuesses =>[nextNumber.toString(),...currPastGuesses])
    };
    return (
        <View style = {styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponents Guess</Text>
            <View style = {styles.numberContainer}>
                <Text style = {styles.numberTextContainer}>
                    {currentGuess}
                </Text>
            </View>
            <Card style = {styles.buttonContainer}>
                <MainButton onClick = {nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name = "md-remove" size={24} color= {Colors.primary}/>
                </MainButton>
                
                <MainButton onClick = {nextGuessHandler.bind(this, 'greater')}> 
                    <Ionicons name = "md-add" size={24} color= {Colors.primary}/>
                    
                </MainButton>
            </Card>
            <View style= {styles.listView}>
            {/*<ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
    </ScrollView>*/}
            <FlatList contentContainerStyle={styles.list}
            keyExtractor={(item)=> item} 
            data={pastGuesses} 
            renderItem={renderListItem.bind(this, pastGuesses.length)}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        alignItems: 'center',
        padding: 10
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    
    numberContainer: {
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'black',
        padding: 8,
        marginTop: 10
    },
    numberTextContainer:{
        fontSize: 25,
        color: Colors.primary
    },
    listItem:{
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: Colors.primary,
        justifyContent: 'space-between',
        //for flat list=
        width: '100%',
        //for scroll view=
        //width: '50%'
    },
    listView:{
        //for flat list=
        width: '60%',
        //for scroll view=
        //width: '75%',
        flex:1
    },
    list: {
        //alignItems: 'center', //for scroll view
        justifyContent: 'flex-end',
        flexGrow:1
    }
})

export default GameScreen;
