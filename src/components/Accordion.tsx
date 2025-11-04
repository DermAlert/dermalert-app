import { CaretDownIcon, CaretUpIcon, PersonIcon } from "phosphor-react-native";
import React from "react";
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
 
  const containerStyle = `flex-row items-center gap-[10] rounded-2xl ${
    indented ? "bg-white px-6 py-2" : isOpen ? "bg-primary-200 px-4 py-5" : "bg-primary-100 px-4 py-5"
  }`;

  const isOpenIcon = isOpen ? (
    <CaretUpIcon size={16} color="#4052A1" weight="bold" />
  ) : (
    <CaretDownIcon size={16} color="#4052A1" weight="bold" />
  );
  
  const leftIcon = indented ? (
    isOpenIcon
  ) : (
    icon ?? <PersonIcon size={20} color="#6775B4" weight="bold" />
  );
  
  const rightIcon = !indented && isOpenIcon;

  return (
    <View className="gap-2">
      <TouchableOpacity className={containerStyle} onPress={onToggle}>
        {leftIcon}
        <Text allowFontScaling={false} className="text-neutral-700 text-base flex-1">{title}</Text>
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
