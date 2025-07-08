
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  value?: string,
  label: string,
  checked: boolean,
  onPress: () => void,
  indented?: boolean,
}

export default function CheckButton({ value, indented = false, label, checked, onPress, ...rest } : Props) {

  return (
    <TouchableOpacity activeOpacity={1} className={`flex-row items-center rounded-lg ${checked ? `bg-gray-300`: `bg-gray-200`} ${indented ? `bg-white p-3` : `p-4`}`} onPress={onPress} {...rest}>

      {indented && (
        <View
          className="h-[18] w-[18] border-2 rounded-sm border-gray-800 items-center justify-center mx-3"
        >
          {checked && <View className="rounded-sm h-[18] w-[18] bg-gray-800 justify-center items-center"><FontAwesome5 name="check" size={10} color="white" /></View>}
        </View>
      )}

      <Text className="text-gray-800 text-base flex-1">{label}</Text>

      {!indented && (
        <View
          className="h-[18] w-[18] border-2 rounded-sm border-gray-800 items-center justify-center"
        >
          {checked && <View className="rounded-sm h-[18] w-[18] bg-gray-800 justify-center items-center"><FontAwesome5 name="check" size={10} color="white" /></View>}
        </View>
      )}

      

      </TouchableOpacity>
  )
}