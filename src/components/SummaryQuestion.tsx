import React from 'react';
import { Text, View } from 'react-native';

interface SummaryQuestionProps {
  question?: string;
  children: React.ReactNode;
}

export const SummaryQuestion: React.FC<SummaryQuestionProps> = ({ question, children }) => {
  return (
    <View className="gap-2">

      <Text className="text-base text-neutral-900 font-semibold">
        {question}
      </Text>

      <Text className="text-base text-neutral-700">
        {children}
      </Text>

    </View>
  );
};