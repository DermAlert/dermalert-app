import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraAnamnesisAPI } from "@/hooks/api/ulcera/useUlceraAnamnesisAPI";
import { usePatientId } from "@/hooks/usePatientId";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlcerInfoDetails() {
  const [isLoading, setIsLoading] = useState(true);

  const { patientId } = usePatientId();
  const { ulcerInfo, loadUlcerInfo } = useUlceraAnamnesisAPI();

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        loadUlcerInfo(patientId);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timeout);

    }, [patientId])
  );


  const handleCancel = () => {
    router.push("/(app)/(patient)/lesao/anamnesis/ulcera/anamnesisDetails");
  }


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
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Informações sobre a úlcera atual" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

        <TitleText title="Resumo" />

        <View className="gap-8 mt-8">
          <SummaryQuestion question="Há quanto tempo o paciente está com a ferida?">
            {
              ulcerInfo?.how_long === 'lt_1_month'? 'Menos de 1 mês' :
              ulcerInfo?.how_long === '1_3_months'? '1 a 3 meses' :
              ulcerInfo?.how_long === '3_6_months'? '3 a 6 meses' :
              ulcerInfo?.how_long === 'gt_6_months'? 'Mais de 6 meses' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já tratou essa ferida antes em outro lugar?">
            {
              ulcerInfo?.treated_elsewhere === 'HOSPITAL'? 'Sim, em hospital' :
              ulcerInfo?.treated_elsewhere === 'UBS'? 'Sim, na UBS' :
              ulcerInfo?.treated_elsewhere === 'OTHER'? 'Sim, em outro local' :
              ulcerInfo?.treated_elsewhere === 'NONE'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente possui diagnóstico de hipertensão arterial?">
            {
              ulcerInfo?.used_antibiotics === 'YES'? 'Sim' :
              ulcerInfo?.used_antibiotics === 'NO'? 'Não' :
              ulcerInfo?.used_antibiotics === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

        </View>

        <Button 
          title="Editar" 
          secondary 
          style={{ marginTop: 24, alignSelf: "flex-start"}} 
          full={false} iconLeft 
          icon={<PencilSimpleLineIcon size={24} color="#4052A1" />} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step1')}
        />
      </ScrollView>
    </Animated.View>
  );
}
