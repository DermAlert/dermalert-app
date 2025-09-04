
import { setImageUri } from '@/storage/imageStore';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  image: string,
  isDeletable?: boolean,
  isOncodermato?: boolean,
  isUlcera?: boolean,
  isPatient?: boolean
};


export default function PhotoCard({image, isDeletable = false, isOncodermato = false, isUlcera = false, isPatient = false, ...rest }: Props) {

  return (
    <TouchableOpacity 
      className="w-[30.2%] h-[95] border border-neutral-300 rounded-lg justify-center items-center overflow-hidden bg-neutral-300 relative"
      // onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details", params: { deletar: 'true' }})}
      onPress={() => {
        setImageUri(image);
        router.push({pathname: "/(app)/(patient)/termoConsentimento/details", params: { deletar: isDeletable ? 'true': '', isOncodermato: isOncodermato ? 'true' : '', isPatient: isPatient ? 'true' : '', isUlcera: isUlcera ? 'true' : '' } })
      }}
      {...rest}
    >
      <Image 
        source={{ uri: image }}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        contentPosition="top"
      />
      <View className="bg-primary-800 absolute bottom-4 w-[73] py-1 rounded-xs justify-center items-center">
        <Text className="text-white text-sm font-semibold">Visualizar</Text>
      </View>
    </TouchableOpacity>
  )
}