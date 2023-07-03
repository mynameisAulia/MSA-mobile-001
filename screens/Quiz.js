import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated} from 'react-native';
import { COLORS, SIZES } from '../constant';
import data from '../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Gold from '../gold';
import { firebase } from '../config';

const Quiz = () => {
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [manPosition, setManPosition] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (isTimeUp) {
      saveScore(score);
      setShowScoreModal(true);
    }
  }, [isTimeUp]);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);

    if (selectedOption === correct_option) {
      // Set Score
      setScore(score + 1);
    }

    // Show Next Button
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex === allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      saveScore(score);
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
  };

  const handleTimeout = () => {
    setIsTimeUp(true);
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
          raceScore: score,
          hangmanScore: existingScores.hangmanScore || 0,
          sortingScore2: existingScores.sortingScore2 || 0,
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

  const renderQuestion = () => {
  const options = allQuestions[currentQuestionIndex]?.options.map((option) => (
    <TouchableOpacity
      onPress={() => validateAnswer(option)}
      disabled={isOptionsDisabled}
      key={option}
      style={{
        borderWidth: 3,
        borderColor:
          option === correctOption
            ? COLORS.success
            : option === currentOptionSelected
            ? COLORS.error
            : COLORS.secondary + '40',
        backgroundColor:
          option === correctOption
            ? COLORS.success + '20'
            : option === currentOptionSelected
            ? COLORS.error + '20'
            : COLORS.secondary + '20',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 5,
      }}
    >
      <Text style={{ fontSize: 15, color: COLORS.background.black }}>{option}</Text>

      {/* Show Check Or Cross Icon based on correct answer*/}
      {option === correctOption ? (
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 30 / 2,
            backgroundColor: COLORS.success,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name="check" style={{ color: COLORS.white, fontSize: 10 }} />
        </View>
      ) : option === currentOptionSelected ? (
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 30 / 2,
            backgroundColor: COLORS.error,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name="close" style={{ color: COLORS.white, fontSize: 10 }} />
        </View>
      ) : null}
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}></View>
        <EntypoIcon
          name="man"
          style={[
            styles.icon1,
            {
              left: 275 + manPosition, // Adjust the starting position (e.g., 275)
            },
          ]}
        />
      </View>

      <View>
        {/* Question Counter */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text
            style={{ color: COLORS.black, fontSize: 20, opacity: 0.6, marginRight: 2 }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ color: COLORS.black, fontSize: 18, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text style={{ color: COLORS.black, fontSize: 20 }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>

        {/* Options */}
        {options}
                {/* Next Button */}
        {renderNextButton()}
      </View>
    </View>
  );
};

  const renderOptions = () => {
  return (
    <View>
      {allQuestions[currentQuestionIndex]?.options.map((option) => (
        <TouchableOpacity
          onPress={() => validateAnswer(option)}
          disabled={isOptionsDisabled}
          key={option}
          style={{
            borderWidth: 3,
            borderColor:
              option === correctOption
                ? COLORS.success
                : option === currentOptionSelected
                ? COLORS.error
                : COLORS.secondary + '40',
            backgroundColor:
              option === correctOption
                ? COLORS.success + '20'
                : option === currentOptionSelected
                ? COLORS.error + '20'
                : COLORS.secondary + '20',
            height: 50,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginVertical: 5,
          }}
        >
          <Text style={{ fontSize: 15, color: COLORS.background.black }}>{option}</Text>

          {/* Show Check Or Cross Icon based on correct answer*/}
          {option === correctOption ? (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                backgroundColor: COLORS.success,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name="check" style={{ color: COLORS.white, fontSize: 10 }} />
            </View>
          ) : option === currentOptionSelected ? (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                backgroundColor: COLORS.error,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name="close" style={{ color: COLORS.white, fontSize: 10 }} />
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};


  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: COLORS.accent,
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 20, color: COLORS.black, textAlign: 'center' }}>Next</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });

  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    let timer = null;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      restartQuiz();
    }

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const renderTimeRemaining = () => {
    if (timeRemaining > 0) {
      return (
        <Text style={{ color: COLORS.black, fontSize: 18, marginTop: 10,}}>
          Time Remaining: {timeRemaining} seconds
        </Text>
      );
    } else {
      return null;
    }
  };

  const restartQuiz = () => {
  setShowScoreModal(false);
  setCurrentQuestionIndex(0);
  setScore(0);
  setCurrentOptionSelected(null);
  setCorrectOption(null);
  setIsOptionsDisabled(false);
  setShowNextButton(false);
  setTimeRemaining(60);
  if (isTimeUp) {
    setManPosition(0); // Reset the man's position
  }
  setIsTimeUp(false); // Reset the isTimeUp state
  Animated.timing(progress, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: false,
  }).start();
};


  const renderScoreModal = () => {
  const isCongratulation = score > allQuestions.length / 2;

  const handleRetryQuiz = () => {
  saveScore(score); // Save the score before retrying the quiz
  restartQuiz();
};

  const handleGoBack = () => {
    setShowScoreModal(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showScoreModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '90%',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            {isCongratulation ? 'Congratulations!' : 'Oops!'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: isCongratulation ? COLORS.success : COLORS.error,
              }}
            >
              {score}
            </Text>
            <Text style={{ fontSize: 20, color: COLORS.black }}>/ {allQuestions.length}</Text>
          </View>

          {/* Retry Quiz button */}
          {isTimeUp && (
            <TouchableOpacity
              onPress={handleRetryQuiz}
              style={{
                backgroundColor: COLORS.accent,
                padding: 20,
                width: '100%',
                borderRadius: 20,
              }}
            >
              <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 20 }}>
                Retry Quiz
              </Text>
            </TouchableOpacity>
          )}

          {/* Go Back button */}
          {!isTimeUp && (
            <TouchableOpacity
              onPress={handleGoBack}
              style={{
                backgroundColor: COLORS.accent,
                padding: 20,
                width: '100%',
                borderRadius: 20,
              }}
            >
              <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 20 }}>
                Go Back
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          position: 'relative',
        }}
      >
        {/* Time Remaining */}
        {renderTimeRemaining()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}

        {/* Score Modal */}
        {renderScoreModal()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    width: 310,
    height: 27,
    position: "absolute",
    backgroundColor: "rgba(126,211,33,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRightWidth: 1,
    left: 0
  },
  icon1: {
    top: -20,
    left: 275,
    position: "absolute",
    color: "rgba(208,2,27,1)",
    fontSize: 50
  },
  rectStack: {
    width: 325,
    height: 55,
    marginTop: 30,
    marginLeft: 33,
  },
});
export default Quiz;