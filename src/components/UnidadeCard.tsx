import { MapPinIcon } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function UnidadeCard({...rest}: TouchableOpacityProps) {

  return (
    <TouchableOpacity 
      className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-5"
      activeOpacity={0.6}
      {...rest}
    >

      <MapPinIcon size={24} color="#6775B4" />

      <Text allowFontScaling={false} className="text-base text-neutral-900">UBS Brasília M Boi Mirim</Text>

    </TouchableOpacity>
  )
}