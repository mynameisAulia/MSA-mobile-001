import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';

// Import your images here
import SEImage1 from "./assets/se1.png";
import SEImage2 from "./assets/se2.png";
import SEImage3 from "./assets/se3.png";
import SEImage4 from "./assets/se4.png";
import SEImage5 from "./assets/se5.png";
import SEImage6 from "./assets/se6.png";
import SEImage7 from "./assets/se7.png";
import SEImage8 from "./assets/se8.png";
import SEImage9 from "./assets/se9.png";
import SEImage10 from "./assets/se10.png";

function CardList2() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Card6')} style={styles.button}>
          <Image source={SEImage6} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Social Engineering</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Card8')} style={styles.button}>
          <Image source={SEImage2} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Phishing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow1}>
        <TouchableOpacity onPress={() => navigation.navigate('Card7')} style={styles.button}>
          <Image source={SEImage8} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Pretexting</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Card10')} style={styles.button}>
          <Image source={SEImage9} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Baiting</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow2}>
        <TouchableOpacity onPress={() => navigation.navigate('Card5')} style={styles.button}>
          <Image source={SEImage4} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Vishing</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Card4')} style={styles.button}>
          <Image source={SEImage3} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Smishing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow3}>
        <TouchableOpacity onPress={() => navigation.navigate('Card9')} style={styles.button}>
          <Image source={SEImage1} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Impersonation</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Card3')} style={styles.button}>
          <Image source={SEImage7} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Pharming</Text>
        </TouchableOpacity>
        </View>

      <View style={styles.buttonRow4}>
        <TouchableOpacity onPress={() => navigation.navigate('Card2')} style={styles.button}>
          <Image source={SEImage5} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Piggybacking</Text>
        </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Card1')} style={styles.button}>
          <Image source={SEImage10} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Avoid Becoming a Victim</Text>
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

export default CardList2;
