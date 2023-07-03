import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Hangman from './Hangman';
import DragDrop from "./DragDrop"
import Scoreboard from "./Scoreboard";
import Quiz from "./screens/Quiz";

function Untitled2(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleImageClick = () => {
      setIsModalVisible(true);
    };
    const handleModalClose = () => {
      setIsModalVisible(false);
    };

  useEffect(() => {
    // Fetch the finalScore from Scoreboard component or any other appropriate source
    const fetchedFinalScore = 50; // Replace with the actual value
    setFinalScore(fetchedFinalScore);
  }, []);


   return (
    <View style={styles.container}>
      <View style={styles.button1Row}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Scoreboard')}
          style={styles.button2}
        >
          <View style={styles.icon1Row}>
            <EntypoIcon name="medal" style={styles.icon1} />
            <View style={styles.scoreColumn}>
              <Text style={styles.score}>SCORE</Text>
            </View>
            
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleImageClick}
          style={styles.button1}>
            <View style={styles.scoreColumn2}>
              <Text style={styles.how}>?</Text>
            </View>
         </TouchableOpacity>

         {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={handleModalClose}>
            <Text style={styles.modalCloseButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.event}>HOW TO PLAY</Text>
            <Text style={styles.eventData}>
              <Text style={styles.boldText}>BRONZE : DRAG & DROP{'\n'}</Text>
                <Text style={styles.eventData}>Drag the statement to the True or False Box and click 
                'Reveal Answer' to check your answer!{'\n'}1 correct answer = 1 point{'\n'}</Text>
              <Text style={styles.boldText}>{'\n'}SILVER : HANGMAN{'\n'}</Text>
              <Text style={styles.eventData}>Guess the word from the clue provided. Wrong letter will deduct the 
              attempt & hang the man!{'\n'}1 correct answer = 1 point{'\n'}</Text>
              <Text style={styles.boldText}>{'\n'}GOLD : RACE QUIZ{'\n'}</Text>
              <Text style={styles.eventData}>Click the right answer to make the man move till the end of the track
              before the time end!{'\n'} 1 correct answer = 1 point {'\n'}</Text>
              <Text style={styles.linkText}></Text>
            </Text>
        </View>
      </Modal>

      </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('DragDrop')} style={styles.button3}>
          <View style={styles.bronzeRow}>
            <Text style={styles.bronze}>BRONZE</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('DragDrop')} style={styles.button6}>
              <Text style={styles.attempt}>Attempt</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

      {finalScore >= 10 && (
        <TouchableOpacity onPress={() => props.navigation.navigate('Hangman')} style={styles.button4}>
          <View style={styles.silverRow}>
            <Text style={styles.silver}>SILVER</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Hangman')} style={styles.button7}>
              <Text style={styles.attempt1}>Attempt</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {finalScore > 15 && (
      <TouchableOpacity onPress={() => props.navigation.navigate('Quiz')} style={styles.button5}>
        <View style={styles.goldRow}>
          <Text style={styles.gold}>GOLD</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Quiz')} style={styles.button8}>
            <Text style={styles.attempt2}>Attempt</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 2
  },
  rank: {
    color: "#121212",
    fontSize: 15
  },
  rank1: {
    color: "#121212",
    fontSize: 15
  },
  rankColumn: {
    width: 40,
    marginLeft: 9
  },
  iconRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 12,
    marginRight: 33
  },
  button2: {
    width: 124,
    height: 60,
    backgroundColor: '#E3DFFD',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#b5b2ca",
    marginLeft: 195,
  },
  button1: {
    width: 50,
    height: 60,
    backgroundColor: '#E3DFFD',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#b5b2ca",
    marginLeft:-280,
  },
  icon1: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    height: 33,
    width: 30
  },
  score: {
    color: "#121212",
    fontSize: 15,
    paddingTop: 7,
    fontWeight: "bold",
  },
  how: {
    color: "#121212",
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingTop: 10,
  },
  rank2: {
    color: "#121212",
    fontSize: 15
  },
  scoreColumn: {
    width: 47,
    marginLeft: 9
  },
  icon1Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 11,
    marginRight: 27
  },
  icon2Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 11,
    marginRight: 27
  },
  button1Row: {
    height: 60,
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 10,
  },
  button3: {
    width: 287,
    height: 60,
    backgroundColor: "#CD7F32",
    borderRadius: 10,
    borderColor: "#a46528",
    borderWidth: 2,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 44
  },
  bronze: {
    color: "#121212",
    fontSize: 16,
    marginTop: 4,
    fontWeight: "bold",
  },
  button6: {
    width: 78,
    height: 26,
    backgroundColor: "#CD7F32",
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 105,
    borderColor: "#a46528",
  },
  attempt: {
    color: "#121212",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 18
  },
  bronzeRow: {
    height: 26,
    flexDirection: "row",
    flex: 1,
    marginRight: 23,
    marginLeft: 23,
    marginTop: 17
  },
  button4: {
    width: 287,
    height: 60,
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999999",
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 44
  },
  silver: {
    color: "#121212",
    fontSize: 16,
    marginTop: 4,
    fontWeight: "bold",
  },
  button7: {
    width: 78,
    height: 26,
    backgroundColor: "#C0C0C0",
    borderColor: "#999999",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 115
  },
  attempt1: {
    color: "#121212",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 17
  },
  silverRow: {
    height: 26,
    flexDirection: "row",
    flex: 1,
    marginRight: 23,
    marginLeft: 23,
    marginTop: 17
  },
  button5: {
    width: 287,
    height: 60,
    backgroundColor: "#FFD700",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccac00",
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 44
  },
  gold: {
    color: "#121212",
    fontSize: 16,
    marginTop: 4,
    fontWeight: "bold",
  },
  button8: {
    width: 78,
    height: 26,
    backgroundColor: "#FFD700",
    borderColor: "#ccac00",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 125
  },
  attempt2: {
    color: "#121212",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 18
  },
  goldRow: {
    height: 26,
    flexDirection: "row",
    flex: 1,
    marginRight: 23,
    marginLeft: 23,
    marginTop: 17
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  event: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 'bold',
  },

  eventData: {
    color: "#fff",
    marginTop: 30,
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },

  boldText: {
    fontWeight: 'bold',
    fontSize: 28,
    color: "#f6f5fe",
  },
});

export default Untitled2;
