import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import MultipleChoice from "./MultipleChoice";

export default function QuizList() {
  const [quizList, setQuizList] = useState();
  const [quizIndex, setQuizIndex] = useState(0);
  let defaultTemplate = {
    category: "",
    type: "",
    difficulty: "",
    correct_answer: "",
    incorrect_answers: [],
  };

  const getQuizList = async () => {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    );
    const result = res.data["results"];
    setQuizList(result);
  };

  useEffect(() => {
    if (quizList === undefined) {
      getQuizList();
      console.log("rendered");
    }
  }, []);

  if (quizList) {
    defaultTemplate = quizList[quizIndex];
  }

  const answerList = Object.values(defaultTemplate?.incorrect_answers).concat(
    defaultTemplate.correct_answer
  );

  function shuffleList(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const currentQuiz = {
    id: quizIndex + 1,
    question: defaultTemplate.question,
    answer: defaultTemplate.correct_answer,
    exampleArray: shuffleList(answerList),
  };
  console.log(currentQuiz);

  return (
    <View>
      <Text>QuizList screen</Text>
      <MultipleChoice
        Quiz={currentQuiz}
        setQuizIndex={setQuizIndex}
        quizIndex={quizIndex}
      />
    </View>
  );
}
