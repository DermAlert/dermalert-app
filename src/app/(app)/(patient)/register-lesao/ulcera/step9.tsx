import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoUlceraStep9() {

  const { registerLesionUlceraData, setRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
   

  const handleNext = () => {
    router.push('/(app)/(patient)/register-lesao/ulcera/success');
  }

  const handleCancel = () => {
    setRegisterLesionUlceraData({});
    router.push('/(app)/(patient)/register-lesao/select');
  }


  useEffect(() => {
    console.log(registerLesionUlceraData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Registrar lesão" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={9} totalSteps={9} />

        <View className="border border-gray-300 p-4 rounded-lg mt-6">
          <Text className="mb-2">Pontuação total</Text>
          <Text className="text-2xl font-bold">15</Text>
        </View>

        <View className="mt-6">

          <Text className="font-semibold mb-2">Dimensão da lesão</Text>
          <Text className="text-base text-gray-500">
            {registerLesionUlceraData.lesion_dimension}
          </Text>
          <Text className="font-semibold mb-2 text-green-600 text-base">+3 pontos</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Profundidade do tecido atingido</Text>
          <Text className="text-base text-gray-500">
            {registerLesionUlceraData.depth}
          </Text>
          <Text className="font-semibold mb-2 text-green-600 text-base">+2 pontos</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Bordos</Text>
          <Text className="text-base text-gray-500">
            {registerLesionUlceraData.bordos}
          </Text>
          <Text className="font-semibold mb-2 text-green-600 text-base">+2 pontos</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Tipo de tecido presente no leito da ferida</Text>
          <Text className="text-base text-gray-500">{registerLesionUlceraData.skin_type}</Text>
          <Text className="font-semibold mb-2 text-green-600 text-base">+2 pontos</Text>

        </View>

        <View className="mt-6">
          <Text className="text-base mb-2 text-gray-700 font-semibold">Exsudato</Text> 
          <Text className="text-base text-gray-500">{registerLesionUlceraData.exsudato}</Text>
          <Text className="font-semibold mb-2 text-green-600 text-base">+2 pontos</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Infecção/Inflamação</Text> 
          <Text className="text-base text-gray-500">{registerLesionUlceraData.inflamacao?.join(', ')}</Text>
          <Text className="font-semibold mb-2 text-green-600 text-base">+2 pontos</Text>

        </View>

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/(patient)/register-lesao/ulcera/step8")} 
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
