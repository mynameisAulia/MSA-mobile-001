import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image} from 'react-native';
import Draggable from 'react-native-draggable';
import { firebase } from './config';
import ScamImage3 from "./assets/scam3.png";

const StatementSorting3 = (props) => {
  const [trueStatements, setTrueStatements] = useState([]);
  const [falseStatements, setFalseStatements] = useState([]);
  const [allStatements, setAllStatements] = useState([
    { id: 'statement1', content: 'Phishing is a type of social engineering. ', isTrue: true },
    { id: 'statement2', content: 'Social engineering attacks are easily recognizable.', isTrue: false },
    { id: 'statement3', content: 'Vishing can only occur through voice communication.', isTrue: true },
    { id: 'statement4', content: 'Social engineering attacks always use fear or urgency to manipulate victims', isTrue: true },
    { id: 'statement5', content: 'Social engineering attacks not always involve a financial loss for the victim. ', isTrue: false },

  ]);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);

  const handleDrop = (statementId, isTrue) => {
    const statement = allStatements.find((s) => s.id === statementId);
    if (isTrue) {
      if (!trueStatements.some((s) => s.id === statementId)) {
        setTrueStatements((prevTrueStatements) => [...prevTrueStatements, statement]);
        setFalseStatements((prevFalseStatements) => prevFalseStatements.filter((s) => s.id !== statementId));
      }
    } else {
      if (!falseStatements.some((s) => s.id === statementId)) {
        setFalseStatements((prevFalseStatements) => [...prevFalseStatements, statement]);
        setTrueStatements((prevTrueStatements) => prevTrueStatements.filter((s) => s.id !== statementId));
      }
    }
    setAllStatements((prevStatements) => prevStatements.filter((s) => s.id !== statementId));
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
          sortingScore3: score,
          hangmanScore: existingScores.hangmanScore || 0,
          sortingScore: existingScores.sortingScore || 0,
          sortingScore2: existingScores.sortingScore2 || 0,
          raceScore: existingScores.raceScore|| 0,
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

  const checkAndUpdateScore = () => {
    const greenScore = trueStatements.filter((statement) => statement.isTrue).length + falseStatements.filter((statement) => !statement.isTrue).length;
    setScore(greenScore);
    saveScore(greenScore);
  };

  const revealAnswersHandler = () => {
    setRevealAnswers(true);
    checkAndUpdateScore();
  };

  return (
    <View style={styles.container}>
      <View style={{ width: 165, height: 55, flexDirection: "row", alignItems: 'center', marginBottom: 10,
        borderWidth: 1.5, borderColor: '#728c93', borderRadius: 5, backgroundColor: '#ebf8fc'}}>
      <Image source={ScamImage3} style={{width: 40, height: 40, marginLeft: 10 }} />
        <Text style={{fontSize: 15, fontWeight: "bold", color: "#333", marginLeft: 10}}>DRAG & DROP</Text>
    </View>
      <View style={styles.draggableContainer}>
        {allStatements.map((statement) => (
          <Draggable
            key={statement.id}
            style={styles.draggable}
            disabled={revealAnswers}
            onDragStart={() => {
              setRevealAnswers(false);
            }}
            onDragRelease={({ nativeEvent }) => {
              const { pageX } = nativeEvent;
              const isTrue = pageX < 200; // Adjust the X-coordinate threshold for your layout
              handleDrop(statement.id, isTrue);
            }}
          >
            <View
              style={[
                styles.statement,
                revealAnswers && statement.isTrue ? styles.green : null,
                revealAnswers && !statement.isTrue ? styles.red : null,
              ]}
            >
              <Text style={styles.statementtext}>{statement.content}</Text>
            </View>
          </Draggable>
        ))}
      </View>
      <View style={styles.dropZoneContainer}>
        <View style={styles.dropZone1}>
          <Text style={styles.dropZoneText}>True</Text>
          {trueStatements.map((statement) => (
            <View
              key={statement.id}
              style={[styles.statement, revealAnswers && !statement.isTrue ? styles.red : styles.green]}
            >
              <Text style={styles.statementtext}>{statement.content}</Text>
            </View>
          ))}
        </View>
        <View style={styles.dropZone2}>
          <Text style={styles.dropZoneText}>False</Text>
          {falseStatements.map((statement) => (
            <View
              key={statement.id}
              style={[styles.statement, revealAnswers && statement.isTrue ? styles.red : styles.green]}
            >
              <Text style={styles.statementtext}>{statement.content}</Text>
            </View>
          ))}
        </View>
      </View>
      {!revealAnswers && (
        <View style={styles.buttonContainer}>
          <Button title="Reveal Answers" onPress={revealAnswersHandler} disabled={revealAnswers} />
        </View>
      )}
      {revealAnswers && (
  <View style={styles.buttonContainer}>
    <Text style={styles.score}>Score: {score}</Text>
    <View style={styles.nextButtonContainer}>
      <Button title="Next" onPress={() => props.navigation.navigate("DragDrop1")} />
    </View>
  </View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  dropZoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dropZone1: {
    width: 170,
    height: 380,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#98bbc4',
    backgroundColor: '#bfeaf5',
    borderRadius: 10,
  },
  dropZone2: {
    width: 170,
    height: 380,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e4e578',
    backgroundColor: '#FEFF86',
    borderRadius: 10,
  },
  dropZoneText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  draggableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
    marginRight: 100,
    marginLeft: -270,
    borderColor: 'black',
  },
  draggable: {
    margin: 10,
  },
  statement: {
    padding: 15,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#b5b2ca',
    backgroundColor: '#E3DFFD',
    marginBottom: 7,
    borderRadius: 10,
  },
  statementtext: {
    fontSize: 15,
  },
  green: {
    backgroundColor: '#E0F9B5',
    borderWidth: 2,
    borderColor: '#b3c790',
  },
  red: {
    backgroundColor: '#F38181',
    borderWidth: 2,
    borderColor: '#c26767',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#E3DFFD',
    borderWidth: 2,
    borderColor: '#b5b2ca',
    marginBottom: 7,
    borderRadius: 10,
    padding: 10
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
  },
  buttonContainer: {
  backgroundColor: '#E3DFFD',
  borderWidth: 2,
    borderColor: '#b5b2ca',
  borderRadius: 10,
  padding: 8,
},
nextButtonContainer: {
  marginTop: 10,
},

});

export default StatementSorting3;
