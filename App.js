import { View } from "react-native";
import QuizList from "./src/components/QuizList";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <QuizList />
    </View>
  );
}
