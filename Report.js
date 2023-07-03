import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, Modal, Alert, Image } from 'react-native';
import { firebase } from './config';
import 'firebase/auth';
import ScamImage3 from "./assets/report.png";

const Report = () => {
  const todoRef = firebase.firestore().collection('newData');
  const [addData, setAddData] = useState('');
  const [addReport, setAddReport] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch the user email from the users collection
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(userId);

    userRef.get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        setUserEmail(userData.email);
      }
    }).catch((error) => {
      console.log('Error getting user email:', error);
    });
  }, []);

  const showDropDown = () => {
    setIsModalVisible(true);
  }

  const hideDropDown = () => {
    setIsModalVisible(false);
  }

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setAddData(value);
    hideDropDown();
  }

  const addField = () => {
    if (!selectedValue) {
      Alert.alert('Heading Required', 'Please choose a heading for your report.');
      return;
    }

    if (addData && addData.length > 0 && addReport && addReport.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: selectedValue,
        newReport: addReport,
        createdAt: timestamp,
        email: userEmail,
      };

      todoRef
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()
        .then((snapshot) => {
          let nextId = 1;
          if (!snapshot.empty) {
            const lastReport = snapshot.docs[0].data();
            const lastId = parseInt(lastReport.reportID);
            nextId = lastId + 1;
          }
          const reportId = String(nextId).padStart(3, '0');
          
          data.reportID = reportId;

          todoRef
            .add(data)
            .then(() => {
              setSelectedValue('');
              setAddReport('');
              alert('Thank you for submitting the report!');
              Keyboard.dismiss();
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <View style={styles.container}>
    <View style={{ width: 150, height: 55, flexDirection: "row", alignItems: 'center', marginBottom: 20,
    marginTop: 10, borderWidth: 1.5, borderColor: '#728c93', borderRadius: 5, backgroundColor: '#ebf8fc'}}>
      <Image source={ScamImage3} style={{width: 40, height: 40, marginLeft: 10 }} />
        <Text style={{fontSize: 17, fontWeight: "bold", color: "#333", marginLeft: 13}}>REPORT</Text>
    </View>
      <TouchableOpacity style={styles.dropdown} onPress={showDropDown}>
        <Text style={styles.dropdownText}>{selectedValue || 'Subject'}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={hideDropDown}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={hideDropDown}>
            <Text style={styles.modalCloseButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem1} onPress={() => handleValueChange('System Error')}>
            <Text style={styles.subjectText}>System Error</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleValueChange('Information')}>
            <Text style={styles.subjectText}>Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleValueChange('Rating')}>
            <Text style={styles.subjectText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleValueChange('Feedback')}>
            <Text style={styles.subjectText}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleValueChange('Complaint')}>
            <Text style={styles.subjectText}>Complaint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleValueChange('Others')}>
            <Text style={styles.subjectText}>Others</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder='Write your report here'
        placeholderTextColor='#333'
        onChangeText={(newReport) => setAddReport(newReport)}
        value={addReport}
        multiline={true}
        underlineColorAndroid='transparent'
        autoCapitalize='none'
      />
      
      <TouchableOpacity style={styles.button} onPress={addField}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginTop : -260,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 15,
    marginLeft: 3,
  },
  dropdown: {
    height: 50,
    marginBottom: 10,
    backgroundColor: '#f2f6fc',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c1c4c9',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    backgroundColor: '#f2f6fc',
     borderWidth: 1,
    borderColor: '#c1c4c9',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 264,
    marginLeft: 19,
    marginRight: 19,
    
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalCloseButtonText: {
    fontSize: 30,
    color: '#222',
    marginRight: 10,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingTop:-10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subjectText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 200,
    fontSize: 18,
    borderColor: '#c1c4c9',
    borderWidth: 1,
    backgroundColor: '#f2f6fc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#82AAE3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Report;
