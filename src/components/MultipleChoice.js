import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function MultipleChoice({ Quiz, quizIndex, setQuizIndex }) {
  const handleClick = () => {};

  return (
    <View className="">
      <Text>Question: {Quiz.question}</Text>
      <Text>Answer: {Quiz.answer}</Text>
      {Quiz.exampleArray.map((option, index) => {
        return (
          <Text id={index}>
            {index + 1}: {option}
          </Text>
        );
      })}
      <TouchableOpacity onPress={handleClick}>
        <Text>Test Click</Text>
      </TouchableOpacity>
    </View>
  );
}
