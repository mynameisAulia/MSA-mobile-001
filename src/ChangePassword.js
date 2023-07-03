import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const changePassword = async () => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      // Reauthenticate the user with their current password
      await user.reauthenticateWithCredential(credential);

      // Validate the new password
      if (newPassword.length < 8) {
        throw new Error('Password should be at least 8 characters long.');
      }
      if (!/\d/.test(newPassword)) {
        throw new Error('Password should contain at least one digit.');
      }
      if (!/[a-z]/.test(newPassword)) {
        throw new Error('Password should contain at least one lowercase letter.');
      }
      if (!/[A-Z]/.test(newPassword)) {
        throw new Error('Password should contain at least one uppercase letter.');
      }
      if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(newPassword)) {
        throw new Error('Password should contain at least one special character.');
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords don't match.");
      }

      // Change the user's password
      await user.updatePassword(newPassword);

      // Reset input fields and display success message
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setSuccessMessage('Password changed successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Current Password"
          onChangeText={(password) => setCurrentPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={currentPassword}
        />
        <TextInput
          style={styles.textInput}
          placeholder="New Password"
          onChangeText={(password) => setNewPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={newPassword}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm New Password"
          onChangeText={(password) => setConfirmPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={confirmPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <TouchableOpacity onPress={changePassword} style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackContainer}>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 120,
    backgroundColor: '#ffffff',
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
