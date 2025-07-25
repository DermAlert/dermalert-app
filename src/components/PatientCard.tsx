import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type PatientCardProps = TouchableOpacityProps & {
  name: string;
  cpf: string;
}

export default function PatientCard({name, cpf, ...rest}: PatientCardProps) {

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
        <Text className='font-semibold'>{name}</Text>
        <Text className='text-sm mt-1'>{cpf}</Text>
      </View>
    </TouchableOpacity>
  )
}