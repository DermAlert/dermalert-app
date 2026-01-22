import HeaderHome from "@/components/HeaderHome";
import { Loading } from "@/components/Loading";
import { usePatientAPI } from "@/hooks/api/usePatientAPI";
import { useLoginId } from "@/hooks/useLoginId";
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import { CaretRightIcon, MapPinIcon, StethoscopeIcon, UsersThreeIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';

export default function Supervisor() {
  const [isLoading, setIsLoading] = useState(false);

  const { loginId } = useLoginId();
  const { patientsCount, loadAllPatients } = usePatientAPI();


  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsLoading(true);
        await loadAllPatients()
        setIsLoading(false);
      })();
    },[])
  )

  useEffect(() => {
    console.log("Login ID:", loginId);
  }, [loginId]);

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }


  return (
    <View className="flex-1 bg-primary-50 p-safe justify-start items-center">


      <HeaderHome />

      <View className="px-5 w-full justify-start flex-row my-6 items-center gap-2">
        <MapPinIcon weight="fill" size={16} color="#7D83A0" />
        <Text allowFontScaling={false} className="text-sm text-neutral-700 font-medium">Unidade Básica de Saúde 1 Asa Sul</Text>
      </View>

      <View className="px-5 w-full justify-start flex-1 gap-4">


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg py-8 px-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(profissional)/profissionais')}
        >
          <View className={`justify-center items-center rounded-lg h-12 w-12 bg-secondary-100`}>
            <StethoscopeIcon size={24} color="#FF765E" />
          </View>
          <View className="flex-1">
          <Text allowFontScaling={false} className="text-base text-neutral-900 font-semibold">Profissionais da Saúde</Text>
          <Text allowFontScaling={false} className="text-sm text-neutral-700">32</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-6 py-8 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/home')}
        >
          <View className={`justify-center items-center rounded-lg h-12 w-12 bg-secondary-100`}>
            <UsersThreeIcon size={24} color="#FF765E" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900 font-semibold">Pacientes</Text>
            <Text allowFontScaling={false} className="text-sm text-neutral-700">{patientsCount}</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>



      </View>


    </View>
  );
}
