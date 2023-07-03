import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Profile from "./src/Profile";
import ChangePassword from "./src/ChangePassword";
import ChangeUsername from "./src/ChangeUsername";
import Header from "./components/Header";
import CardHome from "./CardHome";
import Quiz from "./screens/Quiz";
import Story from "./Story";
import Video1 from "./video/Video1";
import Video2 from "./video/Video2";
import Video3 from "./video/Video3";
import Video4 from "./video/Video4";
import Video5 from "./video/Video5";
import Video6 from "./video/Video6";
import Video7 from "./video/Video7";
import Video8 from "./video/Video8";
import Video9 from "./video/Video9";
import Video10 from "./video/Video10";
import Video11 from "./video/Video11";
import Video12 from "./video/Video12";
import Video13 from "./video/Video13";
import Video14 from "./video/Video14";
import Video15 from "./video/Video15";
import Video16 from "./video/Video16";
import Video17 from "./video/Video17";
import Video18 from "./video/Video18";
import Video19 from "./video/Video19";
import Video20 from "./video/Video20";

import Notif from "./Notif";
import Report from "./Report";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";
import Card5 from "./Card5";
import Card6 from "./Card6";
import Card7 from "./Card7";
import Card8 from "./Card8";
import Card9 from "./Card9";
import Card10 from "./Card10";
import Card11 from "./Card11";
import Card12 from "./Card12";
import Card13 from "./Card13";
import Card14 from "./Card14";
import Card15 from "./Card15";
import Card16 from "./Card16";
import Card17 from "./Card17";
import Card18 from "./Card18";
import Card19 from "./Card19";

import TopicCard from "./TopicCard";
import CardList1 from "./CardList1";
import CardList2 from "./CardList2";
import VideoList1 from "./video/VideoList1";
import VideoList2 from "./video/VideoList2";
import TopicVideo from "./video/TopicVideo";
import quizHome from "./quizHome";
import bronze from "./bronze"
import silver from "./silver"
import gold from "./gold"
import Hangman from "./Hangman"
import DragDrop from "./DragDrop"
import DragDrop2 from "./DragDrop2"
import DragDrop3 from "./DragDrop3"
import snakeLadder from "./snakeLadder"
import PopBalloon from "./popBalloon";
import CrossPuzzle from "./CrossPuzzle";
import TopicGame from "./game/TopicGame";
import ModeGame1 from "./game/ModeGame1";
import ModeGame2 from "./game/ModeGame2";
import GameScH from "./game/GameScH";
import GameScV from "./game/GameScV";
import GameSEH from "./game/GameSEH";
import GameSEV from "./game/GameSEV";
import Scoreboard from "./Scoreboard";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="MySecureAwareness" />,
            headerStyle: {
              height: 110,
              backgroundColor: "#f2f6fc",
              elevation: 25,
            }
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name="MySecureAwareness" />,
            headerStyle: {
              height: 110,
              backgroundColor: "#f2f6fc",
              elevation: 25,
            }
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="ChangeUsername"
        component={ChangeUsername}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="CardHome"
        component={CardHome}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="TopicCard"
        component={TopicCard}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card1"
        component={Card1}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="Video1"
        component={Video1}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video2"
        component={Video2}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
         <Stack.Screen
        name="Video3"
        component={Video3}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video4"
        component={Video4}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video5"
        component={Video5}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video6"
        component={Video6}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video7"
        component={Video7}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video8"
        component={Video8}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video9"
        component={Video9}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video10"
        component={Video10}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video11"
        component={Video11}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
        
        <Stack.Screen
        name="Video12"
        component={Video12}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video13"
        component={Video13}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video14"
        component={Video14}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video15"
        component={Video15}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video16"
        component={Video16}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video17"
        component={Video17}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video18"
        component={Video18}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="Video19"
        component={Video19}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
        <Stack.Screen
        name="Video20"
        component={Video20}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />

        <Stack.Screen
        name="CardList1"
        component={CardList1}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="CardList2"
        component={CardList2}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="VideoList1"
        component={VideoList1}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="VideoList2"
        component={VideoList2}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="TopicVideo"
        component={TopicVideo}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
        <Stack.Screen
        name="quizHome"
        component={quizHome}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
        <Stack.Screen
        name="bronze"
        component={bronze}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
        <Stack.Screen
        name="silver"
        component={silver}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
        <Stack.Screen
        name="gold"
        component={gold}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
        <Stack.Screen
        name="Card2"
        component={Card2}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
        />
        <Stack.Screen
        name="Card3"
        component={Card3}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card4"
        component={Card4}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card5"
        component={Card5}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card6"
        component={Card6}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card7"
        component={Card7}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card8"
        component={Card8}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card9"
        component={Card9}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card10"
        component={Card10}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="Card11"
        component={Card11}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card12"
        component={Card12}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card13"
        component={Card13}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card14"
        component={Card14}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card15"
        component={Card15}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card16"
        component={Card16}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card17"
        component={Card17}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card18"
        component={Card18}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Card19"
        component={Card19}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="Hangman"
        component={Hangman}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="DragDrop"
        component={DragDrop}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="DragDrop2"
        component={DragDrop2}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="DragDrop3"
        component={DragDrop3}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
      <Stack.Screen
        name="snakeLadder"
        component={snakeLadder}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="PopBalloon"
        component={PopBalloon}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="CrossPuzzle"
        component={CrossPuzzle}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="TopicGame"
        component={TopicGame}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="ModeGame1"
        component={ModeGame1}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="ModeGame2"
        component={ModeGame2}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="GameScH"
        component={GameScH}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#3e5376",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="GameScV"
        component={GameScV}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#e7f2f2",
            elevation: 25,
          }
        }}
      />
      
      <Stack.Screen
        name="GameSEH"
        component={GameSEH}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#3e5376",
            elevation: 25,
          }
        }}
      />
      
      <Stack.Screen
        name="GameSEV"
        component={GameSEV}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#e7f2f2",
            elevation: 25,
          }
        }}
      />

      <Stack.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={{
          headerTitle: () => <Header name="MySecureAwareness" />,
          headerStyle: {
            height: 110,
            backgroundColor: "#f2f6fc",
            elevation: 25,
          }
        }}
      />
    
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
