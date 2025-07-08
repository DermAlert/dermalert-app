import Header from '@/components/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from 'react-native';

export default function PatientDetails() {

  return (
    <View className="flex-1 bg-white p-safe relative">

      <Header icon="back" title="Dados pessoais do paciente" onPress={()=> router.push("/(app)/(patient)/patient/[id]")} />

      <View className="flex-1 mt-6">
        <Text className="text-base mb-4 font-semibold px-4">Dados pessoais</Text>

        <View className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
          <FontAwesome5 name="user" size={15} color="#49454F" />
          <View>
            <Text className='text-xs text-gray-800'>Nome completo</Text>
            <Text className='text-base text-gray-800'>Gustavo Andrade de Souza</Text>
          </View>
        </View>
        
        <View className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
          <Feather name="list" size={15} color="#49454F" />
          <View>
            <Text className='text-xs text-gray-800'>CPF</Text>
            <Text className='text-base text-gray-800'>123.456.789-12</Text>
          </View>
        </View>
        
        <View className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
          <Ionicons name="accessibility" size={15} color="#49454F" />
          <View>
            <Text className='text-xs text-gray-800'>Gênero que se identifica</Text>
            <Text className='text-base text-gray-800'>Masculino</Text>
          </View>
        </View>
        
        <View className="border-b border-gray-400 flex-row justify-start px-5 py-3 items-center gap-5">
          <AntDesign name="idcard" size={15} color="#49454F" />
          <View>
            <Text className='text-xs text-gray-800'>Número do Cartão SUS</Text>
            <Text className='text-base text-gray-800'>700 9674 9916 0003</Text>
          </View>
        </View>

        <View className="border-b border-gray-400 flex-row justify-between px-5 py-3 items-center gap-5">
          <Fontisto name="email" size={15} color="#49454F" />
          <View className='flex-1'>
            <Text className='text-xs text-gray-800'>E-mail</Text>
            <Text className='text-base text-gray-800'>E-mail para retorno</Text>
          </View>
          <TouchableOpacity onPress={()=> router.push("/(app)/(patient)/patientDetails/patient-edit-email")}>
            <Octicons name="pencil" size={18} color="#49454F" />
          </TouchableOpacity>
        </View>

        <View className="border-b border-gray-400 flex-row justify-between px-5 py-3 items-center gap-5">
          <Feather name="phone" size={15} color="#49454F" />
          <View className='flex-1'>
            <Text className='text-xs text-gray-800'>Telefone de contato</Text>
            <Text className='text-base text-gray-800'>(61) 91234-5678</Text>
          </View>
          <TouchableOpacity onPress={()=> router.push("/(app)/(patient)/patientDetails/patient-edit-phone")}>
            <Octicons name="pencil" size={18} color="#49454F" />
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}
