import { useLoginId } from '@/hooks/useLoginId';
import { router } from 'expo-router';
import { CaretDownIcon, MapPinIcon, QuestionIcon, UserCircleIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ModalUnidades from './ModalUnidades';

export default function HeaderHome() {
  
  const [modalUnidadesVisible, setModalUnidadesVisible] = useState(false);

  const { loginId } = useLoginId();


  return (
    <>
      <ModalUnidades modalUnidadesVisible={modalUnidadesVisible} setModalUnidadesVisible={setModalUnidadesVisible} />

      <View className="w-full flex-row justify-between px-4 py-2 items-center">

        <TouchableOpacity onPress={()=> router.push("/(app)/help")} className='h-[40] justify-center items-center'>
          <QuestionIcon size={32} color="#4052A1"/>
        </TouchableOpacity>

        {loginId !== "supervisor" && (
          <TouchableOpacity 
          className="flex-row gap-2 items-center justify-between bg-primary-200 px-3 h-[40] rounded-full"
          onPress={() => setModalUnidadesVisible(!modalUnidadesVisible)}
        >
          <MapPinIcon size={20} color="#4052A1" weight='fill'/>
          <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" className="w-[157] text-base text-primary-600 font-medium">Unidade Básica de Saúde 1 Asa Sul</Text>
          <CaretDownIcon size={16} color="#7D83A0" weight="bold" />
        </TouchableOpacity>
        )
        }

        <TouchableOpacity onPress={()=> router.push("/(app)/meus-dados")} className='h-[40] justify-center items-center'>
          <UserCircleIcon size={32} color="#4052A1"/>
        </TouchableOpacity>
      </View>
    </>
    
  );
}
