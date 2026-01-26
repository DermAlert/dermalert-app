import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { useOncodermatoAnamnesisAPI } from "@/hooks/api/oncodermato/useOncodermatoAnamnesisAPI";
import { usePatientId } from "@/hooks/usePatientId";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { CaretRightIcon, ListDashesIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function OncodermatoAnamnesisDetails() {
  const [isLoading, setIsLoading] = useState(true);

  const { patientId } = usePatientId();

  const { phototype, loadPhototype } = useOncodermatoAnamnesisAPI();

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        loadPhototype(patientId);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timeout);

    }, [patientId])
  );

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-primary-50 p-safe justify-start items-center"
    >
      <Header title="Anamnese Oncodermato" icon="back" onPress={() => router.push("/(app)/(patient)/patient/[id]")} />

      <View className="px-5 py-6 w-full justify-start flex-1 gap-[10]">


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg py-6 px-4 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/personalFamilyHistory')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-secondary-100`}>
            <ListDashesIcon size={24} color="#FF765E" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Histórico Familiar e Pessoal de Câncer de Pele</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-4 py-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/phototypeAssessment')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-secondary-100`}>
            <ListDashesIcon size={24} color="#FF765E" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Avaliação de Fototipo</Text>
            <Text allowFontScaling={false} className="text-sm">Fototipo {phototype?.phototype}, Pontuação {phototype?.score}</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-4 py-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/riskProtectiveFactors')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-secondary-100`}>
            <ListDashesIcon size={24} color="#FF765E" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Fatores de Risco e Proteção para Câncer de Pele</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


        <TouchableOpacity 
          activeOpacity={0.7} 
          className="flex-row items-center justify-between rounded-lg px-4 py-6 shadow-sm shadow-neutral-900 bg-white gap-4"
          onPress={()=> router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/cancerResearch')}
        >
          <View className={`justify-center items-center rounded-lg h-10 w-10 bg-secondary-100`}>
            <ListDashesIcon size={24} color="#FF765E" />
          </View>
          <View className="flex-1">
            <Text allowFontScaling={false} className="text-base text-neutral-900">Investigação de Câncer de Pele e Lesões Suspeitas</Text>
          </View>          
          <CaretRightIcon size={18} color="#7D83A0" weight="bold" />
        </TouchableOpacity>


      </View>


    </Animated.View>
  );
}
