import Header from '@/components/Header';
import { Loading } from '@/components/Loading';
import ModalAlert from '@/components/ModalAlert';
import { usePatientAPI } from '@/hooks/api/usePatientAPI';
import { useLoginId } from '@/hooks/useLoginId';
import { formatCNS } from '@/utils/CNS';
import { formatCPF } from '@/utils/formatCPF';
import { formatPhone } from '@/utils/formatPhone';
import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from "expo-router";
import { EnvelopeSimpleIcon, GenderMaleIcon, IdentificationBadgeIcon, IdentificationCardIcon, PencilSimpleLineIcon, PhoneIcon, TrashIcon, UserIcon } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function PatientDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalAlert, setModalAlert] = useState(false);

  const { id } = useLocalSearchParams();

  const { loginId } = useLoginId();

  const { patient, loadPatientById } = usePatientAPI();
  

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsLoading(true)
        await loadPatientById(id as string);
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

      {loginId === "supervisor" && (
        <ModalAlert 
          modalAlert={modalAlert} 
          setModalAlert={setModalAlert} 
          description="Ao remover este paciente, os dados dele serão excluídos e não estarão mais na plataforma. Essa ação não pode ser desfeita."
          title="Deseja remover o paciente?"
          handleCancel={()=> {
            setModalAlert(!modalAlert);
            router.push('/(app)/home');
          }}
          btnNoText="Cancelar"
          btnYesText="Sim, remover"
          warning={true}
        />
      )}

      

      <Header icon="back" title="Dados pessoais do paciente" onPress={()=> router.push({pathname: "/(app)/(patient)/patient/[id]", params: {id: id.toString()}})} />

      <View className="flex-1 mt-6">
      <Text allowFontScaling={false} className="text-lg mb-4 font-medium px-4 text-neutral-900">Dados pessoais</Text>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <UserIcon size={24} color="#6775B4" />
          <View className="flex-1">
            <Text allowFontScaling={false} className='text-xs font-semibold text-neutral-600'>Nome completo</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{patient?.user?.name}</Text>
          </View>
          {loginId === "supervisor" && (
            <TouchableOpacity 
              onPress={()=> router.push({pathname: "/(app)/(patient)/patientDetails/patient-edit-nome", params: { id }})}
              className="h-10 w-10 justify-center items-center"
            >
              <PencilSimpleLineIcon size={24} color="#4052A1" />
            </TouchableOpacity>
          )}
        </View>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <IdentificationCardIcon size={24} color="#6775B4" />
          <View className="flex-1">
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>CPF</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{formatCPF(patient?.user?.cpf || '')}</Text>
          </View>
          {loginId === "supervisor" && (
            <TouchableOpacity 
              onPress={()=> router.push({pathname: "/(app)/(patient)/patientDetails/patient-edit-cpf", params: { id }})}
              className="h-10 w-10 justify-center items-center"
            >
              <PencilSimpleLineIcon size={24} color="#4052A1" />
            </TouchableOpacity>
          )}
        </View>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <GenderMaleIcon size={24} color="#6775B4" />
          <View className="flex-1">
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>Gênero que se identifica</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>
            {
                patient?.gender === 'M' ? 'Masculino' :
                patient?.gender === 'F' ? 'Feminino' :
                patient?.gender === 'N' ? 'Não binário' :
                patient?.gender === 'O' ? patient?.other_gender || 'Outro' :
                'Não informado'
              }
            </Text>
          </View>
          {loginId === "supervisor" && (
            <TouchableOpacity 
              onPress={()=> router.push({pathname: "/(app)/(patient)/patientDetails/patient-edit-genre", params: { id }})}
              className="h-10 w-10 justify-center items-center"
            >
              <PencilSimpleLineIcon size={24} color="#4052A1" />
            </TouchableOpacity>
          )}
        </View>

        <View className="border-b border-neutral-300 flex-row justify-start px-4 py-3 items-center gap-4">
          <IdentificationBadgeIcon size={24} color="#6775B4" />
          <View className="flex-1">
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>Número do Cartão SUS</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{formatCNS(patient?.sus_number || '')}</Text>
          </View>
          {loginId === "supervisor" && (
            <TouchableOpacity 
              onPress={()=> router.push({pathname: "/(app)/(patient)/patientDetails/patient-edit-sus", params: { id }})}
              className="h-10 w-10 justify-center items-center"
            >
              <PencilSimpleLineIcon size={24} color="#4052A1" />
            </TouchableOpacity>
          )}
        </View>

        <View className="border-b border-neutral-300 flex-row justify-between px-4 py-3 items-center gap-4">
          <EnvelopeSimpleIcon size={24} color="#6775B4" />
          <View className='flex-1'>
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>E-mail para retorno</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{patient?.user?.email}</Text>
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
            <Text allowFontScaling={false} className='text-xs text-neutral-600 font-semibold'>Telefone de contato</Text>
            <Text allowFontScaling={false} className='text-base text-neutral-900'>{formatPhone(patient?.phone_number || '')}</Text>
          </View>
          <TouchableOpacity 
            onPress={()=> router.push({pathname: "/(app)/(patient)/patientDetails/patient-edit-phone", params: { id }})}
            className="h-10 w-10 justify-center items-center"
          >
            <PencilSimpleLineIcon size={24} color="#4052A1" />
          </TouchableOpacity>
        </View>

        {loginId === "supervisor" && (
          <TouchableOpacity 
            className="px-5 w-full justify-start flex-row my-7 items-center gap-2"
            onPress={() => setModalAlert(!modalAlert)}
          >
            <TrashIcon size={24} color="#C10007" />
            <Text allowFontScaling={false} className="text-base font-semibold text-danger-700">Remover paciente</Text>
          </TouchableOpacity>
        )}

        
        

      </View>


    </View>
  );
}
