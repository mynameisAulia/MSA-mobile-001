import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';

// Import your images here
import ScamImage1 from "./assets/scam1.png";
import ScamImage2 from "./assets/scam2.png";
import ScamImage3 from "./assets/scam3.png";
import ScamImage4 from "./assets/scam4.png";
import ScamImage5 from "./assets/scam5.png";
import ScamImage6 from "./assets/scam6.png";
import ScamImage7 from "./assets/scam7.png";
import ScamImage8 from "./assets/scam8.png";
import ScamImage9 from "./assets/scam9.png";

function CardList1() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Card11')} style={styles.button}>
          <Image source={ScamImage1} style={styles.buttonImage} />
          <Text style={styles.buttonText}>What is Scam</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Card12')} style={styles.button}>
          <Image source={ScamImage2} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Social Media Scam</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow1}>
        <TouchableOpacity onPress={() => navigation.navigate('Card13')} style={styles.button}>
          <Image source={ScamImage8} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Online Shopping Scam</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Card14')} style={styles.button}>
          <Image source={ScamImage9} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Tech Support Scam</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow2}>
        <TouchableOpacity onPress={() => navigation.navigate('Card15')} style={styles.button}>
          <Image source={ScamImage4} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Business and Invesment Scam</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Card16')} style={styles.button}>
          <Image source={ScamImage5} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Online Auction Scam</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow3}>
        <TouchableOpacity onPress={() => navigation.navigate('Card17')} style={styles.button}>
          <Image source={ScamImage6} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Employment Scams</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Card18')} style={styles.button}>
          <Image source={ScamImage7} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Online Dating Scam</Text>
        </TouchableOpacity>
        </View>

      <View style={styles.buttonRow4}>
        <TouchableOpacity onPress={() => navigation.navigate('Card19')} style={styles.button}>
          <Image source={ScamImage3} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Travel & Vacation Scam</Text>
        </TouchableOpacity>
      </View>

      {/* Add more button rows here if needed */}
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
    marginBottom: 15,
    marginTop: 20,
  },
  buttonRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonRow3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonRow4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    height: 110,
    borderRadius: 10,
    backgroundColor: "#e6eef9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginLeft: 12,
    elevation: 2,
    paddingHorizontal: 10,
    borderColor: "#b8bec7",
    borderWidth: 2,
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },

});

export default CardList1;
