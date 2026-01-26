import Header from '@/components/Header';
import { Loading } from '@/components/Loading';
import ModalAlert from '@/components/ModalAlert';
import { usePatientAPI } from '@/hooks/api/usePatientAPI';
import { usePatientId } from '@/hooks/usePatientId';
import { formatCPF } from '@/utils/formatCPF';
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import { EnvelopeSimpleIcon, IdentificationCardIcon, MinusCircleIcon, PencilSimpleLineIcon, UserCheckIcon, UserIcon } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ProfissionalDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalAlert, setModalAlert] = useState(false);
  // const [patient, setPatient] = useState<PatientProps>();

  const { patientId } = usePatientId();
  const { patient, loadPatientById } = usePatientAPI();
    
  
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await loadPatientById(patientId as string);
        setIsLoading(false)
      })();
    },[])
  )

if(isLoading){
  return (
    <View className="flex-1 bg-white p-safe justify-center items-center">
      <Loading />
    </View>
  )
}

  return (
    <View className="flex-1 bg-white p-safe relative">

      <ModalAlert 
        modalAlert={modalAlert} 
        setModalAlert={setModalAlert} 
        description="Ao desvincular este profissional, ele não terá mais acesso à atendimento nesta unidade."
        title="Deseja desvincular o profissional desta unidade?"
        handleCancel={()=> {
          setModalAlert(!modalAlert);
          router.push("/(app)/(profissional)/profissionais");
        }}
        btnNoText="Cancelar"
        btnYesText="Sim, desvincular"
      />

      <Header icon="back" title="Dados do profissional" onPress={()=> router.push("/(app)/(profissional)/profissionais")} />

      <View className="flex-1 mt-6">
      <Text allowFontScaling={false} className="text-lg mb-4 font-medium px-4 text-neutral-900">Dados pessoais</Text>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <UserCheckIcon size={24} color="#6775B4" />
          <View className="flex-1">
            <Text allowFontScaling={false} className='text-xs font-semibold text-neutral-600'>Status</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>Ativo</Text>
          </View>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <UserIcon size={24} color="#6775B4" />
          <View className="flex-1">
            <Text allowFontScaling={false} className='text-xs font-semibold text-neutral-600'>Nome completo</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{patient?.user?.name}</Text>
          </View>
          <TouchableOpacity 
              onPress={()=> router.push({pathname: "/(app)/(profissional)/profissionalDetails/profissional-edit-nome", params: { patientId }})}
              className="h-10 w-10 justify-center items-center"
            >
              <PencilSimpleLineIcon size={24} color="#4052A1" />
            </TouchableOpacity>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <IdentificationCardIcon size={24} color="#6775B4" />
          <View className="flex-1">
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>CPF</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{formatCPF(patient?.user?.cpf || '')}</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push({pathname: "/(app)/(profissional)/profissionalDetails/profissional-edit-cpf", params: { patientId }})}
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-between px-4 py-3 items-center gap-4">
          <EnvelopeSimpleIcon size={24} color="#6775B4" />
          <View className='flex-1'>
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>E-mail para retorno</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{patient?.user?.email}</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push({ pathname: "/(app)/(profissional)/profissionalDetails/profissional-edit-email", params: { patientId }})}
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className="px-5 w-full justify-start flex-row my-7 items-center gap-2"
          onPress={() => setModalAlert(!modalAlert)}
        >
          <MinusCircleIcon size={24} color="#4052A1" />
          <Text allowFontScaling={false} className="text-base font-semibold text-primary-600">Desvincular profissional da unidade</Text>
        </TouchableOpacity>

        
        

      </View>


    </View>
  );
}
