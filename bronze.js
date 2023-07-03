import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DragDrop from "./DragDrop"

function Bronze(props) {
  return (
    <View style={styles.container}>
      <View style={styles.button2Row}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("DragDrop")}
          style={styles.button2}
        >
          <EntypoIcon name="mouse-pointer" style={styles.icon2}></EntypoIcon>
          <Text style={styles.dragDrop}>DRAG &amp;{"\n"}DROP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  button2: {
    width: 124,
    height: 115,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRightWidth: 1
  },
  icon2: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 27,
    width: 25,
    marginTop: 25,
    marginLeft: 50
  },
  dragDrop: {
    color: "#121212",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 0
  },
  button1: {
    width: 124,
    height: 115,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRightWidth: 1,
    marginLeft: 12
  },
  icon1: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 27,
    width: 25,
    marginTop: 25,
    marginLeft: 50
  },
  balloonPop: {
    color: "#121212",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 0
  },
  button2Row: {
    height: 115,
    flexDirection: "row",
    flex: 1,
    marginRight: 57,
    marginLeft: 58,
    marginTop: 229
  }
});

export default Bronze;
