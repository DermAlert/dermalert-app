
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string,
  secondary?: boolean,
  iconLeft?: boolean,
  iconRight?: boolean,
  icon?: ReactNode,
  disabled?: boolean;
  full?: boolean;
};


export default function Input({ title, secondary = false, iconLeft = false, iconRight = false, icon, disabled = true, full = true, ...rest }: Props) {

  return (
    <TouchableOpacity activeOpacity={0.7} className={`${secondary ? 'bg-white border-primary-600 py-2 px-3' : disabled ? 'bg-primary-600 border-primary-600 p-4' : 'bg-neutral-200 border-neutral-200 p-4'} max-h-14 justify-between border items-center rounded-full flex-row gap-2 ${full && 'w-full'}`} {...rest}>
      {iconLeft && icon}
      <Text className={`${secondary ? 'text-primary-600' : disabled ? 'text-white' : 'text-neutral-400'} text-base font-semibold text-center self-center ${full && 'flex-1'}`}>{title}</Text>
      {iconRight && icon}
    </TouchableOpacity>
  )
}