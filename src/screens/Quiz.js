import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import SingleQuestion from "../components/SingleQuestion";

export default function Quiz({ setQuizStarted, navigation }) {
  const [quizArray, setQuizArray] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(null);
  const [cheatsheet, setCheatsheet] = useState();
  const [answerNote, setAnswerNote] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getquizArray = async () => {
    setIsLoading(true);
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    );
    const result = res.data["results"];
    setQuizArray(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (quizArray === undefined) {
      getquizArray();
    }
  }, []);

  const handleSubmit = () => {
    if (selectedAnswer === quizArray[currentIndex].correct_answer) {
      setAnswerChecked("correct");
      setModalVisible(true);
      setCheatsheet(quizArray[currentIndex].correct_answer);
    } else {
      setAnswerChecked("incorrect");
      setModalVisible(true);
      setCheatsheet(quizArray[currentIndex].correct_answer);
      setAnswerNote((prevArray) => [
        ...prevArray,
        {
          question: quizArray[currentIndex].question,
          userAnswer: selectedAnswer,
          correctAnswer: quizArray[currentIndex].correct_answer,
        },
      ]);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentIndex < quizArray.length) {
      setCurrentIndex(currentIndex + 1);
    }
    setModalVisible(false);
  };

  const setSelectedAnswerFromChild = (answer) => {
    setSelectedAnswer(answer);
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.15, alignItems: "center" }}>
        <View style={styles.headerContainer}>
          {currentIndex + 1 <= quizArray?.length ? (
            <Text style={styles.mainText}>
              Progress: {currentIndex + 1} / {quizArray?.length}
            </Text>
          ) : (
            <Text style={styles.scoreText}>Result</Text>
          )}
        </View>
      </View>

      {currentIndex < quizArray?.length && (
        <View style={{ flex: 0.85 }}>
          <View style={styles.mainContainer}>
            <SingleQuestion
              question={quizArray[currentIndex].question}
              correctAnswer={quizArray[currentIndex].correct_answer}
              incorrectAnswers={quizArray[currentIndex].incorrect_answers}
              setSelectedAnswer={setSelectedAnswerFromChild}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                selectedAnswer === null
                  ? [styles.mainButton, styles.buttonDisable]
                  : styles.mainButton
              }
              onPress={handleSubmit}
              disabled={selectedAnswer === null ? true : false}
            >
              <Text style={styles.mainButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {currentIndex === quizArray?.length && (
        <View style={{ flex: 0.85 }}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              Your score: {quizArray.length - answerNote.length}/
              {quizArray.length}
            </Text>

            <Text style={styles.scoreText}>Time: 10m 30s</Text>
          </View>

          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => {
                setCurrentIndex(0);
                setAnswerNote([]);
              }}
            >
              <Text style={styles.mainButtonText}>Try again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => {
                navigation.navigate("AnswerNote", { answerNote });
              }}
            >
              <Text style={styles.mainButtonText}>Review answers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => {
                setQuizStarted(false);
                setAnswerNote([]);
              }}
            >
              <Text style={styles.mainButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={
            answerChecked === "correct"
              ? [modalStyles.modalContainer]
              : [modalStyles.modalContainer]
          }
        >
          <View style={{ marginBottom: 15 }}>
            {answerChecked === "correct" ? (
              <Text style={modalStyles.modalText}>
                Correct! Answer is {cheatsheet}
              </Text>
            ) : (
              <Text style={modalStyles.modalText}>
                Wrong! Answer is {cheatsheet}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={
              answerChecked === "correct"
                ? [styles.mainButton]
                : [styles.mainButton, modalStyles.buttonIncorrect]
            }
            onPress={handleNext}
          >
            <Text style={styles.mainButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
  },
  mainContainer: {
    flex: 0.8,
    alignItems: "center",
  },
  scoreContainer: {
    flex: 0.5,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  optionContainer: {
    flex: 0.5,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mainText: {
    fontSize: 23,
    fontWeight: "600",
  },
  scoreText: {
    fontSize: 27,
    fontWeight: "600",
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  mainButton: {
    width: "90%",
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: "#2389da",
    borderWidth: 1.5,
    borderColor: "#2389da",
  },
  buttonDisable: { opacity: 0.5 },
  mainButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    height: "27%",
    marginTop: "auto",
    backgroundColor: "#cacfd2",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonIncorrect: {
    borderColor: "tomato",
    backgroundColor: "tomato",
  },
  modalText: {
    fontSize: 19,
    fontWeight: "500",
  },
});
