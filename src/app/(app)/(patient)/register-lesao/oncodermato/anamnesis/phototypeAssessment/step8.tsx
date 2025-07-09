import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PhototypeAssessmentStep8() {
  
  const { phototypeAssessmentData, setPhototypeAssessmentData } = usePhototypeAssessmentForm();

  const handleNext = () => {
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  const handleCancel = () => {
    setPhototypeAssessmentData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    console.log(phototypeAssessmentData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Avaliação de Fototipo" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={8} totalSteps={8} />

        <View className="flex-row gap-4 justify-between mt-8">
          <View className="border border-gray-300 rounded-lg p-4 w-[47%]">
            <Text className="text-sm">Classificação do Fototipo</Text>
            <Text className="text-xl font-semibold mt-2">Fototipo III</Text>
          </View>
          <View className="border border-gray-300 rounded-lg p-4 w-[47%]">
            <Text className="text-sm">Pontuação total</Text>
            <Text className="text-xl font-semibold mt-2">21</Text>
          </View>
        </View>

        <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">Qual é a cor natural da sua pele (áreas não expostas ao sol)?</Text>
        <Text className="text-base text-gray-500">
          {phototypeAssessmentData.skin_color}
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Qual é a cor dos seus olhos?</Text>
          <Text className="text-base text-gray-500">
            {phototypeAssessmentData.eyes_color}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Qual é a cor natural do seu cabelo?</Text>
          <Text className="text-base text-gray-500">
            {phototypeAssessmentData.hair_color}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Quantas sardas você tem em áreas não expostas?</Text>
          <Text className="text-base text-gray-500">{phototypeAssessmentData.freckles}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Como sua pele reage quando fica muito tempo exposta ao sol?</Text>
          <Text className="text-base text-gray-500">{phototypeAssessmentData.sun_exposed}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Sua pele bronzeia?</Text>
          <Text className="text-base text-gray-500">{phototypeAssessmentData.tanned_skin}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Quão sensível é a face do paciente ao sol?</Text>
          <Text className="text-base text-gray-500">{phototypeAssessmentData.sun_sensitive_skin}</Text>

        </View>

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step7')} 
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
