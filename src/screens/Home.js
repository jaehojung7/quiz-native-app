import React from "react";
import { View } from "react-native";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ setQuizStarted }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Quiz App</Text>
      <TouchableOpacity
        onPress={() => {
          setQuizStarted(true);
        }}
      >
        <Text style={styles.start}>Start</Text>
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
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
  },
  start: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2389da",
  },
});
