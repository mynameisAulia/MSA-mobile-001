import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { Svg, Circle, Line } from 'react-native-svg';
import { firebase } from './config';
import ScamImage3 from "./assets/victim.png";
import ScamImage2 from "./assets/scam3.png";
import ScamImage4 from "./assets/scam5.png";

const initialWordsList = [
  { word: 'phishing', clue: 'Fraudulent attempt to obtain sensitive information' },
  { word: 'baiting', clue: 'Enticing someone into a trap or committing a crime' },
  { word: 'smishing', clue: 'Fraudulent attempt via SMS or text messages' },
  { word: 'social engineering', clue: 'Manipulating individuals to divulge sensitive information' },
  { word: 'scam', clue: 'Deceptive scheme or trick' },
];

const HangmanDrawing = ({ remainingAttempts }) => {
  const svgStyles = {
    stroke: 'black',
    strokeWidth: 2,
    fill: 'none',
  };

  const parts = [
    // Pole
    <Line key="pole" x1="20" y1="180" x2="20" y2="20" style={svgStyles} />,
    <Line key="top-line" x1="20" y1="20" x2="100" y2="20" style={svgStyles} />,
    <Line key="top-pole" x1="100" y1="20" x2="100" y2="50" style={svgStyles} />,
    // Head
    <Circle key="head" cx="100" cy="65" r="15" style={svgStyles} />,
    // Body
    <Line key="body" x1="100" y1="80" x2="100" y2="140" style={svgStyles} />,
    // Left arm
    <Line key="left-arm" x1="100" y1="100" x2="70" y2="90" style={svgStyles} />,
    // Right arm
    <Line key="right-arm" x1="100" y1="100" x2="130" y2="90" style={svgStyles} />,
    // Left leg
    <Line key="left-leg" x1="100" y1="140" x2="80" y2="170" style={svgStyles} />,
    // Right leg
    <Line key="right-leg" x1="100" y1="140" x2="120" y2="170" style={svgStyles} />,
  ];

  return (
    <Svg height="200" width="200">
      {parts.slice(0, -remainingAttempts)}
    </Svg>
  );
};

