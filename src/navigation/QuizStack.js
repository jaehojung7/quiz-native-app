import React from "react";
import Quiz from "../screens/Quiz";
import AnswerNote from "../screens/AnswerNote";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function QuizStack({
  setQuizStarted,
  timeRecord,
  setTimeRecord,
}) {
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
}
