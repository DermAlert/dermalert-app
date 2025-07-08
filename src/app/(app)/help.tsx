import Header from "@/components/Header";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';

export default function Help() {

  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header title="Ajuda" icon="back" onPress={()=> router.push("/(app)/home")} />

      <View className="px-6 w-full justify-start flex-1 mt-6">

        <Text className="mb-4 text-2xl font-semibold">Precisa de ajuda?</Text>

        <Text className="text-base text-gray-500">Aqui você encontra tutoriais e perguntas frequentes relacionadas ao Dermalert.</Text>

        <View className="flex-row flex-wrap gap-4 mt-6">
          <TouchableOpacity className="w-[47%] h-36 p-5 border border-gray-300 rounded-lg justify-center items-start">
            <Feather name="book-open" size={22} color="#1E1E1E" />
            <Text className="font-semibold text-gray-800 mt-2">Tutorial</Text>
            <Text className="text-gray-700 text-sm mt-1">Entenda como o Dermalert funciona</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[47%] h-36 p-6 border border-gray-300 rounded-lg justify-center items-start">
            <Feather name="list" size={22} color="#1E1E1E" />
            <Text className="font-semibold text-gray-800 mt-2">FAQ</Text>
            <Text className="text-gray-700 text-sm mt-1">Perguntas frequentes</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-[47%] h-36 p-6 border border-gray-300 rounded-lg justify-center items-start">
            <Feather name="play-circle" size={22} color="#1E1E1E" />
            <Text className="font-semibold text-gray-800 mt-2">Curso</Text>
            <Text className="text-gray-700 text-sm mt-1">Acompanhe e assista às aulas</Text>
          </TouchableOpacity>
        </View>

        
      </View>

    </View>
  );
}
