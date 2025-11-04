
import { CheckIcon } from 'phosphor-react-native';
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
    <TouchableOpacity activeOpacity={1} className={`flex-row items-center rounded-2xl ${checked ? `bg-primary-200 border-primary-300`: `bg-primary-100 border-primary-100`} ${indented ? `bg-white p-3` : `px-4 py-5`}`} onPress={onPress} {...rest}>

      {indented && (
        <>
        <View
          className="h-[18] w-[18] border-2 rounded-sm border-neutral-300 items-center justify-center mr-3"
        >
          {checked && <View className="rounded-sm h-[18] w-[18] bg-primary-600 justify-center items-center"><CheckIcon size={14} color="white" weight="bold" /></View>}
        </View>

        <Text allowFontScaling={false} className={`text-base flex-1 ${checked ? 'text-neutral-900 font-medium' : 'text-neutral-700 font-normal'}`}>{label}</Text>
        </>
        
      )}

      {!indented && (
        <>
        <Text allowFontScaling={false} className={`text-base flex-1 ${checked ? 'text-primary-600 font-medium' : 'text-neutral-700 font-normal'}`}>{label}</Text>
        <View
          className="h-[20] w-[20] border-2 rounded-sm items-center justify-center bg-white border-neutral-300"
        >
          {checked && <View className="rounded-sm h-[20] w-[20] bg-primary-600 justify-center items-center"><CheckIcon size={15} color="white" weight="bold" /></View>}
        </View>
        </>
        
      )}

      

      </TouchableOpacity>
  )
}