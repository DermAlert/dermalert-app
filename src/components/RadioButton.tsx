import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  value?: string;
  label: string;
  checked: boolean;
  onPress?: () => void;
  indented?: boolean;
};

export default function RadioButton({ 
  value, 
  label, 
  checked, 
  onPress, 
  indented = false,
  ...rest 
}: Props) {


  return (
    <View>
      {indented ? (
        <TouchableOpacity 
          activeOpacity={1} 
          className={`flex-row items-center rounded-lg p-3 z-10 bg-white`} 
          style={{marginLeft: 10}}
          onPress={onPress} 
          {...rest}
        >
          <View
            className={`h-[20px] w-[20px] rounded-full border-2 items-center justify-center mr-4 ${checked ? 'border-primary-600' : 'border-neutral-300'}`}
          >
            {checked && <View className="rounded-full h-[10px] w-[10px] bg-primary-600" />}
          </View>
          <Text allowFontScaling={false} className="text-gray-800 text-base flex-1">{label}</Text>
          
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          activeOpacity={1} 
          className={`flex-row gap-4 items-center rounded-2xl py-5 px-4 z-10 border ${checked ? `bg-primary-200 border-primary-600`: `bg-primary-100 border-primary-100`}`} 
          onPress={onPress} 
          {...rest}
        >
          <Text allowFontScaling={false} className={`text-base flex-1 ${checked ? `text-primary-600 font-medium`: `text-neutral-700 font-normal`}`}>{label}</Text>
          <View
            className={`h-[20px] w-[20px] rounded-full border-2 items-center justify-center ${checked ? 'border-primary-600' : 'bg-white border-neutral-300'}`}
          >
            {checked && <View className="rounded-full h-[12px] w-[12px] bg-primary-600" />}
          </View>
        </TouchableOpacity>
      )}
      
    </View>
  );
}
