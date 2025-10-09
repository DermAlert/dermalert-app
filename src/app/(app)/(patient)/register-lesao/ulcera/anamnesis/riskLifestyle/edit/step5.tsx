import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraRiskLifestyleForm } from "@/hooks/Ulcera/useUlceraRiskLifestyleForm";
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

export default function UlceraRiskLifestyleEditStep5() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { ulceraRiskLifestyleData, setUlceraRiskLifestyleData } = useUlceraRiskLifestyleForm();

  const { patientId } = usePatientId();


  const handleSendtoServer = async () => {
    console.log(patientId);

    try {
      setIsLoading(true);
      // 1. Atualizar Fatores de risco e estilo de vida

      const responseResult = await api.get(`/patients/${patientId}/forms/lifestyle-risk/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraRiskLifestyleData com os seguintes dados:");
        // console.log({
            // "long_periods_posture": ulceraRiskLifestyleData.long_periods_posture,
            // "leg_foot_trauma": ulceraRiskLifestyleData.leg_foot_trauma,
            // "smoking": ulceraRiskLifestyleData.smoking,
            // "physical_activity": ulceraRiskLifestyleData.physical_activity,
        // });

        const ulceraHealthHistoryResponse = await api.put(
          `/patients/${patientId}/forms/lifestyle-risk/${dataId}/`,
          {
            "long_periods_posture": ulceraRiskLifestyleData.long_periods_posture,
            "leg_foot_trauma": ulceraRiskLifestyleData.leg_foot_trauma,
            "smoking": ulceraRiskLifestyleData.smoking,
            "physical_activity": ulceraRiskLifestyleData.physical_activity,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraRiskLifestyleData atualizado com sucesso:", ulceraHealthHistoryResponse.data);

        setUlceraRiskLifestyleData({});

        router.push('/(app)/(patient)/lesao/anamnesis/ulcera/riskLifestyle');
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
    setUlceraRiskLifestyleData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/healthHistory');
  }

  useEffect(() => {
    console.log(ulceraRiskLifestyleData)
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

      <Header title="Fatores de risco e estilo de vida" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={5} totalSteps={5} />

        <TitleText title="Resumo" style={{marginTop: 8}} />

        <View className="gap-8 my-8">

          <SummaryQuestion question="O paciente permanece sentado(a) ou em pé por longos períodos durante o dia?">
            {
              ulceraRiskLifestyleData.long_periods_posture === 'STANDING_LONG_HOURS'? 'Sim, em pé por muitas horas' :
              ulceraRiskLifestyleData.long_periods_posture === 'SITTING_LONG_HOURS'? 'Sim, sentado(a) por muitas horas' :
              ulceraRiskLifestyleData.long_periods_posture === 'NO'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já teve algum trauma na perna ou pé?">
            {
              ulceraRiskLifestyleData.leg_foot_trauma === 'YES'? 'Sim' :
              ulceraRiskLifestyleData.leg_foot_trauma === 'NO'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente fuma ou já fumou?">
            {
              ulceraRiskLifestyleData.smoking === 'CURRENT_SMOKER'? 'Sim, atualmente' :
              ulceraRiskLifestyleData.smoking === 'FORMER_SMOKER'? 'Já fumou, mas parou' :
              ulceraRiskLifestyleData.smoking === 'NEVER_SMOKED'? 'Nunca fumou' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente pratica alguma atividade física regularmente?">
            {
              ulceraRiskLifestyleData.physical_activity === 'YES'? 'Sim' :
              ulceraRiskLifestyleData.physical_activity === 'NO'? 'Não' :
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
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step4')} 
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
