import Header from '@/components/Header';
import { Loading } from '@/components/Loading';
import { api } from '@/services/api';
import { PatientProps } from '@/types/forms';
import { formatCNS } from '@/utils/CNS';
import { formatCPF } from '@/utils/formatCPF';
import { formatPhone } from '@/utils/formatPhone';
import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from "expo-router";
import { EnvelopeSimpleIcon, GenderMaleIcon, IdentificationBadgeIcon, IdentificationCardIcon, PencilSimpleLineIcon, PhoneIcon, UserIcon } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function PatientDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState<PatientProps>();

  const { id } = useLocalSearchParams();

  async function loadPatientById() {
    try {
      setIsLoading(true)
      const response = await api.get(`/patients/${id}`);

      setPatient(response.data);
      //console.log(response.data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    } 
  }

  useFocusEffect(
    useCallback(() => {
      loadPatientById()
    },[])
  )

  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header icon="back" title="Dados pessoais do paciente" onPress={()=> router.push({pathname: "/(app)/(patient)/patient/[id]", params: {id: id.toString()}})} />

      <View className="flex-1 mt-6">
      <Text className="text-lg mb-4 font-medium px-4 text-neutral-900">Dados pessoais</Text>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <UserIcon size={24} color="#6775B4" />
          <View>
            <Text className='text-xs font-semibold text-neutral-600'>Nome completo</Text>
            <Text className='text-base text-neutral-900'>{patient?.user?.name}</Text>
          </View>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <IdentificationCardIcon size={24} color="#6775B4" />
          <View>
            <Text className='text-xs text-neutral-600 font-semibold'>CPF</Text>
            <Text className='text-base text-neutral-900'>{formatCPF(patient?.user?.cpf || '')}</Text>
          </View>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <GenderMaleIcon size={24} color="#6775B4" />
          <View>
            <Text className='text-xs text-neutral-600 font-semibold'>Gênero que se identifica</Text>
            <Text className='text-base text-neutral-900'>
            {
                patient?.gender === 'M' ? 'Masculino' :
                patient?.gender === 'F' ? 'Feminino' :
                patient?.gender === 'N' ? 'Não binário' :
                patient?.gender === 'O' ? patient?.other_gender || 'Outro' :
                'Não informado'
              }
            </Text>
          </View>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <IdentificationBadgeIcon size={24} color="#6775B4" />
          <View>
            <Text className='text-xs text-neutral-600 font-semibold'>Número do Cartão SUS</Text>
            <Text className='text-base text-neutral-900'>{formatCNS(patient?.sus_number || '')}</Text>
          </View>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-between px-4 py-3 items-center gap-4">
          <EnvelopeSimpleIcon size={24} color="#6775B4" />
          <View className='flex-1'>
            <Text className='text-xs text-neutral-600 font-semibold'>E-mail para retorno</Text>
            <Text className='text-base text-neutral-900'>{patient?.user?.email}</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push({ pathname: "/(app)/(patient)/patientDetails/patient-edit-email", params: { id }})}
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>

        <View className="border-b border-neutral-300 flex-row justify-between px-4 py-3 items-center gap-5">
          <PhoneIcon size={24} color="#6775B4" />
          <View className='flex-1'>
            <Text className='text-xs text-neutral-600 font-semibold'>Telefone de contato</Text>
            <Text className='text-base text-neutral-900'>{formatPhone(patient?.phone_number || '')}</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push({pathname: "/(app)/(patient)/patientDetails/patient-edit-phone", params: { id }})}
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>
        

      </View>


    </View>
  );
}
