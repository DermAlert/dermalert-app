
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string,
  secondary?: boolean,
  iconLeft?: boolean,
  iconRight?: boolean,
  icon?: ReactNode,
  disabled?: boolean
};


export default function Input({ title, secondary = false, iconLeft = false, iconRight = false, icon, disabled = true, ...rest }: Props) {

  return (
    <TouchableOpacity activeOpacity={0.7} className={`${secondary ? 'bg-white border-gray-800' : disabled ? 'bg-gray-800' : 'bg-gray-300 border-gray-400'} w-full justify-center border items-center rounded-md flex-row`} {...rest}>
      {iconLeft && icon}
      <Text className={`${secondary ? 'text-gray-800' : disabled ? 'text-white' : 'text-gray-400'} p-4`}>{title}</Text>
      {iconRight && icon}
    </TouchableOpacity>
  )
}