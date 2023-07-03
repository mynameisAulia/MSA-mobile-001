import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../config';

const quizData = [
  {
    question: 'What are some common types of online fraud and how can you avoid becoming a victim?',
    options: ['Phishing: Be cautious of unsolicited requests for personal information', 
              'Identity theft: Safeguard your personal information and use easy password', 
              'Online scams: Verify the legitimacy of offers before providing payment', 
              'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    question: 'How can you recognize and report online scams targeting individuals?',
    options: ['Researching the organization or individual before engaging', 
              'Reporting scams to your local consumer protection agency', 
              'Sharing information about scams with friends and family', 
              'All of the above'],
    correctAnswer: 'Researching the organization or individual before engaging',
  },
  {
    question: 'What steps can you take to verify the authenticity of online sellers and protect yourself from counterfeit goods?',
    options: ['Checking customer reviews and ratings of the seller', 
              'Verifying the websites security features and contact information', 
              'Using trusted online marketplaces with buyer protection policies', 
              'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    question: 'How can you protect your financial information while making online payments or transactions?',
    options: ['Using secure payment methods, such as PayPal or credit cards', 
              'Checking for SSL encryption and secure website indicators', 
              'Avoiding entering payment information on untrusted or unfamiliar sites', 
              'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    question: 'What are some red flags to watch out for when dealing with potential fraudulent websites or services?',
    options: ['Poor website design or numerous spelling errors', 
              'Requests for payment through non-traditional methods (e.g., gift cards)', 
              'Unrealistically low prices or offers that seem too good to be true', 
              'All of the above'],
    correctAnswer: 'All of the above',
  },
];

const GameScV = () => {
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
          gameScore3: score, // Add gameScore1 to the updatedScores object
          gameScore2: existingScores.gameScore2|| 0,
          gameScore1: existingScores.gameScore1|| 0,
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
          <Image source={require('../assets/user5.png')} style={styles.birdImage} />
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
    backgroundColor: "#e7f2f2",
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreBox: {
    backgroundColor: '#9cb2b2',
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
    color: "#000"
  },
  questionBubble: {
    backgroundColor: '#9cb2b2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000'
  },
  button: {
    backgroundColor: '#c4dfdf',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000'
  },
  selectedOption: {
    backgroundColor: '#c4dfdf',
  },
  correctOption: {
    backgroundColor: '#a1b481',
  },
  incorrectOption: {
    backgroundColor: '#FF6D60',
  },
  nextButton: {
    backgroundColor: '#9cb2b2',
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

export default GameScV;
