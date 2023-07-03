import React, { useState, useEffect } from 'react'
import { Linking, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Modal } from 'react-native'
import { firebase } from '../config'
import EntypoIcon from "react-native-vector-icons/Entypo";
import {useNavigation } from '@react-navigation/native';

import CardHome from '../CardHome';
import TopicCard from '../TopicCard';
import TopicVideo from '../video/TopicVideo';
import Report from "../Report";
import quizHome from "../quizHome"
import TopicGame from '../game/TopicGame';
import ChangePassword from './ChangePassword';
import ChangeUsername from './ChangeUsername';
import quizImage from "../assets/quiz.png";
import gameImage from "../assets/game.png";
import videoImage from "../assets/video.png";
import cardImage from "../assets/card.png";
import reportImage from "../assets/report.png";

const Profile  = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = () => {
    // Code to sign out the user
      firebase.auth().signOut();
    };

    const handleChangePassword = () => {
      navigation.navigate('ChangePassword');
    };

    const handleChangeUsername = () => {
      navigation.navigate('ChangeUsername');
    };

    const handleEventDescPress = () => {
      Linking.openURL(events[events.length - 1].eventDesc);
    };  
    
    const handleEventUrlPress = () => {
  const eventUrl = events.sort((a, b) => b.date - a.date)[0].eventUrl;
  Linking.openURL(eventUrl);
};

    const handleImageClick = () => {
      setIsModalVisible(true);
    };
    const handleModalClose = () => {
      setIsModalVisible(false);
    };
  
  

    useEffect (() => {
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setName(snapshot.data())
        }
        else {
          console.log('User does not exist')
        }
      })
      .catch((error) => {
      console.log('Error retrieving user data:', error);
    });
    firebase
    .firestore()
    .collection("events")
    .orderBy("timeStamp", "desc")
    .get()
    .then((querySnapshot) => {
      const eventData = [];
      querySnapshot.forEach((doc) => {
        eventData.push(doc.data());
      });
      setEvents(eventData);
    })
    .catch((error) => {
      console.log('Error retrieving events:', error);
    });

    }, [])

    return (
      <SafeAreaView style={styles.container}>
        <Text style={{fontSize:20, fontWeight:'bold', marginLeft:80, marginBottom:-16, paddingTop:30}}>
          Hi, {name.username}
        </Text>
        
        <TouchableOpacity onPress={toggleDropdown} style={styles.button5}>
          <EntypoIcon name="menu" style={styles.icon5}></EntypoIcon>
        </TouchableOpacity>
      
      <TouchableOpacity onPress={handleImageClick}>
      <Image 
      style={styles.image}
      source={{
        uri:'https://firebasestorage.googleapis.com/v0/b/msa-3-c8e3a.appspot.com/o/latest.png?alt=media'
      }}
      />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={handleModalClose}>
            <Text style={styles.modalCloseButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.event}>ABOUT</Text>
          {events.length > 0 && (
            <Text style={styles.eventData}>
              <Text style={styles.boldText}>EVENT NAME{'\n'}</Text>
                {events.sort((a, b) => b.date - a.date)[0].eventname} {'\n\n'}
              <Text style={styles.boldText}>EVENT DESCRIPTION{'\n'}</Text>
                {events.sort((a, b) => b.date - a.date)[0].eventDesc} {'\n\n'}
              <Text style={styles.boldText}>EVENT URL{'\n'}</Text>
              <Text style={styles.linkText} onPress={handleEventUrlPress}>
                {events.sort((a, b) => b.date - a.date)[0].eventUrl}
              </Text>
              </Text>
          )}
        </View>
      </Modal>

      {/* Dropdown */}
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={handleSignOut} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangePassword} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangeUsername} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>Change Username</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('quizHome')}
          style={styles.button}>
          <Image source={quizImage} style={styles.buttonImage} />
          <Text style={styles.quiz}>QUIZ</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => navigation.navigate('TopicGame')}
            style={styles.button1}>
          <Image source={gameImage} style={styles.buttonImage} />
          <Text style={styles.game}>GAME</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button2Row}>
        <TouchableOpacity
        onPress={() => navigation.navigate('TopicVideo')} 
        style={styles.button2}>
          <Image source={videoImage} style={styles.buttonImage} />
          <Text style={styles.video}>VIDEO</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('TopicCard')}
          style={styles.button3}>
          <Image source={cardImage} style={styles.buttonImage} />
          <Text style={styles.card}>CARD</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button3Row}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Report')}
        style={styles.button4}>
        <View style={styles.icon4Row}>
          <Image source={reportImage} style={styles.buttonImage1} />
          <Text style={styles.report}>REPORT</Text>
        </View>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
      
    )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
    marginTop: 13,
    marginLeft: 5,
  },
  buttonImage1: {
    width: 40,
    height: 40,
    marginBottom: 10,
    marginLeft: -10,
  },
  image: {
    width: 340,
    height: 150,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 27,
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  event: {
    color: "#fff",
    fontSize: 25,
    fontWeight: 'bold',
  },

  eventData: {
    color: "#fff",
    marginTop: 30,
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  boldText: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  linkText: {
    color: '#77c3ec',
    textDecorationLine: 'underline',
  },

  button5: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginTop: -20,
    marginLeft: 20
  },
  icon5: {
    color: "rgba(128,128,128,1)",
    fontSize: 25,
    height: 27,
    width: 25,
    marginTop: 12,
    marginLeft: 16
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
  
  button: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#e6eef9",
    marginRight: 15,
    marginLeft: 14,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#b8bec7",
    borderWidth: 2,
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 27,
    width: 25,
    marginTop: 25,
    marginLeft: 46
  },
  quiz: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 55,
    marginTop: -40,
  },
  button1: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#e6eef9",
    marginRight: 15,
    marginLeft: 14,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#b8bec7",
    borderWidth: 2,
  },
  icon1: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 27,
    width: 25,
    marginTop: 25,
    marginLeft: 46
  },
  game: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 55,
    marginTop: -40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
  },
  button3Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },
  button2: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#e6eef9",
    marginRight: 15,
    marginLeft: 14,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#b8bec7",
    borderWidth: 2,
  },
  icon2: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 27,
    width: 25,
    marginTop: 24,
    marginLeft: 46
  },
  video: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 55,
    marginTop: -40,
  },
  button3: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#e6eef9",
    marginRight: 15,
    marginLeft: 14,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#b8bec7",
    borderWidth: 2,
  },
  icon3: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 27,
    width: 25,
    marginTop: 24,
    marginLeft: 46
  },
  card: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 55,
    marginTop: -40,
  },
  button2Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  button4: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#e6eef9",
    marginRight: 90,
    marginLeft: 90,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#b8bec7",
    borderWidth: 2,
  },
  icon4: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 27,
    width: 25
  },
  report: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 17,
    marginTop: 10,
  },
  icon4Row: {
    height: 27,
    flexDirection: "row",
    flex: 1,
    marginRight: 31,
    marginLeft: 26,
    marginTop: 14
  },
  test: {
    width: 340,
    height: 150,
    backgroundColor: "#abc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRightWidth: 1,
    marginTop: 30,
    marginLeft: 27
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 26,
    backgroundColor: '#e6eef9',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 50,
    elevation: 5,
    marginLeft: 3,
  },
  dropdownButton: {
    paddingVertical: 8,
  },
  dropdownButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },

})
