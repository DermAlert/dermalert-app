import { useUserAPI } from '@/hooks/api/useUserAPI';
import { useHealthCenterId } from '@/hooks/useHealthCenterId';
import { useLoginId } from '@/hooks/useLoginId';
import { HealthCenterProps } from '@/types/forms';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { CaretDownIcon, MapPinIcon, QuestionIcon, UserCircleIcon } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Loading } from './Loading';
import ModalUnidades from './ModalUnidades';

export default function HeaderHome() {
  
  const [modalUnidadesVisible, setModalUnidadesVisible] = useState(false);
  const [healthCenter, setHealthCenter] = useState<HealthCenterProps | null>(null);
    const [isLoading, setIsLoading] = useState(false);


  const { loginId } = useLoginId();
  const { healthCenterId } = useHealthCenterId();
  const { loadHealthCenterById } = useUserAPI();

  useFocusEffect(
    useCallback(() => {
      console.log('unidade saude:', healthCenterId);
      if (!healthCenterId) return;
  
      (async () => {
        setIsLoading(true)
        const healthCenterData = await loadHealthCenterById(healthCenterId.toString());
        setHealthCenter(healthCenterData);
        setIsLoading(false)
      })();
    }, [healthCenterId])
  );

  if(isLoading){
    return (
        <Loading />
    )
  }


  return (
    <>
      <ModalUnidades modalUnidadesVisible={modalUnidadesVisible} setModalUnidadesVisible={setModalUnidadesVisible} />

      <View className="w-full flex-row justify-between px-4 py-2 items-center">

        <TouchableOpacity onPress={()=> router.push("/(app)/help")} className='h-[40] justify-center items-center'>
          <QuestionIcon size={32} color="#4052A1"/>
        </TouchableOpacity>

        {loginId?.user.permission_roles?.[0] !== "supervisor" && (
          <TouchableOpacity 
          className="flex-row gap-2 items-center justify-between bg-primary-200 px-3 h-[40] rounded-full"
          onPress={() => setModalUnidadesVisible(!modalUnidadesVisible)}
        >
          <MapPinIcon size={20} color="#4052A1" weight='fill'/>
          <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" className="w-[157] text-base text-primary-600 font-medium">{healthCenter?.name || 'Selecione uma unidade'}</Text>
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
