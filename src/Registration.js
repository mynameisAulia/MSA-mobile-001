import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const registerUser = async (email, password, username) => {
    if (!username) {
      alert('Username cannot be empty.');
      return;
    } else if (!password) {
      alert('Password cannot be empty.');
      return;
    } else if (!email) {
      alert('Email cannot be empty.');
      return;
    }
    try {
      // Check password requirements
      if (password.length < 8) {
        throw new Error('Password should be at least 8 characters long.');
      }
      if (!/\d/.test(password)) {
        throw new Error('Password should contain at least one digit.');
      }
      if (!/[a-z]/.test(password)) {
        throw new Error('Password should contain at least one lowercase letter.');
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error('Password should contain at least one uppercase letter.');
      }
      if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
        throw new Error('Password should contain at least one special character.');
      }

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://msa-3-c8e3a.firebaseapp.com',
      });

      const currentUser = firebase.auth().currentUser;
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      await firebase.firestore().collection('users').doc(currentUser.uid).set({
        username,
        email,
        timestamp, // Save the timestamp in the "users" collection
      });

      alert('Registration successful! Verification email sent.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Image source={require('../assets/b.png')} style={styles.birdImage} />
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, username)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.loginContainer}
      >
        <Text style={styles.loginText}>Login Account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    fontSize: 26,
    marginBottom: 20,
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
  loginContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  birdImage: {
    width: '100%', // Set the desired width of the image
    height: 300, // Set the desired height of the image
    marginTop: -40, // Adjust the spacing between the text and image as needed
    marginBottom: 10,
  },
});
