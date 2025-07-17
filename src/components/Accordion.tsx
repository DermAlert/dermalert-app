import { Entypo, Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  indented?: boolean;
};

export default function Accordion({ title, isOpen, onToggle, children, icon, indented = false }: Props) {
  const measuredHeight = useSharedValue(0);

  const animatedHeight = useDerivedValue(() =>
    withTiming(isOpen ? measuredHeight.value : 0, { duration: 300 })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: "hidden",
  }));

  const containerStyle = `flex-row items-center gap-4 rounded-lg p-4 ${
    indented ? "bg-white" : isOpen ? "bg-gray-300" : "bg-gray-200"
  }`;
  
  const leftIcon = indented ? (
    <Entypo name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="#49454F" />
  ) : (
    icon ?? <Ionicons name="body" size={20} color="#49454F" />
  );
  
  const rightIcon = !indented && (
    <Entypo name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="#49454F" />
  );

  return (
    <View>
      <TouchableOpacity className={containerStyle} onPress={onToggle}>
        {leftIcon}
        <Text className="text-gray-800 text-base flex-1">{title}</Text>
        {rightIcon}
      </TouchableOpacity>
      

      <Animated.View className="z-0 rounded-lg" style={animatedStyle}>
        <View
          style={{ position: "absolute", width: "100%" }}
          onLayout={(e) => {
            measuredHeight.value = e.nativeEvent.layout.height;
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
