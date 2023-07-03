import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../config';

const quizData = [
  {
    question: 'What is the easiest way to gain someones trust online?',
    options: ['Impersonating a trusted authority figure', 
              'Creating a sense of urgency', 
              'Asking for personal information directly', 
              'Offering a financial reward'],
    correctAnswer: 'Impersonating a trusted authority figure',
  },
  {
    question: 'How can you manipulate someone into revealing their password?',
    options: ['Sending a phishing email with a fake login page', 
              'Offering a free gift in exchange for the password', 
              'Sending a threatening message demanding the password', 
              'Pretending to be a tech support representative'],
    correctAnswer: 'Sending a phishing email with a fake login page',
  },
  {
    question: 'What techniques can be used to exploit human psychology and deceive individuals online?',
    options: ['Social proof and authority', 
              'Fear and intimidation', 
              'Emotional manipulation', 
              'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    question: 'How can you trick someone into clicking on a malicious link or opening an infected file?',
    options: ['Using URL shorteners to mask the destination', 
              'Embedding the link in an enticing email', 
              'Creating a sense of urgency or curiosity'], 
    correctAnswer: 'Using URL shorteners to mask the destination',
  },
  {
    question: 'What are some effective ways to gather personal information from unsuspecting individuals?',
    options: ['Impersonating a customer service representative', 
              'Conducting a fake survey', 
              'Creating a fake social media account', 
              'All of the above'],
    correctAnswer: 'All of the above',
  },
];

const GameSEH = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
          raceScore: existingScores.raceScore || 0,
          hangmanScore: existingScores.hangmanScore || 0,
          sortingScore2: existingScores.sortingScore2 || 0,
          sortingScore3: existingScores.sortingScore3 || 0,
          sortingScore: existingScores.sortingScore || 0,
          gameScore2: score, // Add gameScore1 to the updatedScores object
          gameScore1: existingScores.gameScore1|| 0,
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

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === quizData[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 5);
    }
    setSelectedOption(selectedAnswer);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setTimeout(() => {
        setSelectedOption(null);
        setCurrentQuestion(nextQuestion);
      }, 1000); // Delay next question display by 1 second
    } else {
    setTimeout(() => {
      setShowScore(true);
      saveScore(score); // Call saveScore with the final score
    }, 1000); // Delay showing the final score by 1 second
  }
};
  return (
    <View style={styles.container}>
      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Your score: {score}</Text>
        </View>
      ) : (
        <View>
          <Image source={require('../assets/hacker1.png')} style={styles.birdImage} />
          <View style={styles.questionBubble}>
            <Text style={styles.questionText}>{quizData[currentQuestion].question}</Text>
          </View>
          {quizData[currentQuestion].options.map((option, index) => {
            const isCorrect = option === quizData[currentQuestion].correctAnswer;
            const isSelected = selectedOption === option;
            const isAnswered = selectedOption !== null;

            const buttonStyle = [
              styles.button,
              isSelected && (isCorrect ? styles.correctOption : styles.incorrectOption),
              isAnswered && !isSelected && isCorrect && styles.correctOption,
            ];

            const buttonTextStyles = [
              styles.buttonText,
              isSelected && (isCorrect ? styles.correctButtonText : styles.incorrectButtonText),
            ];

            return (
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => handleAnswer(option)}
                disabled={selectedOption !== null}
              >
                {isAnswered && isSelected && (
                  <Text style={buttonTextStyles}>{isCorrect ? 'Correct!' : 'Incorrect!'}</Text>
                )}
                <Text style={buttonTextStyles}>{option}</Text>
              </TouchableOpacity>
            );
          })}
          
          {currentQuestion === quizData.length - 1 && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setShowScore(true)}
              disabled={selectedOption === null}
            >
              <Text style={styles.nextButtonText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#3e5376",
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreBox: {
    backgroundColor: '#0e2954',
    borderRadius: 8,
    padding: 10,
    paddingBottom: -5,
    marginBottom: 20,
    marginRight: 5,
    alignSelf: 'flex-end',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#fff"
  },
  questionBubble: {
    backgroundColor: '#051021',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    backgroundColor: '#0e2954',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff'
  },
  selectedOption: {
    backgroundColor: '#F5F5F5',
  },
  correctOption: {
    backgroundColor: '#B3C890',
  },
  incorrectOption: {
    backgroundColor: '#FF6D60',
  },
  nextButton: {
    backgroundColor: '#FFD4B2',
    padding: 12,
    marginBottom: 10,
    alignSelf: 'flex-end',
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
  },
  birdImage: {
    width: 100, // Set the desired width of the image
    height: 100, // Set the desired height of the image
    marginTop: -5, // Adjust the spacing between the text and image as needed
    marginBottom: 10,
  },
});

export default GameSEH;
