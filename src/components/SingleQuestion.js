import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function SingleQuestion({
  index,
  question,
  correctAnswer,
  incorrectAnswers,
  setSelectedAnswer,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [multipleArray, setMultipleArray] = useState();

  // 객관식 문제 랜덤배열 생성: 오답 배열(incorrectAnswers)에 정답(correctAnswer)을 추가한 다음 섞기
  const answerList = Object.values(incorrectAnswers).concat(correctAnswer);
  const shuffleList = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    const multipleChoices = shuffleList(answerList);
    setMultipleArray(multipleChoices);
  }, [index]);

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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={
          selectedItem === item
            ? [styles.itemButton, styles.itemSelected]
            : styles.itemButton
        }
        onPress={() => {
          setSelectedItem(item);
          setSelectedAnswer(item);
        }}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{correctQuestion(question)}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={multipleArray}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  questionText: {
    fontSize: 19,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    // alignItems: "flex-start",
  },

  itemButton: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    minWidth: "90%",
    maxwidth: "90%",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
  },
  itemSelected: {
    borderWidth: 3,
    borderColor: "#2389da",
  },
});
