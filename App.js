
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './componets/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')

  });
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  if (!dataLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)}/>;
  }

  const configureNewGame =() => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

    let content = <StartGameScreen onStartGame={startGameHandler}/>

    if (userNumber && guessRounds <= 0){
      content = <GameScreen userChoice = {userNumber} onGameOver={gameOverHandler}/>
    } else if (guessRounds > 0) {
      content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart = {configureNewGame}/>;
    }

  return (
    <View style={styles.screen}>
     <Header title = "Guess The Number"/>
     {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1
  }
});