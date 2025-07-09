import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RiskProtectiveFactorsStep8() {
  
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();

  const handleNext = () => {
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  const handleCancel = () => {
    setRiskProtectiveFactorsData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    console.log(riskProtectiveFactorsData)
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

        <Text className="text-2xl font-semibold">Resumo</Text>

        <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">Você se expõe ao sol por longos períodos?</Text>
        <Text className="text-base text-gray-500">
          {riskProtectiveFactorsData.sun_exposure_period}
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Quantas vezes ao longo da vida o paciente já teve queimaduras solares graves (com formação de bolhas)?</Text>
          <Text className="text-base text-gray-500">
            {riskProtectiveFactorsData.sun_burn}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente usa protetor solar regularmente? Se sim, qual FPS?</Text>
          <Text className="text-base text-gray-500">{riskProtectiveFactorsData.uv_protection}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente usa chapéus ou roupas de proteção ao se expor ao sol? </Text>
          <Text className="text-base text-gray-500">{riskProtectiveFactorsData.hat_use}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente já utilizou serviços de bronzeamento artificial?</Text>
          <Text className="text-base text-gray-500">{riskProtectiveFactorsData.artifitial_tan}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Com que frequencia o paciente visita o dermatologista para check-ups?</Text>
          <Text className="text-base text-gray-500">{riskProtectiveFactorsData.checkups_frequency}</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente já participou de campanhas de prevenção contra o câncer de pele?</Text>
          <Text className="text-base text-gray-500">{riskProtectiveFactorsData.cancer_campaigns}</Text>

        </View>

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step7')} 
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
