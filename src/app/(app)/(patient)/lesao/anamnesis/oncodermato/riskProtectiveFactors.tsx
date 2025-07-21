import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RiskProtectiveFactorsDetails() {


  const handleCancel = () => {
    router.back();
  }


  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Fatores de Risco e Proteção" icon="back" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">

        <Text className="text-base mb-2 text-gray-700 font-semibold mt-6">Você se expõe ao sol por longos períodos?</Text>
        <Text className="text-base text-gray-500">
          Diariamente
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Quantas vezes ao longo da vida o paciente já teve queimaduras solares graves (com formação de bolhas)?</Text>
          <Text className="text-base text-gray-500">
          Sim
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente usa protetor solar regularmente? Se sim, qual FPS?</Text>
          <Text className="text-base text-gray-500">Sim</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente usa chapéus ou roupas de proteção ao se expor ao sol? </Text>
          <Text className="text-base text-gray-500">Sim</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente já utilizou serviços de bronzeamento artificial?</Text>
          <Text className="text-base text-gray-500">Sim</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Com que frequencia o paciente visita o dermatologista para check-ups?</Text>
          <Text className="text-base text-gray-500">1-2</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente já participou de campanhas de prevenção contra o câncer de pele?</Text>
          <Text className="text-base text-gray-500">Sim</Text>

        </View>

        <TouchableOpacity
          className="flex-row items-center justify-start p-4 mt-6 gap-2 self-start"
        >
          <Feather name="edit-2" size={16} color="#1E1E1E" />
          <Text>Editar</Text>
        </TouchableOpacity>

      </ScrollView>
    </Animated.View>
  );
}
