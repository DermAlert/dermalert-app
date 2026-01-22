
//import AntDesign from '@expo/vector-icons/AntDesign';
import { ArrowLeftIcon, XIcon } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";


type Props = TouchableOpacityProps & {
  title: string;
  icon?: 'close' | 'back' | null
};


export default function Header({ title, icon='close' , ...rest}: Props) {

  return (
    <View className="flex-row w-full px-1 py-2 items-center justify-start gap-1">
        <TouchableOpacity activeOpacity={0.7} className="justify-center items-center w-12 h-12" {...rest}>
        {icon==='close' ? (
          <XIcon size={18} color="#4052A1" />
        ) : (
          <ArrowLeftIcon size={22} color="#4052A1" weight="bold" />
        )}
        
      </TouchableOpacity>
      <Text allowFontScaling={false} className="text-neutral-700 font-medium text-lg flex-1 text-center">{title}</Text>

      <View className='justify-center items-center w-12 h-12'></View>
      
    </View>
    
  )
}