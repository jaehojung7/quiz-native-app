import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function AnswerNote({ route }) {
  const data = route.params;
  const answerNote = data.answerNote;

  // 문제에 포함된 single, double quote 변환하기
  const correctQuestion = (question) => {
    if (question.includes("&#039;")) {
      return question.replace(/&#039;/g, "'");
    }
    if (question.includes("&quot;")) {
      return question.replace(/&quot;/g, '"');
    }
    if (question.includes("&amp;")) {
      return question.replace(/&amp;/g, "&");
    } else {
      return question;
    }
  };

  const renderItem = ({ item: quiz }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.question}>
          Question: {correctQuestion(quiz.question)}
        </Text>
        <Text style={styles.myAnswer}>My answer: {quiz.userAnswer}</Text>
        <Text style={styles.correctAnswer}>
          Correct answer: {quiz.correctAnswer}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={answerNote}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  contentContainer: {
    justifyContent: "space-evenly",
  },
  itemContainer: {
    justifyContent: "center",
    marginVertical: 15,
    marginHorizontal: 10,
    minWidth: "90%",
    maxwidth: "90%",
  },
  question: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 5,
  },
  myAnswer: {
    fontSize: 17,
    fontWeight: "600",
    color: "tomato",
  },
  correctAnswer: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1ca099",
  },
});
