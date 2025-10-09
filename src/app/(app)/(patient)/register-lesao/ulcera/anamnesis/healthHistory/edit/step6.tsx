import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraHealthHistoryForm } from "@/hooks/Ulcera/useUlceraHealthHistoryForm";
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

export default function UlceraHealthHistoryEditStep6() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { ulceraHealthHistoryData, setUlceraHealthHistoryData } = useUlceraHealthHistoryForm();

  const { patientId } = usePatientId();

  const handleSendtoServer = async () => {
    console.log(patientId);

    try {
      setIsLoading(true);
      // 1. Atualizar Histórico clinico geral

      const responseResult = await api.get(`/patients/${patientId}/forms/clinical-history/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraHealthHistoryData com os seguintes dados:");
        // console.log({
        //   "hypertension": ulceraHealthHistoryData.hypertension,
        //   "diabetes": ulceraHealthHistoryData.diabetes,
        //   "deep_vein_thrombosis": ulceraHealthHistoryData.deep_vein_thrombosis,
        //   "chronic_venous_insufficiency": ulceraHealthHistoryData.chronic_venous_insufficiency,
        //   "compression_stockings_use": ulceraHealthHistoryData.compression_stockings_use,
        // });

        const ulceraHealthHistoryResponse = await api.put(
          `/patients/${patientId}/forms/clinical-history/${dataId}/`,
          {
            "hypertension": ulceraHealthHistoryData.hypertension,
            "diabetes": ulceraHealthHistoryData.diabetes,
            "deep_vein_thrombosis": ulceraHealthHistoryData.deep_vein_thrombosis,
            "chronic_venous_insufficiency": ulceraHealthHistoryData.chronic_venous_insufficiency,
            "compression_stockings_use": ulceraHealthHistoryData.compression_stockings_use,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraHealthHistoryData atualizado com sucesso:", ulceraHealthHistoryResponse.data);

        setUlceraHealthHistoryData({});

        router.push('/(app)/(patient)/lesao/anamnesis/ulcera/healthHistory');
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
    setUlceraHealthHistoryData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/healthHistory');
  }

  useEffect(() => {
    console.log(ulceraHealthHistoryData)
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

      <Header title="Histórico clínico geral" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={6} totalSteps={6} />

        <TitleText title="Resumo" style={{marginTop: 8}} />

        <View className="gap-8 my-8">

          <SummaryQuestion question="O paciente possui diagnóstico de hipertensão arterial?">
            {
              ulceraHealthHistoryData.hypertension === 'YES'? 'Sim' :
              ulceraHealthHistoryData.hypertension === 'NO'? 'Não' :
              ulceraHealthHistoryData.hypertension === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente possui diagnóstico de diabetes mellitus?">
            {
              ulceraHealthHistoryData.diabetes === 'YES'? 'Sim' :
              ulceraHealthHistoryData.diabetes === 'NO'? 'Não' :
              ulceraHealthHistoryData.diabetes === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já teve trombose venosa profunda?">
            {
              ulceraHealthHistoryData.deep_vein_thrombosis === 'YES'? 'Sim' :
              ulceraHealthHistoryData.deep_vein_thrombosis === 'NO'? 'Não' :
              ulceraHealthHistoryData.deep_vein_thrombosis === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já foi diagnosticado(a) com insuficiência venosa crônica?">
            {
              ulceraHealthHistoryData.chronic_venous_insufficiency === 'YES'? 'Sim' :
              ulceraHealthHistoryData.chronic_venous_insufficiency === 'NO'? 'Não' :
              ulceraHealthHistoryData.chronic_venous_insufficiency === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente usa ou já usou meias de compressão?">
            {
              ulceraHealthHistoryData.compression_stockings_use === 'CURRENTLY'? 'Sim, atualmente' :
              ulceraHealthHistoryData.compression_stockings_use === 'USED_BUT_NOT_ANYMORE'? 'Sim, mas não usa mais' :
              ulceraHealthHistoryData.compression_stockings_use === 'NEVER_USED'? 'Não Nunca usou' :
              ulceraHealthHistoryData.compression_stockings_use === 'DONT_KNOW_WHAT_IT_IS'? 'Não sabe o que é' :
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
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/edit/step5')} 
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
