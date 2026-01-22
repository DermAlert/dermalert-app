import * as IconPhosphor from "phosphor-react-native";
import { View, ViewProps } from "react-native";

type IconNameProps = Exclude<keyof typeof IconPhosphor, "IconContext">;

type IconProps = ViewProps & {
  iconName: IconNameProps;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  disabled?: boolean;
  warning?: boolean;
};

export default function Icon({ iconName, weight = "regular", disabled = false, warning = false, ...rest }: IconProps) {
  const IconComponent = IconPhosphor[iconName];
  return (
    <View className={`${warning ? 'bg-danger-100' : 'bg-primary-100'} rounded-3xl p-4 self-start`} {...rest}>
      <IconComponent size={40} color={`${disabled ? '#D4D6DF' : warning ? '#C10007' : '#4052A1'}`} weight={weight} />
    </View>
  );
}