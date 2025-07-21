import Button from '@/components/Button';
import Header from '@/components/Header';
import LesaoRegistroCard from '@/components/LesaoRegistroCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Lesao() {
  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header icon="back" title="" onPress={()=> router.push("/(app)/(patient)/patient/[id]")} />

      <View className="flex-1 px-4">

        <View className="border border-gray-400 rounded-lg overflow-hidden">
          <View className="border-b border-gray-400">
            <View 
              className="flex-row justify-start px-5 py-3 items-center gap-5"
            >
              <View className="flex-1">
                <Text className='text-base font-semibold text-gray-800'>Margem frontal do couro cabeludo</Text>
                <Text className='text-sm text-gray-600'>Oncodermato</Text>
              </View>
            </View>
          </View>

          <View className="border-b border-gray-400">
            <TouchableOpacity 
              className="flex-row justify-start px-5 py-3 items-center gap-5"
              onPress={()=> {}}
            >
              <AntDesign name="file1" size={20} color="#B3B3B3" />
              <Text className='text-base text-gray-800 flex-1'>Gerar PDF</Text>
              <AntDesign name="caretright" size={10} color="#49454F" />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity 
              className="flex-row justify-start px-5 py-3 items-center gap-5"
              onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/anamnesisDetails')}
            >
              <Feather name="server" size={20} color="#B3B3B3" />
              <Text className='text-base text-gray-800 flex-1'>Anamnese Oncodermato</Text>
              <AntDesign name="caretright" size={10} color="#49454F" />
            </TouchableOpacity>
          </View>

        </View>

        
        <View className="flex-row justify-between items-center">
          <Text className="text-base mb-4 font-semibold mt-6">Histórico de registros</Text>
        </View>
        
        <View className="flex-1">
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={item => item.toString()}
            renderItem={({item}) => <LesaoRegistroCard activeOpacity={1} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom:50,
              gap: 10
            }}
          />
        </View>

      </View>

      <View className="absolute bottom-0 m-auto w-full justify-center items-center mb-12 z-10">
        <Button title="Fazer novo registro" style={{ width: 194 }} iconLeft icon={(<Feather name="plus" size={14} color="white" />)} onPress={()=> router.push("/(app)/(patient)/register-lesao/oncodermato/step2")} />
      </View>

    </View>
  );
}
