import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PersonalFamilyHistoryStep5() {
  const { familyHistoryData, setFamilyHistoryData  } = useFamilyHistoryForm();

  const handleNext = () => {
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  const handleCancel = () => {
    setFamilyHistoryData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }



  useEffect(() => {
    console.log(familyHistoryData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >
    

      <Header title="Histórico Familiar e Pessoal" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={5} totalSteps={5} />

        <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">Você tem histórico familiar de câncer de pele?</Text>
        <Text className="text-base text-gray-500">
          {familyHistoryData.family_history?.join(', ')}
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Você já foi diagnosticado com câncer de pele? </Text>
          <Text className="text-base text-gray-500">
            {familyHistoryData.cancer_type?.join(', ')}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Você já teve lesões removidas que foram identificadas como pré-cancerígenas? </Text>
          <Text className="text-base text-gray-500">
            {familyHistoryData.removed_injuries}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Você já passou por tratamento para lesões na pele?</Text>
          <Text className="text-base text-gray-500">{familyHistoryData.injuries_treatment?.join(', ')}</Text>

        </View>
      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step3')} 
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
