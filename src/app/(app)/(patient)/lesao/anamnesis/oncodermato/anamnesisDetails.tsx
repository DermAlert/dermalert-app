import Header from "@/components/Header";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function OncodermatoAnamnesisDetails() {

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <Header title="Anamnese Oncodermato" icon="back" onPress={() => router.back()} />

      <View className="px-6 w-full justify-center flex-1 gap-3">


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-5 bg-white"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/personalFamilyHistory')}
        >
          <View className="flex-1 px-4 py-1 max-w-[230px]">
            <Text className="text-base">Histórico Familiar e Pessoal de Câncer de Pele</Text>
          </View>          
          <Entypo name="chevron-thin-right" size={15} color="#1E1E1E" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-5 bg-white"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/phototypeAssessment')}
        >
          <View className="flex-1 px-4 py-1 max-w-[230px]">
            <Text className="text-base">Avaliação de Fototipo</Text>
            <Text className="text-sm">Fototipo III, Pontuação 21</Text>
          </View>          
          <Entypo name="chevron-thin-right" size={15} color="#1E1E1E" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-5 bg-white"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/riskProtectiveFactors')}
        >
          <View className="flex-1 px-4 py-1 max-w-[230px]">
            <Text className="text-base">Fatores de Risco e Proteção para Câncer de Pele</Text>
          </View>          
          <Entypo name="chevron-thin-right" size={15} color="#1E1E1E" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between border border-gray-300 rounded-lg px-4 py-5 bg-white"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/cancerResearch')}
        >
          <View className="flex-1 px-4 py-1 max-w-[230px]">
            <Text className="text-base">Investigação de Câncer de Pele e Lesões Suspeitas</Text>
          </View>          
          <Entypo name="chevron-thin-right" size={15} color="#1E1E1E" />
        </TouchableOpacity>


      </View>


    </Animated.View>
  );
}
