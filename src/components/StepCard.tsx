
import Feather from '@expo/vector-icons/Feather';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  steps: number;
  title: string;
  stepCheck?: boolean;
};



export default function StepCard({ steps, title, stepCheck = false,  ...rest }: Props) {

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      className={`flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-3 mb-4 ${stepCheck ? 'bg-green-100' : 'bg-white'}`}
      {...rest}
    >
      <Feather name="server" size={24} color="#1E1E1E" />
      <View className="flex-1 px-4">
        <Text className="leading-4 text-xs">{stepCheck ? steps : 0}/{steps} etapas</Text>
        <Text className="leading-6 text-base">{title}</Text>
      </View>
      <Feather name="check" size={22} color={`${stepCheck ? '#14AE5C' : '#E6E6E6'}`} />
    </TouchableOpacity>
  )
}