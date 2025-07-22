
import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";


export default function AddPhotoButton({...rest }: TouchableOpacityProps) {

  return (
    <TouchableOpacity
      className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-white relative"
      {...rest}
    >
      <Feather name="camera" size={22} color="#757575" />
      <Text className="text-sm mt-3 text-center leading-4">Adicionar imagem</Text>
    </TouchableOpacity>
  )
}