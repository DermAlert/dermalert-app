import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraUlcerInfoForm } from "@/hooks/Ulcera/useUlceraUlcerInfoForm";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import axios from "axios";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraUlcerInfoEditStep4() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { ulceraUlcerInfoData, setUlceraUlcerInfoData } = useUlceraUlcerInfoForm();

  const { patientId } = usePatientId();

  const handleSendtoServer = async () => {
    console.log(patientId);

    try {
      setIsLoading(true);
      // 1. Atualizar Info ulcera

      const responseResult = await api.get(`/patients/${patientId}/forms/current-ulcer-info/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraUlcerInfoData com os seguintes dados:");
        // console.log({
          // "how_long": ulceraUlcerInfoData.how_long,
          // "treated_elsewhere": ulceraUlcerInfoData.treated_elsewhere,
          // "used_antibiotics": ulceraUlcerInfoData.used_antibiotics,
        // });

        const ulceraUlcerInfoResponse = await api.put(
          `/patients/${patientId}/forms/current-ulcer-info/${dataId}/`,
          {
            "how_long": ulceraUlcerInfoData.how_long,
            "treated_elsewhere": ulceraUlcerInfoData.treated_elsewhere,
            "used_antibiotics": ulceraUlcerInfoData.used_antibiotics,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraUlcerInfoData atualizado com sucesso:", ulceraUlcerInfoResponse.data);

        setUlceraUlcerInfoData({});

        router.push('/(app)/(patient)/lesao/anamnesis/ulcera/ulcerInfo');
      }
      

      

      //setIsLoading(false);
     

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
  }


  const handleCancel = () => {
    setUlceraUlcerInfoData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/ulcerInfo');
  }

  useEffect(() => {
    console.log(ulceraUlcerInfoData)
  }, []);

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

      <Header title="Informações sobre a úlcera atual" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={4} totalSteps={4} />

        <TitleText title="Resumo" style={{marginTop: 8}} />

        <View className="gap-8 my-8">

          <SummaryQuestion question="Há quanto tempo o paciente está com a ferida?">
            {
              ulceraUlcerInfoData.how_long === 'lt_1_month'? 'Menos de 1 mês' :
              ulceraUlcerInfoData.how_long === '1_3_months'? '1 a 3 meses' :
              ulceraUlcerInfoData.how_long === '3_6_months'? '3 a 6 meses' :
              ulceraUlcerInfoData.how_long === 'gt_6_months'? 'Mais de 6 meses' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já tratou essa ferida antes em outro lugar?">
            {
              ulceraUlcerInfoData.treated_elsewhere === 'HOSPITAL'? 'Sim, em hospital' :
              ulceraUlcerInfoData.treated_elsewhere === 'UBS'? 'Sim, na UBS' :
              ulceraUlcerInfoData.treated_elsewhere === 'OTHER'? 'Sim, em outro local' :
              ulceraUlcerInfoData.treated_elsewhere === 'NONE'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente possui diagnóstico de hipertensão arterial?">
            {
              ulceraUlcerInfoData.used_antibiotics === 'YES'? 'Sim' :
              ulceraUlcerInfoData.used_antibiotics === 'NO'? 'Não' :
              ulceraUlcerInfoData.used_antibiotics === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>
        </View>

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step3')} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Salvar" 
          onPress={handleSendtoServer}
          style={{ flexGrow: 1, width: '47%' }}
        />
      </View>
    </Animated.View>
  );
}
