import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import { useLesionType } from "@/hooks/useLesionType";
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

export default function RiskProtectiveFactorsEditStep8() {
    const [isLoading, setIsLoading] = useState(false);
  
  
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();
  const { setLesionType } = useLesionType();

  const { patientId } = usePatientId();

  const handleSendtoServer = async () => {
    console.log(patientId);

    try {
      setIsLoading(true);
      // 1. Atualizar Histórico clinico geral

      const responseResult = await api.get(`/patients/${patientId}/forms/risk-protective-factors/`);

      const dataId = responseResult.data.id;

      if(dataId){

        // 2. Atualiza Avaliação de Fototipo

        console.log("Atualizando riskProtectiveFactorsData com os seguintes dados:");
        // console.log({
          // "sun_exposure_period": riskProtectiveFactorsData.sun_exposure_period,
          // "sun_burn": riskProtectiveFactorsData.sun_burn,
          // "uv_protection": riskProtectiveFactorsData.uv_protection,
          // "hat_use": riskProtectiveFactorsData.hat_use,
          // "artifitial_tan": riskProtectiveFactorsData.artifitial_tan,
          // "checkups_frequency": riskProtectiveFactorsData.checkups_frequency,
          // "cancer_campaigns": riskProtectiveFactorsData.cancer_campaigns
        // });

        const phototypeAssessmentResponse = await api.put(
          `/patients/${patientId}/forms/risk-protective-factors/${dataId}/`,
          {
            "sun_exposure_period": riskProtectiveFactorsData.sun_exposure_period,
            "sun_burn": riskProtectiveFactorsData.sun_burn,
            "uv_protection": riskProtectiveFactorsData.uv_protection,
            "hat_use": riskProtectiveFactorsData.hat_use,
            "artifitial_tan": riskProtectiveFactorsData.artifitial_tan,
            "checkups_frequency": riskProtectiveFactorsData.checkups_frequency,
            "cancer_campaigns": riskProtectiveFactorsData.cancer_campaigns
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("riskProtectiveFactorsData atualizado:", phototypeAssessmentResponse.data);

        setRiskProtectiveFactorsData({});
        setLesionType(null)
       

        router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/riskProtectiveFactors');
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
    setRiskProtectiveFactorsData({});
    setLesionType(null) 
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/phototypeAssessment');  
  }

  useEffect(() => {
    console.log(riskProtectiveFactorsData)
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

      <Header title="Fatores de Risco e Proteção" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={8} totalSteps={8} />

        <TitleText title="Resumo" style={{marginTop: 8}} />

        <View className="gap-8 my-8">

          <SummaryQuestion question="Com que frequência o paciente se expõe ao sol por longos períodos?">
            {
              riskProtectiveFactorsData.sun_exposure_period === 'daily'? 'Diariamente' :
              riskProtectiveFactorsData.sun_exposure_period === 'few_times_per_week'? 'Algumas vezes por semana' :
              riskProtectiveFactorsData.sun_exposure_period === 'occasionally'? 'Ocasionalmente' :
              riskProtectiveFactorsData.sun_exposure_period === 'no_exposure'? 'Não se expõe ao sol' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Quantas vezes ao longo da vida o paciente já teve queimaduras solares graves?">
            {
              riskProtectiveFactorsData.sun_burn === 'once_twice'? '1-2 vezes' :
              riskProtectiveFactorsData.sun_burn === 'three_to_five'? '3-5 vezes' :
              riskProtectiveFactorsData.sun_burn === 'more_than_five'? 'Mais de 5 vezes' :
              riskProtectiveFactorsData.sun_burn === 'never'? 'Nunca teve' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente usa protetor solar regularmente? Se sim, qual FPS?">
            {
              riskProtectiveFactorsData.uv_protection === 'none'? 'Não usa' :
              riskProtectiveFactorsData.uv_protection === 'spf_15'? 'FPS 15' :
              riskProtectiveFactorsData.uv_protection === 'spf_30'? 'FPS 30' :
              riskProtectiveFactorsData.uv_protection === 'spf_50'? 'FPS 50' :
              riskProtectiveFactorsData.uv_protection === 'spf_70'? 'FPS 70' :
              riskProtectiveFactorsData.uv_protection === 'spf_100_plus'? 'FPS 100 ou mais' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente usa chapéus ou roupas de proteção ao se expor ao sol?">
            {
              riskProtectiveFactorsData.hat_use === true ? 'Sim' :
              riskProtectiveFactorsData.hat_use === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já utilizou serviços de bronzeamento artificial?">
            {
              riskProtectiveFactorsData.artifitial_tan === true ? 'Sim' :
              riskProtectiveFactorsData.artifitial_tan === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Com que frequencia o paciente visita o dermatologista para check-ups?">
            {
              riskProtectiveFactorsData.checkups_frequency === 'annually'? 'Anualmente' :
              riskProtectiveFactorsData.checkups_frequency === 'every_six_months'? 'A cada 6 meses' :
              riskProtectiveFactorsData.checkups_frequency === 'not_regularly'? 'Não visita regularmente' :
              riskProtectiveFactorsData.checkups_frequency === 'other'? 'Outro' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já participou de campanhas de prevenção contra o câncer de pele?">
            {
              riskProtectiveFactorsData.cancer_campaigns === true ? 'Sim' :
              riskProtectiveFactorsData.cancer_campaigns === false ? 'Não' :
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
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/edit/step7')} 
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
