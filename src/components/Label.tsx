import { Text, View, ViewProps } from "react-native";

type LabelProps = ViewProps & {
  title?:string;
  text?: string;
}

export function Label({ text, title, ...rest }: LabelProps) {
  return (
    <View className="mb-2" {...rest}>
      {title && <Text className="text-base text-neutral-900 font-semibold">{title}</Text>}
      {text && <Text className="text-base text-neutral-700">{text}</Text>}
    </View>
    
  );
}