import { Text, View } from 'react-native';
import Icon from "./Icon";


type EmptyPatientsProps = {
  title?: string;
  description?: string;
};

export function EmptyPatients({ title, description }: EmptyPatientsProps) {
  return (
    <View className="flex-1 justify-center items-center text-center mt-10">
      <Icon iconName="EmptyIcon" disabled style={{alignSelf: "center"}} />
      <Text className="text-neutral-600 text-lg font-medium mb-2 mt-4">{title}</Text>
      <Text className="text-neutral-400 text-base text-center">{description}</Text>
    </View>
  );
}