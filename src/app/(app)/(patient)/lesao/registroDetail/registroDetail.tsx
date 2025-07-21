import Header from "@/components/Header";
import { Image } from 'expo-image';
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function LesaoRegistroDetail() {
  
  const handleCancel = () => {
    router.back();
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >
 
      <Header icon="back" title="Registro de 27/05/2025" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">

        <Text className="text-2xl font-semibold mt-6">Imagens capturadas</Text>


        <View className="flex-row flex-wrap gap-4 mt-8">
          <TouchableOpacity 
            className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
            onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details"})}
          >
            <Image 
              source={{ uri: "https://clinicapatriciaholderbaum.com.br/wp-content/uploads/2021/08/lpele5.jpg" }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              contentPosition="top"
            />
            <View className="bg-gray-600 absolute bottom-4 w-[73] h-[24] rounded-md justify-center items-center">
              <Text className="text-white text-sm">Visualizar</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity 
            className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
            onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details"})}
          >
            <Image 
              source={{ uri: "https://vidasaudavel.einstein.br/wp-content/uploads/2023/05/lesoes-cancer-de-pele-1024x683.jpeg" }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              contentPosition="top"
            />
            <View className="bg-gray-600 absolute bottom-4 w-[73] h-[24] rounded-md justify-center items-center">
              <Text className="text-white text-sm">Visualizar</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity 
            className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
            onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/details"})}
          >
            <Image 
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTduWHzES3MMxtVG4dGsF-InE49KXNT6TMor_cR0CRpN-pCmwCbiASIhH6tco310wdXScc&usqp=CAU" }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              contentPosition="top"
            />
            <View className="bg-gray-600 absolute bottom-4 w-[73] h-[24] rounded-md justify-center items-center">
              <Text className="text-white text-sm antialiased">Visualizar</Text>
            </View>
          </TouchableOpacity>

        </View>

        <Text className="text-2xl font-semibold mt-6">Questionário ABCDE</Text>

        <View className="mt-6">

          <Text className="font-semibold">A - Assimetria</Text>

          <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">A lesão apresenta simetria entre suas metades?</Text>
          <Text className="text-base text-gray-500">
            Não, a lesão é assimétrica (uma metade é diferente da outra)
          </Text>

        </View>

        <View className="mt-6">

          <Text className="font-semibold">B - Bordas</Text>

          <Text className="text-base mb-2 text-gray-700 font-semibold">Como são as bordas da lesão?</Text>
          <Text className="text-base text-gray-500">
          Regulares e bem definidas
          </Text>

        </View>

        <View className="mt-6">

          <Text className="font-semibold">C - Cor</Text>
          <Text className="text-base mb-2 text-gray-700 font-semibold">A lesão apresenta variação de cor?</Text>
          <Text className="text-base text-gray-500">
          Três ou mais cores (ex: marrom, preto, vermelho, branco, azul)
          </Text>

        </View>

        <View className="mt-6">

          <Text className="font-semibold">D - Diâmetro</Text>
          <Text className="text-base mb-2 text-gray-700 font-semibold">Qual o tamanho aproximado da lesão?</Text>
          <Text className="text-base text-gray-500">Menor que 6 mm (menor que uma borracha de lápis)</Text>

        </View>

        <View className="mt-6">

          <Text className="font-semibold">E - Evolução</Text>
          <Text className="text-base mb-2 text-gray-700 font-semibold">A lesão mudou ao longo do tempo?</Text> 
          <Text className="text-base text-gray-500">Não houve mudanças perceptíveis nos últimos meses</Text>

        </View>

      </ScrollView>
    </Animated.View>
  );
}
