import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function GeneralHealthStep6() {
  
  const { generalHealthData, setGeneralHealthData  } = useGeneralHealthForm();

  const handleNext = () => {
    router.push('/(app)/register-patient/step9');
  }

  const handleCancel = () => {
    setGeneralHealthData({});
    router.push('/(app)/register-patient/step9');
  }



  useEffect(() => {
    console.log(generalHealthData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Andecedentes clínicos" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={6} totalSteps={6} />

        <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">O paciente tem histórico de doenças crônicas?</Text>
        <Text className="text-base text-gray-500">
          {generalHealthData.chronic_diseases?.join(', ')}
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente faz uso regular de medicamentos? </Text>
          <Text className="text-base text-gray-500">
            {generalHealthData.medicines_ids?.join(', ')}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente possui alergias? </Text>
          <Text className="text-base text-gray-500">
            {generalHealthData.allergies_ids?.join(', ')}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente já passou por cirurgias </Text>
          <Text className="text-base text-gray-500">{generalHealthData.surgeries}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente pratica atividade física regularmente?</Text>
          <Text className="text-base text-gray-500">{generalHealthData.physical_activity_frequency}</Text>

        </View>
      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/general-health/step5")} 
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
