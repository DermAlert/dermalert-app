import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

export default function PatientCard({...rest}: TouchableOpacityProps) {

  return (
    <TouchableOpacity 
      className="border border-gray-300 rounded-lg flex-row justify-start px-4 py-5 items-center gap-4"
      activeOpacity={0.6}
      onPress={()=> router.push("/(app)/(patient)/patient/[id]")}
      {...rest}
    >

      <View className="rounded-full bg-gray-300 overflow-hidden w-10 h-10 justify-center items-center">
        <Feather name="user" size={25} color="black" />
      </View>

      <View>
        <Text className='font-semibold'>Gustavo Andrade de Souza</Text>
        <Text className='text-sm mt-1'>123.456.789-12</Text>
      </View>
    </TouchableOpacity>
  )
}