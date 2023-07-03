import { View, Text, FlatList, Dimensions, TouchableOpacity, Animated, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './config';
import SEImage1 from "./assets/se1.png";

const { height, width } = Dimensions.get('window');

export default function Card9() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();

  useEffect(() => {
    fetchDataFromFirebase().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  // Fetch data from Firebase Firestore
  const fetchDataFromFirebase = async () => {
    try {
      const snapshot = await firebase.firestore().collection('sentences').doc('impersonation').get();
      const sentenceData = snapshot.data();
      const fetchedData = Object.entries(sentenceData).map(([key, value]) => {
        return {
          id: key,
          sentence: value,
        };
      });
      return fetchedData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 15, backgroundColor: '#fff' }}>
    <View style={{ width: 200, height: 55, flexDirection: "row", alignItems: 'center', 
    marginTop: 10, borderWidth: 1.5, borderColor: '#728c93', borderRadius: 5, backgroundColor: '#ebf8fc'}}>
      <Image source={SEImage1} style={{width: 40, height: 40, marginLeft: 10 }} />
        <Text style={{fontSize: 15, fontWeight: "bold", color: "#333", marginLeft: 17}}>IMPERSONATION</Text>
    </View>
      <View style={{ height: height / 2, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.FlatList
          ref={ref}
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            console.log(x / width - 50);
            setCurrentIndex((x / (width - 50)).toFixed(0));
          }}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <Animated.View
                style={{
                  width: width,
                  height: height / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={{ width: '90%', height: '90%', backgroundColor: '#BFEAF5', 
                borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#98bbc4' }}>
                  <Text style={{ color: 'black', fontSize: 17, marginTop: 20, textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>{item.sentence}</Text>
                </View>
              </Animated.View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {data.map((item, index) => {
          return (
            <View
              key={item.id}
              style={{
                width: currentIndex == index ? 45 : 8,
                height: currentIndex == index ? 10 : 8,
                borderRadius: currentIndex == index ? 6 : 5,
                backgroundColor: currentIndex == index ? '#98bbc4' : 'gray',
                marginLeft: 5,
              }}
            ></View>
          );
        })}
      </View>
      <View
        style={{
          width: width,
          flexDirection: 'row',
          marginTop: 30,
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {currentIndex == 0 ? null : (
          <TouchableOpacity
            style={{
              width: data.length - 1 == currentIndex ? '100%' : 100,
              height: 40,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#98bbc4',
              borderWidth: 1.5, 
              borderColor: '#728c93'
            }}
            onPress={() => {
              setCurrentIndex(currentIndex - 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) - 1,
              });
            }}
          >
            <Text style={{ fontWeight: "bold"}}>Previous</Text>
          </TouchableOpacity>
        )}
        {data.length - 1 == currentIndex ? null : (
          <TouchableOpacity
            style={{
              width: currentIndex == 0 ? '100%' : 100,
              height: 40,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#98bbc4',
              borderWidth: 1.5, 
              borderColor: '#728c93'
            }}
            onPress={() => {
              setCurrentIndex(currentIndex + 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex) + 1,
              });
            }}
          >
            <Text 
          style={{ fontWeight: "bold"}}
          >Next</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: width, flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#98bbc4',
            paddingLeft: 138,
            paddingRight: 138,
            borderWidth: 1.5, 
            borderColor: '#728c93'
          }}
          onPress={() => navigation.navigate('Video6')}
        >
          <Text 
          style={{ fontWeight: "bold"}}
          >Watch Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
