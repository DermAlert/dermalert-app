import * as IconPhosphor from "phosphor-react-native";
import { View, ViewProps } from "react-native";

type IconNameProps = Exclude<keyof typeof IconPhosphor, "IconContext">;

type IconProps = ViewProps & {
  iconName: IconNameProps;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  disabled?: boolean;
};

export default function Icon({ iconName, weight = "regular", disabled = false, ...rest }: IconProps) {
  const IconComponent = IconPhosphor[iconName];
  return (
    <View className="rounded-3xl bg-primary-100 p-4 self-start" {...rest}>
      <IconComponent size={40} color={`${disabled ? '#D4D6DF' : '#4052A1'}`} weight={weight} />
    </View>
  );
}