const Hangman = () => {
  const [selectedWord, setSelectedWord] = useState(initialWordsList[0]);
  const [wordsList, setWordsList] = useState([...initialWordsList]);
  const [word, setWord] = useState('');
  const [clue, setClue] = useState('');
  const [guess, setGuess] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [displayWord, setDisplayWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const firebaseConfig = require('./config'); // Import Firebase configuration from firebase.js
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    startNewGame();
  }, []);

  const startNewGame = () => {
    if (wordsList.length === 0) {
      setGameOver(true);
      Alert.alert('Game Over', 'You have guessed all words!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * wordsList.length);
    const randomWord = wordsList[randomIndex].word.toUpperCase().replace(/\s/g, '');
    const randomClue = wordsList[randomIndex].clue;

    setWord(randomWord);
    setClue(randomClue);

    const updatedWordsList = [...wordsList];
    updatedWordsList.splice(randomIndex, 1);
    setWordsList(updatedWordsList);

    setGuess('');
    setRemainingAttempts(6);
    setDisplayWord('-'.repeat(randomWord.length));
    setGuessedLetters([]);
    setGameOver(false);
  };

  const handleGuess = () => {
    const letter = guess.trim().toUpperCase();
    setGuess('');

    if (!letter) {
      Alert.alert('Invalid Guess', 'Please enter a letter.');
      return;
    }

    if (guessedLetters.includes(letter)) {
      Alert.alert('Duplicate Guess', 'You already guessed this letter. Try a different one.');
      return;
    }

    setGuessedLetters([...guessedLetters, letter]);

    if (word.includes(letter)) {
      let newDisplayWord = '';

      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          newDisplayWord += letter;
        } else {
          newDisplayWord += displayWord[i] === '-' ? '-' : word[i];
        }
      }

      setDisplayWord(newDisplayWord);

      if (newDisplayWord === word) {
        setScore(score + 5);
        Alert.alert('Congratulations!', `You won the round! Your score is ${score + 5}.`);
        saveScore(score + 5);
        startNewGame();
      }
    } else {
      setRemainingAttempts(prevAttempts => prevAttempts - 1);

      if (remainingAttempts === 1) {
        setGameOver(true);
        Alert.alert('Game Over', `You lost! The word was "${word}".`);
        saveScore(0);
        startNewGame();
      }
    }
  };

   const saveScore = async (score) => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      const usersRef = firebase.firestore().collection('users');
      const userDoc = await usersRef.doc(userId).get();

      if (userDoc.exists) {
        const username = userDoc.data().username;
        const scoreRef = firebase.firestore().collection('scores').doc(userId);
        const scoreDoc = await scoreRef.get();
        const existingScores = scoreDoc.exists ? scoreDoc.data() : {};
        const updatedScores = {
          username: username,
          hangmanScore: score,
          sortingScore2: existingScores.sortingScore2 || 0,
          raceScore: existingScores.raceScore || 0,
          sortingScore3: existingScores.sortingScore3 || 0,
          sortingScore: existingScores.sortingScore|| 0,
          gameScore1: existingScores.gameScore1|| 0,
          gameScore2: existingScores.gameScore2|| 0,
          gameScore3: existingScores.gameScore3|| 0,
          gameScore4: existingScores.gameScore4|| 0,
        };
        await scoreRef.set(updatedScores);
      } else {
        console.error('User document not found.');
      }
    }
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

  return (
    <View style={styles.container}>
      <View style={{ width: "auto", height: 55, flexDirection: "row", alignItems: 'center', paddingRight: 10,
        marginBottom: 10, borderWidth: 1.5, borderColor: '#cca9a9', borderRadius: 5, backgroundColor: '#FFD4D4'}}>
      <Image source={ScamImage3} style={{width: 40, height: 40, marginLeft: 10 }} />
        <Text style={{fontSize: 20, fontWeight: "bold", color: "#333", marginLeft: 5}}>Word: {displayWord}</Text>
    </View>

      <View style={{ width: "auto", height: 55, flexDirection: "row", alignItems: 'center', paddingRight: 10,
        marginBottom: 10, marginRight: 20, marginLeft: 20, borderWidth: 1.5, borderColor: '#a4ba73', 
        borderRadius: 5, backgroundColor: '#CDE990'}}>
      <Image source={ScamImage2} style={{width: 40, height: 40, marginLeft: 10 }} />
        <Text style={{fontSize: 16, color: "#333", marginLeft: 5}}>Clue : {clue}</Text>
    </View>

      <View style={{ width: "auto", height: 55, flexDirection: "row", alignItems: 'center', paddingRight: 10,
        marginBottom: 10, borderWidth: 1.5, borderColor: '#cca9a9', borderRadius: 5, backgroundColor: '#FFD4D4'}}>
      <Image source={ScamImage4} style={{width: 40, height: 40, marginLeft: 10 }} />
        <Text style={{fontSize: 16, color: "#333", marginLeft: 5}}>Remaining Attempt : {remainingAttempts}</Text>
    </View>

      <View style={styles.hangman}>
        <HangmanDrawing remainingAttempts={remainingAttempts} />
      </View>
      <Text style={styles.score}>Score: {score}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a letter"
        onChangeText={text => setGuess(text)}
        value={guess}
        maxLength={1}
      />
      <Button title="Guess" onPress={handleGuess} disabled={gameOver} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  sectionContainer1: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD4D4',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#FFD4D4',
  },
  sectionContainer2: {
    marginBottom: 10,
    borderWidth: 10,
    borderColor: '#CDE990',
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#CDE990',
    justifyContent: 'center',
  },
  sectionContainer3: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD4D4',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#FFD4D4',
  },
  word: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  clue: {
    fontSize: 16,
  },
  attempts: {
    fontSize: 15,
  },
  hangman: {
    marginBottom: 0,
  },
  score: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Hangman;
