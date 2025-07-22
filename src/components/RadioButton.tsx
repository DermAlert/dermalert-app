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
          className={`flex-row items-center rounded-lg p-3 z-10 bg-white ml-6`} 
          onPress={onPress} 
          {...rest}
        >
          <View
            className="h-[18px] w-[18px] rounded-full border-2 border-gray-800 items-center justify-center mr-4"
          >
            {checked && <View className="rounded-full h-[10px] w-[10px] bg-gray-800" />}
          </View>
          <Text className="text-gray-800 text-base flex-1">{label}</Text>
          
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          activeOpacity={1} 
          className={`flex-row gap-4 items-center rounded-lg p-4 z-10 ${checked ? `bg-gray-300`: `bg-gray-200`}`} 
          onPress={onPress} 
          {...rest}
        >
          <Text className="text-gray-800 text-base flex-1">{label}</Text>
          <View
            className="h-[20px] w-[20px] rounded-full border-2 border-gray-800 items-center justify-center"
          >
            {checked && <View className="rounded-full h-[10px] w-[10px] bg-gray-800" />}
          </View>
        </TouchableOpacity>
      )}
      
    </View>
  );
}
