import { Text, View } from "react-native";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export default function ProgressBar({ step, totalSteps}: ProgressBarProps) {
  const progress = step / totalSteps;

  return (
    <View className="mt-2">
      <View className="w-full h-2 bg-gray-300">
        <View
          className="bg-gray-800 h-2"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
      <View className="flex-row justify-center my-2">
        <Text className="text-sm text-gray-800">
          Passo <Text className="font-bold">{step}</Text> de {totalSteps}
        </Text>
      </View>
    </View>
  );
}
