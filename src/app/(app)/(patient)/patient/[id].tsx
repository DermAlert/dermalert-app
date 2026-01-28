import Button from '@/components/Button';
import Header from '@/components/Header';
import LesaoCard from '@/components/LesaoCard';
import { CaretRightIcon, ClipboardTextIcon, ListDashesIcon, PlusIcon, ScrollIcon } from 'phosphor-react-native';

import { EmptyPatients } from '@/components/EmptyPatients';
import { Loading } from '@/components/Loading';
import { usePatientAPI } from '@/hooks/api/usePatientAPI';
import { usePatientDataById } from '@/hooks/api/usePatientDataById';
import { usePatientLesion } from '@/hooks/api/usePatientLesion';
import { useLesionId } from '@/hooks/useLesionId';
import { usePatientId } from '@/hooks/usePatientId';
import { formatCPF } from '@/utils/formatCPF';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useCallback, useState } from 'react';
import { BackHandler, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Patient() {
  const [isLoading, setIsLoading] = useState(false);

  const { patientId, updatePatientId, setPatientId } = usePatientId();
  const { updateLesionId } = useLesionId();

  const { patient, loadPatientById } = usePatientAPI();
  const { hasGeneralHealth, checkGeneralHealth, hasTerms, checkTermsById, hasOncodermatoAnamnesis, hasUlceraAnamnesis, checkOncodermatoAnamnesisById, checkUlceraAnamnesisById } = usePatientDataById();
  const { patientLesion: lesion, loadLesionsByPatientId } = usePatientLesion();
  

  const handleBack = () => {
    setPatientId(null)
    router.push("/(app)/home");
  }

  useFocusEffect(
    useCallback(() => {
      if (!patientId) return;
  
      (async () => {
        setIsLoading(true)
        await loadPatientById(patientId);
        await loadLesionsByPatientId(patientId);
        await checkGeneralHealth(patientId);
        await checkOncodermatoAnamnesisById(patientId);
        await checkUlceraAnamnesisById(patientId);
        await checkTermsById(patientId);
        setIsLoading(false)
      })();
  
      updateLesionId(null);
    }, [patientId])
  );

  useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          handleBack()
          return true;
        };
    
        const subscription = BackHandler.addEventListener(
          "hardwareBackPress",
          onBackPress
        );
    
        return () => subscription.remove();
      }, [])
    );



if(isLoading){
  return (
    <View className="flex-1 bg-white p-safe justify-center items-center">
      <Loading />
    </View>
  )
}
  

  return (
    <View className="flex-1 bg-primary-50 p-safe relative">

      {/* <ModalLesaoFiltro modalLesoesVisible={modalLesoesVisible} setModalLesoesVisible={setModalLesoesVisible} /> */}

      <Header icon="back" title="Detalhes do paciente" onPress={handleBack} />

      <View className="flex-1 px-[20px] pt-6">

        <View className="bg-white shadow-sm shadow-neutral-900 rounded-2xl overflow-hidden">
          <View className="border-b border-neutral-300">
            <TouchableOpacity 
              activeOpacity={0.7} 
              className="flex-row justify-start px-4 pb-2 pt-4 items-center gap-5"
              onPress={()=> patient?.user?.id && router.push({ pathname: "/(app)/(patient)/patientDetails/[id]", params: { id: patient.user.id.toString() } })}
            >
              <View className="flex-1">
                <Text className='text-base font-semibold text-neutral-900'>{patient?.user?.name}</Text>
                <Text className='text-sm text-neutral-600 mt-1'>{formatCPF(patient?.user?.cpf || '')}</Text>
              </View>
              <CaretRightIcon size={16} color="#7D83A0" />
            </TouchableOpacity>
          </View>

          {hasGeneralHealth && (
            <View className="border-b border-neutral-300">
              <TouchableOpacity 
                className="flex-row justify-start px-4 py-[10] items-center gap-5"
                onPress={()=> router.push("/(app)/(patient)/GeneralHealth/[id]")}
              >
                <ClipboardTextIcon size={24} color="#6775B4" />
                <Text className='text-base text-neutral-900 flex-1'>Antecedentes clínicos</Text>
                <CaretRightIcon size={16} color="#7D83A0" />
              </TouchableOpacity>
            </View>
          )}

          
          {hasTerms && (
            <View className="border-b border-neutral-300">
              <TouchableOpacity 
                className="flex-row justify-start px-4 py-[10] items-center gap-5"
                onPress={()=> router.push({pathname: "/(app)/(patient)/termoConsentimento/[id]", params: { id: patientId || "" }})}
              >
                <ScrollIcon size={24} color="#6775B4" />
                <Text className='text-base text-neutral-900 flex-1'>Termo de consentimento</Text>
                <CaretRightIcon size={16} color="#7D83A0" />
              </TouchableOpacity>
            </View>
          )}
          

          {hasOncodermatoAnamnesis && (
            <View className="border-b border-neutral-300">
              <TouchableOpacity 
                className="flex-row justify-start px-4 py-[10] items-center gap-5"
                onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/anamnesisDetails')}
              >
                <ListDashesIcon size={24} color="#6775B4" />
                <Text className='text-base text-neutral-900 flex-1'>Anamnese Oncodermato</Text>
                <CaretRightIcon size={16} color="#7D83A0" />
              </TouchableOpacity>
            </View>
          )}

          {hasUlceraAnamnesis && (
            <View>
              <TouchableOpacity 
                className="flex-row justify-start px-4 py-[10] items-center gap-5"
                onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/ulcera/anamnesisDetails')}
              >
                <ListDashesIcon size={24} color="#6775B4" />
                <Text className='text-base text-neutral-900 flex-1'>Anamnese Úlcera Venosa</Text>
                <CaretRightIcon size={16} color="#7D83A0" />
              </TouchableOpacity>
            </View>
          )}

        </View>

        
        <View className="flex-row justify-between items-center">
          <Text className="text-xl mb-4 font-semibold mt-8 text-neutral-900">Lesões registradas</Text>
          {/* <TouchableOpacity 
            className="w-10 h-10 justify-center items-center"
            onPress={() => setModalLesoesVisible(!modalLesoesVisible)}
          >
            <Feather name="filter" size={16} color="#1E1E1E" />
          </TouchableOpacity> */}
        </View>
        
        <View className="flex-1">
          <FlatList
            data={lesion}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <LesaoCard activeOpacity={1} title={item.location} type={item.type} lesionId={item.id} patient={patient} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom:50,
              gap: 10
            }}
            ListEmptyComponent={() => !isLoading && <EmptyPatients title="Nenhuma lesão registrada" description="Não há nenhuma lesão registrada ainda para este paciente. Registre uma nova lesão." />}
          />
          <LinearGradient
            colors={['rgba(255,255,255,0)', '#F5F6FA']}
            className="absolute bottom-0 left-0 right-0 h-[20]"
            pointerEvents="none"
          />
        </View>

      </View>

      <View className="absolute bottom-0 m-auto w-full justify-center items-center mb-12 z-10">
        <Button 
          title="Registrar nova lesão" 
          iconLeft
          icon={(<PlusIcon size={18} color="white" weight="bold" />)} 
          full={false}
          onPress={()=> router.push({pathname: "/(app)/(patient)/register-lesao/select", params: { patientId }})} 
        />
      </View>

    </View>
  );
}
