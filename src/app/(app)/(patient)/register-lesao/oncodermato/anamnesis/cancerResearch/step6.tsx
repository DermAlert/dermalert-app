import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function CancerResearchStep6() {
  
  const { cancerResearchData, setCancerResearchData } = useCancerResearchForm();

  const handleNext = () => {
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }
  
  const handleCancel = () => {
    setCancerResearchData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }



  useEffect(() => {
    console.log(cancerResearchData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Investigação de CA e Lesões" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={6} totalSteps={6} />

        <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">O paciente tem pintas ou manchas que mudaram de cor, tamanho ou formato recentemente?</Text>
        <Text className="text-base text-gray-500">
          {cancerResearchData.suspicious_moles}
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Essas manchas ou lesões causam coceira, sangramento ou dor?</Text>
          <Text className="text-base text-gray-500">
            {cancerResearchData.bleed_itch}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Há quanto tempo o paciente notou essas alterações?</Text>
          <Text className="text-base text-gray-500">
            {cancerResearchData.how_long}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Essas lesões têm bordas irregulares, múltiplas cores ou assimetria?</Text>
          <Text className="text-base text-gray-500">{cancerResearchData.lesion_aspect}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente já procurou um médico para avaliar essas lesões?</Text> 
          <Text className="text-base text-gray-500">{cancerResearchData.doctor_assistance}</Text>

        </View>
      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step5')} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Salvar" 
          onPress={handleNext}
          style={{ flexGrow: 1, width: '47%' }}
        />
      </View>
    </Animated.View>
  );
}
