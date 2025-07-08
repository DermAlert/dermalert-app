
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";


type Props = TouchableOpacityProps & {
  title: string;
  icon?: 'close' | 'back' | null
};


export default function Header({ title, icon='close' , ...rest}: Props) {

  return (
    <View className="flex-row w-full h-16 pl-1 pr-6 items-center justify-start">
      <TouchableOpacity activeOpacity={0.7} className="bg-white justify-center items-center w-12 h-12" {...rest}>
        {icon==='close' ? (
          <AntDesign name="close" size={18} color="#1D1B20" />
        ) : (
          <AntDesign name="arrowleft" size={18} color="#1D1B20" />
        )}
        
      </TouchableOpacity>
      <Text className="text-gray-900 ml-1 text-xl">{title}</Text>
    </View>
    
  )
}