import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const ChangeUsername = () => {
  const navigation = useNavigation();
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (username) => {
    setNewUsername(username);
  };

  const handleSubmit = async () => {
    if (newUsername.trim().length === 0) {
      setError('Username cannot be empty.');
      return;
    }

    const user = firebase.auth().currentUser;
    const userId = user.uid;

    try {
      // Update the username in Firestore
      await firebase.firestore().collection('users').doc(userId).update({
        username: newUsername,
      });

      // Reset input fields and display success message
      setNewUsername('');
      setError('');
      setSuccessMessage('Username changed successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Username</Text>
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="New Username"
          onChangeText={handleUsernameChange}
          autoCapitalize="none"
          autoCorrect={false}
          value={newUsername}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Change Username</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackContainer}>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeUsername;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    paddingTop: 160,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    fontSize: 18,
    borderColor: '#000',
    backgroundColor: '#f2f6fc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
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
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  success: {
    color: 'green',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
