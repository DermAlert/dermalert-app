import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

export default function LesaoRegistroCard({...rest}: TouchableOpacityProps) {

  return (
    <TouchableOpacity 
      className="border border-gray-300 rounded-lg flex-row justify-start p-3 items-center gap-3"
      activeOpacity={0.6}
      onPress={()=> {
        router.push('/(app)/(patient)/lesao/registroDetail/registroDetail');
      }}
      {...rest}
    >

      <View 
        className="w-[56] h-[56] border border-gray-300 rounded-md justify-center items-center overflow-hidden bg-gray-300 relative"
      >
        <Image 
          source={{ uri: "https://clinicapatriciaholderbaum.com.br/wp-content/uploads/2021/08/lpele5.jpg" }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          contentPosition="top"
        />
      </View>

      <View>

        <Text className='font-semibold text-sm self-start mb-1'>
          Registro de 27/05/2025
        </Text>

        <Text className='text-xs text-gray-600'>
          4 imagens
        </Text>
        
      </View>


    </TouchableOpacity>
  )
}