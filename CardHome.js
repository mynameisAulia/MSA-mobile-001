import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {useNavigation } from '@react-navigation/native';

function CardHome() {
  const navigation = useNavigation();
  return (

    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('')}
          style={styles.button}>
          <Text style={styles.scam}>SCAM</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button5}>
          <EntypoIcon name="magnifying-glass" style={styles.icon5}></EntypoIcon>
          <Text style={styles.explore3}>EXPLORE</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.button4Row}>
        <TouchableOpacity style={styles.button4}>
          <Text style={styles.socialEngineering}>SOCIAL ENGINEERING</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button3}>
          <EntypoIcon name="magnifying-glass" style={styles.icon4}></EntypoIcon>
          <Text style={styles.explore2}>EXPLORE</Text>
        </TouchableOpacity>

      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    width: 246,
    height: 141,
    backgroundColor: "rgba(80,227,194,1)",
    borderRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  scam: {
    color: "#121212",
    fontSize: 18,
    marginTop: 57,
    marginLeft: 96
  },
  button5: {
    width: 89,
    height: 141,
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  icon5: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 43,
    width: 40,
    marginTop: 33,
    marginLeft: 23
  },
  explore3: {
    color: "#121212",
    marginLeft: 16
  },
  buttonRow: {
    height: 141,
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 27,
    marginRight: 29
  },
  button4: {
    width: 246,
    height: 141,
    backgroundColor: "rgba(184,233,134,1)",
    borderRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  socialEngineering: {
    color: "#121212",
    fontSize: 18,
    marginTop: 57,
    marginLeft: 33
  },
  button3: {
    width: 89,
    height: 141,
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  icon4: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 43,
    width: 40,
    marginTop: 35,
    marginLeft: 23
  },
  explore2: {
    color: "#121212",
    marginLeft: 15
  },
  button4Row: {
    height: 141,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 27,
    marginRight: 29
  }
});

export default CardHome;
