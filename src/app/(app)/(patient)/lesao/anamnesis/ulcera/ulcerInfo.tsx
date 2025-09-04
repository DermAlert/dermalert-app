import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraUlcerInfoProps } from "@/types/forms";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlcerInfoDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [ulcerInfo, setUlcerInfo] = useState<UlceraUlcerInfoProps>();

  const { patientId } = usePatientId();

  async function loadUlcerInfo() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/patients/${patientId}/forms/current-ulcer-info/`);

      setUlcerInfo(data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    } 
  }


  useEffect(() => {

    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadUlcerInfo();
    }, 300); 
  
    return () => {
      clearTimeout(timeout);
      setIsLoading(false);
    }

    
  }, []);


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
              ulcerInfo?.treated_elsewhere === 'NONE'? 'não' :
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

        <Button title="Editar" secondary style={{ marginTop: 24, alignSelf: "flex-start"}} full={false} iconLeft icon={<PencilSimpleLineIcon size={24} color="#4052A1" />} />

      </ScrollView>
    </Animated.View>
  );
}
