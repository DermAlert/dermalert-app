import { Text, View } from "react-native";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export default function ProgressBar({ step, totalSteps}: ProgressBarProps) {
  const progress = step / totalSteps;

  return (
    <View className="mt-2">
      <View className="w-full h-2 bg-primary-50 rounded-lg overflow-hidden">
        <View
          className="bg-secondary-500 h-2"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
      <View className="flex-row justify-center my-2">
        <Text allowFontScaling={false} className="text-sm text-neutral-500">
          Passo <Text allowFontScaling={false} className="font-bold">{step}</Text> de {totalSteps}
        </Text>
      </View>
    </View>
  );
}
