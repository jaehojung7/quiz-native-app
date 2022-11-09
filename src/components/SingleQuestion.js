import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function SingleQuestion({
  question,
  correctAnswer,
  incorrectAnswers,
  setSelectedAnswer,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  // 객관식 문제 배열 생성하기: 오답 배열(incorrectAnswers)에 정답을 추가한 다음 랜덤하게 섞기
  const answerList = Object.values(incorrectAnswers).concat(correctAnswer);
  function shuffleList(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const multipleOptions = shuffleList(answerList);

  //   let correctQuestion = "";
  //   if (defaultTemplate.question.includes("&#039;" | "&quot;")) {
  //     correctQuestion = defaultTemplate.question.replace(/&#039;/g, "'");
  //   } else if (defaultTemplate.question.includes("&quot;")) {
  //     correctQuestion = defaultTemplate.question.replace(/&quot;/g, '"');
  //   } else if (defaultTemplate.question.includes("&amp;")) {
  //     correctQuestion = defaultTemplate.question.replace(/&amp;/g, "&");
  //   } else {
  //     correctQuestion = defaultTemplate.question;
  //   }

  console.log(multipleOptions);

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
        <Text style={styles.questionText}>{question}</Text>
      </View>

      <View style={{ borderWidth: 1, borderColor: "red" }}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={multipleOptions}
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
    borderWidth: 1,
  },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  questionText: {
    fontSize: 19,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  itemButton: {
    alignItems: "center",
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
