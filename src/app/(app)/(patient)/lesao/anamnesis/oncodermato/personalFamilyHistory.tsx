import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PersonalFamilyHistoryDetails() {


  const handleCancel = () => {
    router.back();
  }


  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Histórico Familiar e Pessoal" icon="back" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">

      <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">Você tem histórico familiar de câncer de pele?</Text>
        <Text className="text-base text-gray-500">
          Sim
        </Text>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Você já foi diagnosticado com câncer de pele? </Text>
          <Text className="text-base text-gray-500">
          Sim 
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Você já teve lesões removidas que foram identificadas como pré-cancerígenas? </Text>
          <Text className="text-base text-gray-500">
          Sim
          </Text>

        </View>

        <View className="mt-6">

          <Text className="text-base mb-2 text-gray-700 font-semibold">Você já passou por tratamento para lesões na pele?</Text>
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
