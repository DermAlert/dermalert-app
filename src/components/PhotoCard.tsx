
import { Image } from 'expo-image';
import { router } from "expo-router";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  image: string,
};


export default function PhotoCard({image, ...rest }: Props) {

  return (
    <TouchableOpacity 
      className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
      onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details", params: { deletar: 'true' }})}
      {...rest}
    >
      <Image 
        source={{ uri: image }}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        contentPosition="top"
      />
      <View className="bg-gray-600 absolute bottom-4 w-[73] h-[24] rounded-md justify-center items-center">
        <Text className="text-white text-sm">Visualizar</Text>
      </View>
    </TouchableOpacity>
  )
}