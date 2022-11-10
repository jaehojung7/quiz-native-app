import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function AnswerNote({ route }) {
  const data = route.params;
  const answerNote = data.answerNote;

  const renderItem = ({ item: quiz }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.question}>Question: {quiz.question}</Text>
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
    color: "#20b2aa",
  },
});
