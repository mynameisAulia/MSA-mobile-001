import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, SafeAreaView } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {useNavigation } from '@react-navigation/native';
import hackerImage from "../assets/hacker.png";
import victimImage from "../assets/victim.png";

function ModeGame1() {
  const navigation = useNavigation();
  return (

    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.buttonRow}>

      <TouchableOpacity onPress={() => navigation.navigate('GameScH')} style={styles.button}>
          <Image source={hackerImage} style={styles.buttonImage} />
          <Text style={styles.buttonText}>HACKER</Text>
        </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('GameScV')} style={styles.button}>
          <Image source={victimImage} style={styles.buttonImage} />
          <Text style={styles.buttonText}>VICTIM</Text>
        </TouchableOpacity>

      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#e6eef9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginLeft: 12,
    elevation: 2,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: "#b8bec7",
    borderWidth: 2,
  },
  buttonImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default ModeGame1;
