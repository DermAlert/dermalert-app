import { Text, View, ViewProps } from 'react-native';

type TitleTextProps = ViewProps & {
  title?: string;
  description?: string;
}

export function TitleText({ title, description, ...rest }: TitleTextProps) {
  return (
    <View {...rest}>
      {title && (<Text allowFontScaling={false} className="text-xl font-bold text-neutral-900">{title}</Text>)}

      {description && (<Text allowFontScaling={false} className="mt-4 text-base text-neutral-700">{description}</Text>)}
    </View>
    
  );
}