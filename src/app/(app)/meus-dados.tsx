import Header from '@/components/Header';
import UnidadeCard from "@/components/UnidadeCard";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Octicons from '@expo/vector-icons/Octicons';
import { router } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function MeusDados() {

  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header icon="back" title="Meus dados" onPress={()=> router.push("/(app)/home")} />

      <View className="flex-1">
        <Text className="text-base mb-4 font-semibold px-4">Dados pessoais</Text>

        <View className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
          <FontAwesome5 name="user" size={15} color="#49454F" />
          <View>
            <Text className='text-xs text-gray-800'>Nome completo</Text>
            <Text className='text-base text-gray-800'>Paulo Henrique Gusmão</Text>
          </View>
        </View>
        
        <View className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
          <FontAwesome5 name="user" size={15} color="#49454F" />
          <View>
            <Text className='text-xs text-gray-800'>CPF</Text>
            <Text className='text-base text-gray-800'>123.456.789-12</Text>
          </View>
        </View>

        <View className="border-b border-gray-400 flex-row justify-between px-5 py-3 items-center gap-5">
          <Fontisto name="email" size={15} color="#49454F" />
          <View className='flex-1'>
            <Text className='text-xs text-gray-800'>E-mail</Text>
            <Text className='text-base text-gray-800'>paulohg@email.com</Text>
          </View>
          <TouchableOpacity onPress={()=> router.push("/(app)/edit-email")}>
            <Octicons name="pencil" size={18} color="#49454F" />
          </TouchableOpacity>
        </View>

        <View className="border-b border-gray-400 flex-row justify-between px-5 py-3 items-center gap-5">
          <Feather name="key" size={15} color="#49454F" />
          <View className='flex-1'>
            <Text className='text-xs text-gray-800'>Senha</Text>
            <Text className='text-base text-gray-800'>Alterar senha</Text>
          </View>
          <TouchableOpacity onPress={()=> router.push("/(app)/edit-password")}>
            <Octicons name="pencil" size={18} color="#49454F" />
          </TouchableOpacity>
        </View>

        <Text className="text-base mb-4 font-semibold px-4 mt-8">Unidades</Text>
        
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => <UnidadeCard activeOpacity={1} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom: 0
          }}
        />
      </View>


    </View>
  );
}
