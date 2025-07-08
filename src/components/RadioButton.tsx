import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import Input from "./Input";

type Props = TouchableOpacityProps & {
  value?: string;
  label: string;
  checked: boolean;
  onPress?: () => void;
  openField?: boolean;
  fieldTitle?: string;
  fieldPlaceholder?: string;
};

export default function RadioButton({ 
  value, 
  label, 
  checked, 
  onPress, 
  openField = false, 
  fieldTitle, 
  fieldPlaceholder,
  ...rest 
}: Props) {

  const { control } = useForm();

  const measuredHeight = useSharedValue(0);

  const animatedHeight = useDerivedValue(() => 
    withTiming(
      openField && checked ? measuredHeight.value : 0, 
      { duration: 300 }
    )
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  return (
    <View>
      <TouchableOpacity 
        activeOpacity={1} 
        className={`flex-row items-center rounded-lg p-4 z-10 ${checked ? `bg-gray-300`: `bg-gray-200`}`} 
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

      {openField && (
        <Animated.View 
          className="z-0 rounded-lg"
          style={animatedStyle}
        >
          <View
            style={{ position: 'absolute', width: '100%' }}
            onLayout={(e) => {
              measuredHeight.value = e.nativeEvent.layout.height;
            }}
          >
            <View className="px-4 pb-4 mt-2">
              <Text className="text-base text-gray-800 mb-2">{fieldTitle}</Text>
              <Input 
                formProps={{ 
                  name: 'gender', 
                  control
                }}
                inputProps={{
                  placeholder: `${fieldPlaceholder}`,
                }}
              />
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
