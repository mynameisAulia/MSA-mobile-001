import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PopBalloon = () => {
  const [category, setCategory] = useState('');
  const [word, setWord] = useState('');
  const [clue, setClue] = useState('');
  const [balloons, setBalloons] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);

  useEffect(() => {
    generateWord();
  }, []);

  const generateWord = () => {
    const words = {
      fruit: [
        { word: 'apple', clue: 'A common fruit' },
        { word: 'banana', clue: 'A yellow fruit' },
        // Add more words and clues here
      ],
    };

    const randomCategory = 'fruit'; // You can expand this to select a random category later
    const randomWord = words[randomCategory][
      Math.floor(Math.random() * words[randomCategory].length)
    ];

    setCategory(randomCategory);
    setWord(randomWord.word);
    setClue(randomWord.clue);

    const allLetters = [...randomWord.word];
    const randomWords = generateRandomWords(
      balloons.length,
      word.length,
      words[randomCategory]
    );
    const shuffledWords = shuffle([...allLetters, ...randomWords]);

    setBalloons(shuffledWords);
    setSelectedLetters([]);
  };

  const generateRandomWords = (count, wordLength, wordList) => {
    const randomWords = [];

    while (randomWords.length < count) {
      const randomWord =
        wordList[Math.floor(Math.random() * wordList.length)].word;
      if (!randomWords.includes(randomWord) && randomWord !== word) {
        randomWords.push(randomWord);
      }
    }

    return randomWords.slice(0, count - wordLength);
  };

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const selectLetter = (letter) => {
    if (selectedLetters.includes(letter)) {
      return;
    }

    const updatedSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(updatedSelectedLetters);

    if (updatedSelectedLetters.length === word.length) {
      const selectedWord = updatedSelectedLetters.join('');
      if (selectedWord === word) {
        alert('Congratulations! You spelled the word correctly.');
      } else {
        alert('Oops! Try again.');
        setSelectedLetters([]);
        setBalloons(
          shuffle([...word, ...generateRandomWords(balloons.length, word.length, words[randomCategory])])
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.clue}>{clue}</Text>
      <View style={styles.wordContainer}>
        {word.split('').map((letter, index) => (
          <View style={styles.selectedLetter} key={index}>
            <Text style={styles.letterText}>
              {selectedLetters.includes(letter) ? letter : ''}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.balloonContainer}>
        {balloons.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.balloon,
              selectedLetters.includes(item) && styles.disabledBalloon,
            ]}
            onPress={() => selectLetter(item)}
            key={index}
            disabled={selectedLetters.includes(item)}
          >
            <Text style={styles.letterText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={generateWord}>
        <Text style={styles.buttonText}>New Word</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clue: {
    marginBottom: 20,
  },
  wordContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectedLetter: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  letterText: {
    fontSize: 18,
  },
  balloonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  balloon: {
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  disabledBalloon: {
    backgroundColor: 'gray',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PopBalloon;
