import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from "react-native";
import axios from "axios";
import SingleQuestion from "../components/SingleQuestion";

export default function Quiz({ setQuizStarted }) {
  const [quizArray, setQuizArray] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(null);
  const [cheatsheet, setCheatsheet] = useState(null);
  const [scoreArray, setScoreArray] = useState();

  const getquizArray = async () => {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    );
    const result = res.data["results"];
    setQuizArray(result);
  };

  useEffect(() => {
    if (quizArray === undefined) {
      getquizArray();
      console.log("rendered");
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.15 }}>
        <View style={styles.headerContainer}>
          {currentIndex + 1 <= quizArray?.length ? (
            <Text style={styles.mainText}>
              Progress: {currentIndex + 1} / {quizArray?.length}
            </Text>
          ) : (
            <Text style={styles.mainText}>Completed</Text>
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
        <View style={{ flex: 0.8 }}>
          <View style={styles.mainContainer}>
            <Text style={styles.mainText}>Here is your score</Text>
            <Text style={styles.mainText}>
              {currentIndex + 1} / {quizArray?.length}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => {
                setCurrentIndex(0);
              }}
            >
              <Text style={styles.mainButtonText}>Try again</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => {
                setQuizStarted(false);
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
  },
  mainContainer: {
    flex: 0.8,
    alignItems: "center",
  },
  mainText: {
    fontSize: 25,
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
