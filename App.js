import React, { useState } from "react";
import { View } from "react-native";
import Home from "./src/screens/Home";
import Quiz from "./src/screens/Quiz";
import AnswerNote from "./src/screens/AnswerNote";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const QuizStack = ({ setQuizStarted, timeRecord, setTimeRecord }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Quiz" options={{ headerTitle: "Quiz" }}>
          {(props) => (
            <Quiz
              {...props}
              setQuizStarted={setQuizStarted}
              timeRecord={timeRecord}
              setTimeRecord={setTimeRecord}
            />
          )}
        </Stack.Screen>
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
  const [timeRecord, setTimeRecord] = useState([]);
  console.log(timeRecord);

  return (
    <View style={{ flex: 1 }}>
      {!quizStarted && (
        <Home setQuizStarted={setQuizStarted} setTimeRecord={setTimeRecord} />
      )}
      {quizStarted && (
        <QuizStack
          setQuizStarted={setQuizStarted}
          timeRecord={timeRecord}
          setTimeRecord={setTimeRecord}
        />
      )}
    </View>
  );
}
