import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ setQuizStarted, setTimeRecord }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Quiz App</Text>
      <TouchableOpacity
        onPress={() => {
          setTimeRecord((prev) => [...prev, Date.now()]);
          setQuizStarted(true);
        }}
      >
        <Text style={styles.start}>퀴즈 풀기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 15,
  },
  start: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2389da",
  },
});
