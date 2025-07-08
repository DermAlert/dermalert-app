import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ModalUnidades from './ModalUnidades';

export default function HeaderHome() {
  
  const [modalUnidadesVisible, setModalUnidadesVisible] = useState(false);


  return (
    <>
      <ModalUnidades modalUnidadesVisible={modalUnidadesVisible} setModalUnidadesVisible={setModalUnidadesVisible} />

      <View className="w-full flex-row justify-between px-6 items-center h-[56] border-b border-gray-400 border-solid">

        <TouchableOpacity onPress={()=> router.push("/(app)/help")}>
          <Feather name="help-circle" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row gap-2 items-center bg-gray-200 p-2 rounded-md"
          onPress={() => setModalUnidadesVisible(!modalUnidadesVisible)}
        >
          <Entypo name="location-pin" size={20} color="black" />
          <Text numberOfLines={1} ellipsizeMode="tail" className="w-[160]">Unidade Básica de Saúde 1 Asa Sul</Text>
          <AntDesign name="caretdown" size={10} color="black" className="w-[22] text-center" />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> router.push("/(app)/meus-dados")}>
          <FontAwesome name="user-circle-o" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </>
    
  );
}
