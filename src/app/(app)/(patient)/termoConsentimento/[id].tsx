import Header from '@/components/Header';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';

export default function TermoConsentimentoDetails() {

  return (
    <View className="flex-1 bg-white p-safe">

      <Header icon="back" title="" onPress={()=> router.push("/(app)/(patient)/patient/[id]")} />

      <Text className="text-2xl font-semibold px-8">Termo de consentimento</Text>

      <View className="flex-row flex-wrap gap-4 mt-8 px-8">
        <TouchableOpacity 
          className="w-[30%] h-[105] border border-gray-300 rounded-lg justify-center items-center overflow-hidden bg-gray-300 relative"
          onPress={()=> router.push("/(app)/(patient)/termoConsentimento/details")}
        >
          <Image 
            source={{ uri: "https://thestartlaw.com/wp-content/uploads/2022/10/TERMOS_DE_USO.png" }}
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
          onPress={()=> router.push("/(app)/(patient)/termoConsentimento/details")}
        >
          <Image 
            source={{ uri: "https://vivaocondominio.com.br/wp-content/uploads/2022/05/Termo-de-responsabilidade.jpg" }}
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
          onPress={()=> router.push("/(app)/(patient)/termoConsentimento/details")}
        >
          <Image 
            source={{ uri: "https://www.administrefacil.com.br/images/modelos/400x500/1468-83ca0590a2a926a0a605713b1f046071.gif" }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            contentPosition="top"
          />
          <View className="bg-gray-600 absolute bottom-4 w-[73] h-[24] rounded-md justify-center items-center">
            <Text className="text-white text-sm">Visualizar</Text>
          </View>
        </TouchableOpacity>

      </View>


    </View>
  );
}
