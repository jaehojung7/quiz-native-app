import React, { useState } from "react";
import { View } from "react-native";
import Home from "./src/screens/Home";
import Quiz from "./src/screens/Quiz";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {!quizStarted && <Home setQuizStarted={setQuizStarted} />}
      {quizStarted && <Quiz setQuizStarted={setQuizStarted} />}
    </View>
  );
}
