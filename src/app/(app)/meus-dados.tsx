import Header from '@/components/Header';
import UnidadeCard from "@/components/UnidadeCard";
import { router, useFocusEffect } from 'expo-router';
import { EnvelopeSimpleIcon, IdentificationCardIcon, KeyIcon, PencilSimpleLineIcon, UserIcon } from 'phosphor-react-native';
import { useCallback } from 'react';
import { BackHandler, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function MeusDados() {

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.push("/(app)/home")
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header icon="back" title="Meus dados" onPress={()=> router.push("/(app)/home")} />

      <View className="flex-1">
        <Text allowFontScaling={false} className="text-lg mb-4 font-medium px-4 mt-6 text-neutral-900">Dados pessoais</Text>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <UserIcon size={24} color="#6775B4" />
          <View>
            <Text allowFontScaling={false} className='text-xs font-semibold text-neutral-600'>Nome completo</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>Paulo Henrique Gusmão</Text>
          </View>
        </View>
        
        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <IdentificationCardIcon size={24} color="#6775B4" />
          <View>
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>CPF</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>123.456.789-12</Text>
          </View>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-between px-4 py-3 items-center gap-4">
          <EnvelopeSimpleIcon size={24} color="#6775B4" />
          <View className='flex-1'>
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>E-mail</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>paulohg@email.com</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push("/(app)/edit-email")}
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-between px-4 py-3 items-center gap-5">
          <KeyIcon size={24} color="#6775B4" />
          <View className='flex-1'>
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>Senha</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>Alterar senha</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push("/(app)/edit-password")} 
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>

        <Text allowFontScaling={false} className="text-lg mb-4 font-medium px-4 mt-8 text-neutral-900">Unidades</Text>
        
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
