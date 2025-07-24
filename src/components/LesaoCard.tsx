import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type LesaoCardProps = TouchableOpacityProps & {
  title: string;
  type: string;
}

export default function LesaoCard({title, type, ...rest}: LesaoCardProps) {

  return (
    <TouchableOpacity 
      className="border border-gray-300 rounded-lg flex-row justify-start px-4 py-5 items-center gap-4"
      activeOpacity={0.6}
      onPress={()=> {
        router.push('/(app)/(patient)/lesao/[id]');
      }}
      {...rest}
    >

      <Feather name="database" size={16} color="#B3B3B3" />

      <View>

        <Text className='font-semibold text-md self-start mb-1'>
          {title}
        </Text>

        <View className="bg-gray-200 rounded-2xl px-2 py-1 self-start">
          <Text className='text-sm font-semibold'>
            {type}
          </Text>
        </View>
        
      </View>


    </TouchableOpacity>
  )
}