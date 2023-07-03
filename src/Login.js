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

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/wrong-password':
          setError('Invalid password');
          break;
        default:
          setError(error.message);
          break;
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Image source={require('../assets/a.png')} style={styles.birdImage} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={styles.registerContainer}
      >
        <Text style={styles.registerText}>
          Create Account
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  registerContainer: {
    marginBottom: 20,
  },
  registerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  birdImage: {
    width: '100%', // Set the desired width of the image
    height: 300, // Set the desired height of the image
    marginTop: -100, // Adjust the spacing between the text and image as needed
    marginBottom: 10,
  },
});
