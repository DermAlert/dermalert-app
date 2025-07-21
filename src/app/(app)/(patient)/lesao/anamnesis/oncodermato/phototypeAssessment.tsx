import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PhototypeAssessmentDetails() {


  const handleCancel = () => {
    router.back();
  }


  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Avaliação de Fototipo" icon="back" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">

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
          Sim
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Qual é a cor dos seus olhos?</Text>
          <Text className="text-base text-gray-500">
          Sim
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Qual é a cor natural do seu cabelo?</Text>
          <Text className="text-base text-gray-500">
          Sim
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Quantas sardas você tem em áreas não expostas?</Text>
          <Text className="text-base text-gray-500">Sim</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Como sua pele reage quando fica muito tempo exposta ao sol?</Text>
          <Text className="text-base text-gray-500">Sim</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Sua pele bronzeia?</Text>
          <Text className="text-base text-gray-500">Sim</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Quão sensível é a face do paciente ao sol?</Text>
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
