import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { firebase } from './config';
import 'firebase/firestore';
import ScamImage3 from "./assets/podium.png";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const scoresCollection = db.collection('scores');

    const fetchScores = async () => {
      try {
        const snapshot = await scoresCollection.get();
        const scoresData = snapshot.docs.map((doc) => {
          const { username, hangmanScore, raceScore, sortingScore, sortingScore2, 
            sortingScore3, gameScore1, gameScore2, gameScore3, gameScore4} = doc.data();
          const finalScore = hangmanScore + raceScore + sortingScore + sortingScore2 
          + sortingScore3 + gameScore1 + gameScore2 + gameScore3 + gameScore4;
          return {
            id: doc.id,
            username,
            finalScore,
          };
        });

        scoresData.sort((a, b) => b.finalScore - a.finalScore); // Sort scores in descending order

        setScores(scoresData);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();

    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ width: 200, height: 60, flexDirection: "row", alignItems: 'center', marginBottom: 10,
        borderWidth: 1.5, borderColor: '#ccc8e3', borderRadius: 5, backgroundColor: '#e8e5fd'}}>
      <Image source={ScamImage3} style={{width: 40, height: 40, marginLeft: 10 }} />
        <Text style={{fontSize: 20, fontWeight: "bold", color: "#333", marginLeft: 10}}>SCOREBOARD</Text>
    </View>
      {scores.map((score, index) => (
        <View key={score.id} style={[styles.scoreItem, index % 2 !== 0 && styles.oddItem]}>
          <View style={styles.square1}>
            <Text style={styles.rank}>{index + 1}.</Text>
          </View>
          <View style={styles.square2}>
            <Text style={styles.username}>{score.username}</Text>
          </View>
          <View style={styles.square3}>
          <Text style={styles.score}>{score.finalScore}</Text>
        </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 15,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  oddItem: {
    backgroundColor: '#f6f5fe',
    paddingTop: -5,
    paddingBottom: -5,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  square1: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f5fe',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  square2: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#f6f5fe',
  },
  square3: {
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f5fe',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 20,
    marginLeft: 8,
  },
});

export default Scoreboard;
