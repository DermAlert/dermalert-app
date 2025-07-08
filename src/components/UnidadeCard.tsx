import Feather from '@expo/vector-icons/Feather';
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function UnidadeCard({...rest}: TouchableOpacityProps) {

  return (
    <TouchableOpacity 
      className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5"
      activeOpacity={0.6}
      {...rest}
    >

      <Feather name="map-pin" size={20} color="#B3B3B3"/>  

      <Text className=''>UBS Brasília M Boi Mirim</Text>

    </TouchableOpacity>
  )
}