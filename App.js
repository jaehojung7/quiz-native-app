import React, { useState } from "react";
import { View } from "react-native";
import Home from "./src/screens/Home";
import Quiz from "./src/screens/Quiz";
import AnswerNote from "./src/screens/AnswerNote";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const QuizStack = ({ setQuizStarted }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          setQuizStarted={setQuizStarted}
          options={{ headerTitle: "Quiz" }}
        />
        <Stack.Screen
          name="AnswerNote"
          component={AnswerNote}
          options={{ headerTitle: "Review" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {!quizStarted && <Home setQuizStarted={setQuizStarted} />}
      {/* {quizStarted && <Quiz setQuizStarted={setQuizStarted} />} */}
      {quizStarted && <QuizStack setQuizStarted={setQuizStarted} />}
    </View>
  );
}
