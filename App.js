import React, { useState } from "react";
import { View } from "react-native";
import Home from "./src/screens/Home";
import QuizStack from "./src/navigation/QuizStack";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRecord, setTimeRecord] = useState([]);

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
