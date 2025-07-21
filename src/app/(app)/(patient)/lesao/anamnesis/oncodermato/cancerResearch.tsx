import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function CancerResearchDetails() {


  const handleCancel = () => {
    router.back();
  }


  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Investigação de CA e Lesões" icon="back" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">

      <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">O paciente tem pintas ou manchas que mudaram de cor, tamanho ou formato recentemente?</Text>
        <Text className="text-base text-gray-500">
        Sim
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Essas manchas ou lesões causam coceira, sangramento ou dor?</Text>
          <Text className="text-base text-gray-500">
          Sim
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Há quanto tempo o paciente notou essas alterações?</Text>
          <Text className="text-base text-gray-500">
          Sim
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Essas lesões têm bordas irregulares, múltiplas cores ou assimetria?</Text>
          <Text className="text-base text-gray-500">Sim</Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente já procurou um médico para avaliar essas lesões?</Text> 
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
