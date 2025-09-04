import * as IconPhosphor from "phosphor-react-native";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type IconNameProps = Exclude<keyof typeof IconPhosphor, "IconContext">;

type HelpProps = TouchableOpacityProps & {
  iconName: IconNameProps;
  title?: string;
  description?: string;
};

export default function HelpBox({ iconName, title, description, ...rest }: HelpProps) {
  const IconComponent = IconPhosphor[iconName];
  return (
    <TouchableOpacity 
      className="w-[47%] p-6 bg-white rounded-xl justify-start items-start shadow-sm shadow-neutral-800"
      style={{ minHeight: 168 }}
    >
      <View className="w-12 h-12 bg-secondary-100 rounded-lg justify-center items-center">
        <IconComponent size={30} color="#FF765E" />
      </View>

      <Text className="font-semibold text-neutral-800 mt-4">{title}</Text>
      <Text className="text-neutral-600 text-sm mt-1">{description}</Text>
    </TouchableOpacity>
  );
}