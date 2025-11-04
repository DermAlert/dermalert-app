
import { CameraPlusIcon } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";


export default function AddPhotoButton({...rest }: TouchableOpacityProps) {

  return (
    <TouchableOpacity
      className="w-[30.2%] h-[95] border border-neutral-300 rounded-lg justify-center items-center overflow-hidden bg-white relative"
      {...rest}
    >
      <CameraPlusIcon size={30} color="#6775B4" />
      <Text allowFontScaling={false} className="text-sm mt-1 text-center text-neutral-900">Adicionar imagem</Text>
    </TouchableOpacity>
  )
}