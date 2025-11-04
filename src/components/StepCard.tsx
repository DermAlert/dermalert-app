
import { CheckIcon, ListDashesIcon } from 'phosphor-react-native';
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
      className={`flex-row items-center justify-between gap-4 border rounded-lg px-4 py-6 ${stepCheck ? 'bg-primary-50 border-primary-300' : 'bg-primary-50 border-primary-50'}`}
      {...rest}
    >
      <View className={`justify-center items-center rounded-lg py-2 w-10 ${stepCheck ? 'bg-primary-200' : 'bg-neutral-200'}`}>
        <ListDashesIcon size={24} color={`${stepCheck ? '#6775B4' : '#D4D6DF'}`} />
      </View>
      
      <View className="flex-1">
        <Text allowFontScaling={false} className="text-xs text-neutral-500 font-semibold">{stepCheck ? steps : 0}/{steps} etapas</Text>
        <Text allowFontScaling={false} className="text-base text-neutral-900">{title}</Text>
      </View>
      <CheckIcon size={22} color={`${stepCheck ? '#00A63E' : '#D4D6DF'}`} />
    </TouchableOpacity>
  )
}