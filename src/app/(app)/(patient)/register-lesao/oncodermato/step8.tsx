import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep8() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionData, setRegisterLesionData } = useRegisterLesionForm();

  const handleNext = () => {
    router.push('/(app)/(patient)/register-lesao/oncodermato/step8');
  }
  
  const handleCancel = () => {
    setRegisterLesionData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }



  useEffect(() => {
    console.log(registerLesionData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Registrar lesão" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={8} totalSteps={8} />

        <Text className="text-2xl font-semibold mt-6">Resumo</Text>

        <View className="mt-6">

          <Text className="font-semibold">A - Assimetria</Text>

          <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">A lesão apresenta simetria entre suas metades?</Text>
          <Text className="text-base text-gray-500">
            {registerLesionData.symmetry}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="font-semibold">B - Bordas</Text>

          <Text className="text-base mb-2 text-gray-700 font-semibold">Como são as bordas da lesão?</Text>
          <Text className="text-base text-gray-500">
            {registerLesionData.borders}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="font-semibold">C - Cor</Text>
          <Text className="text-base mb-2 text-gray-700 font-semibold">A lesão apresenta variação de cor?</Text>
          <Text className="text-base text-gray-500">
            {registerLesionData.color_variation}
          </Text>

        </View>

        <View className="mt-6">

          <Text className="font-semibold">D - Diâmetro</Text>
          <Text className="text-base mb-2 text-gray-700 font-semibold">Qual o tamanho aproximado da lesão?</Text>
          <Text className="text-base text-gray-500">{registerLesionData.size}</Text>

        </View>

        <View className="mt-6">

          <Text className="font-semibold">E - Evolução</Text>
          <Text className="text-base mb-2 text-gray-700 font-semibold">A lesão mudou ao longo do tempo?</Text> 
          <Text className="text-base text-gray-500">{registerLesionData.changed}</Text>

        </View>

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/success')} 
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
