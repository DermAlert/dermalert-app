import Button from '@/components/Button';
import Header from '@/components/Header';
import LesaoCard from '@/components/LesaoCard';
import ModalLesaoFiltro from '@/components/ModalLesaoFiltro';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { router } from "expo-router";
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Patient() {
  const [modalLesoesVisible, setModalLesoesVisible] = useState(false);

  return (
    <View className="flex-1 bg-white p-safe relative">

      <ModalLesaoFiltro modalLesoesVisible={modalLesoesVisible} setModalLesoesVisible={setModalLesoesVisible} />

      <Header icon="back" title="" onPress={()=> router.push("/(app)/home")} />

      <View className="flex-1 px-4">

        <View className="border border-gray-400 rounded-lg overflow-hidden">
          <View className="border-b border-gray-400">
            <TouchableOpacity 
              activeOpacity={0.7} 
              className="flex-row justify-start px-5 py-3 items-center gap-5"
              onPress={()=> router.push("/(app)/(patient)/patientDetails/[id]")}
            >
              <View className="flex-1">
                <Text className='text-base font-semibold text-gray-800'>Gustavo Andrade de Souza</Text>
                <Text className='text-sm text-gray-600'>123.456.789-12</Text>
              </View>
              <AntDesign name="caretright" size={10} color="#49454F" />
            </TouchableOpacity>
          </View>

          <View className="border-b border-gray-400">
            <TouchableOpacity 
              className="flex-row justify-start px-5 py-3 items-center gap-5"
              onPress={()=> router.push("/(app)/(patient)/GeneralHealth/[id]")}
            >
              <FontAwesome5 name="clipboard" size={20} color="#B3B3B3" />
              <Text className='text-base text-gray-800 flex-1'>Antecedentes clínicos</Text>
              <AntDesign name="caretright" size={10} color="#49454F" />
            </TouchableOpacity>
          </View>

          <View className="border-b border-gray-400">
            <TouchableOpacity 
              className="flex-row justify-start px-5 py-3 items-center gap-5"
              onPress={()=> router.push("/(app)/(patient)/termoConsentimento/[id]")}
            >
              <AntDesign name="file1" size={20} color="#B3B3B3" />
              <Text className='text-base text-gray-800 flex-1'>Termo de consentimento</Text>
              <AntDesign name="caretright" size={10} color="#49454F" />
            </TouchableOpacity>
          </View>

          <View className="border-b border-gray-400">
            <TouchableOpacity className="flex-row justify-start px-5 py-3 items-center gap-5">
              <Feather name="server" size={20} color="#B3B3B3" />
              <Text className='text-base text-gray-800 flex-1'>Anamnese Oncodermato</Text>
              <AntDesign name="caretright" size={10} color="#49454F" />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity className="flex-row justify-start px-5 py-3 items-center gap-5">
              <Feather name="server" size={20} color="#B3B3B3" />
              <Text className='text-base text-gray-800 flex-1'>Anamnese Úlcera Venosa</Text>
              <AntDesign name="caretright" size={10} color="#49454F" />
            </TouchableOpacity>
          </View>

        </View>

        
        <View className="flex-row justify-between items-center">
          <Text className="text-base mb-4 font-semibold mt-8">Lesões registradas</Text>
          <TouchableOpacity 
            className="w-10 h-10 justify-center items-center"
            onPress={() => setModalLesoesVisible(!modalLesoesVisible)}
          >
            <Feather name="filter" size={16} color="#1E1E1E" />
          </TouchableOpacity>
        </View>
        
        <View className="flex-1">
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => <LesaoCard activeOpacity={1} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom:50,
              gap: 10
            }}
          />
        </View>

      </View>

      <View className="absolute bottom-0 m-auto w-full justify-center items-center mb-12 z-10">
        <Button title="Registrar nova lesão" style={{ width: 194 }} iconLeft icon={(<Feather name="plus" size={14} color="white" />)} onPress={()=> router.push("/(app)/(patient)/register-lesao/select")} />
      </View>

    </View>
  );
}
