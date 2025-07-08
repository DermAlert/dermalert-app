import Header from '@/components/Header';
import { router } from "expo-router";
import { Text, View } from 'react-native';

export default function AntecedentesClinicos() {

  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header icon="back" title="" onPress={()=> router.push("/(app)/(patient)/patient/[id]")} />

      <View className="px-8">

        <Text className="text-2xl font-semibold">Antecedentes clínicos</Text>
        <Text className="text-base mb-2 text-gray-700 font-semibold mt-8">O paciente tem histórico de doenças crônicas?</Text>
        <Text className="text-base text-gray-500">Hipertensão</Text>

      </View>

      <View className="px-8 mt-6">

        <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente faz uso regular de medicamentos? </Text>
        <Text className="text-base text-gray-500">Não</Text>

      </View>

      <View className="px-8 mt-6">

        <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente possui alergias? </Text>
        <Text className="text-base text-gray-500">Ibuprofeno</Text>

      </View>

      <View className="px-8 mt-6">

        <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente já passou por cirurgias </Text>
        <Text className="text-base text-gray-500">Operou hérnia de disco em 2021.</Text>

      </View>

      <View className="px-8 mt-6">

        <Text className="text-base mb-2 text-gray-700 font-semibold">O paciente pratica atividade física regularmente?</Text>
        <Text className="text-base text-gray-500">1-2 vezes por semana</Text>

      </View>


    </View>
  );
}
