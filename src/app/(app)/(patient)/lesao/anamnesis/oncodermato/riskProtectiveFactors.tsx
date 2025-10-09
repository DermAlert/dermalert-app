import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { RiskProtectiveFactorsProps } from "@/types/forms";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RiskProtectiveFactorsDetails() {

  const [isLoading, setIsLoading] = useState(false);
  const [riskProtectiveFactors, setRiskProtectiveFactors] = useState<RiskProtectiveFactorsProps>();

  const { patientId } = usePatientId();

  async function loadRiskProtectiveFactors() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/patients/${patientId}/forms/risk-protective-factors/`);

      setRiskProtectiveFactors(data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    } 
  }


  useEffect(() => {

    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadRiskProtectiveFactors();
    }, 300); 
  
    return () => {
      clearTimeout(timeout);
      setIsLoading(false);
    }

    
  }, []);


  const handleCancel = () => {
    router.push("/(app)/(patient)/lesao/anamnesis/oncodermato/anamnesisDetails");
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

      <Header title="Fatores de Risco e Proteção" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

        <TitleText title="Resumo" />

        <View className="gap-8 mt-8">
          <SummaryQuestion question="Com que frequência o paciente se expõe ao sol por longos períodos?">
            {
              riskProtectiveFactors?.sun_exposure_period === 'daily'? 'Diariamente' :
              riskProtectiveFactors?.sun_exposure_period === 'few_times_per_week'? 'Algumas vezes por semana' :
              riskProtectiveFactors?.sun_exposure_period === 'occasionally'? 'Ocasionalmente' :
              riskProtectiveFactors?.sun_exposure_period === 'no_exposure'? 'Não se expõe ao sol' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Quantas vezes ao longo da vida o paciente já teve queimaduras solares graves?">
            {
              riskProtectiveFactors?.sun_burn === 'once_twice'? '1-2 vezes' :
              riskProtectiveFactors?.sun_burn === 'three_to_five'? '3-5 vezes' :
              riskProtectiveFactors?.sun_burn === 'more_than_five'? 'Mais de 5 vezes' :
              riskProtectiveFactors?.sun_burn === 'never'? 'Nunca teve' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente usa protetor solar regularmente? Se sim, qual FPS?">
            {
              riskProtectiveFactors?.uv_protection === 'none'? 'Não usa' :
              riskProtectiveFactors?.uv_protection === 'spf_15'? 'FPS 15' :
              riskProtectiveFactors?.uv_protection === 'spf_30'? 'FPS 30' :
              riskProtectiveFactors?.uv_protection === 'spf_50'? 'FPS 50' :
              riskProtectiveFactors?.uv_protection === 'spf_70'? 'FPS 70' :
              riskProtectiveFactors?.uv_protection === 'spf_100_plus'? 'FPS 100 ou mais' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente usa chapéus ou roupas de proteção ao se expor ao sol?">
            {
              riskProtectiveFactors?.hat_use === true ? 'Sim' :
              riskProtectiveFactors?.hat_use === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já utilizou serviços de bronzeamento artificial?">
            {
              riskProtectiveFactors?.artifitial_tan === true ? 'Sim' :
              riskProtectiveFactors?.artifitial_tan === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Com que frequencia o paciente visita o dermatologista para check-ups?">
            {
              riskProtectiveFactors?.checkups_frequency === 'annually'? 'Anualmente' :
              riskProtectiveFactors?.checkups_frequency === 'every_six_months'? 'A cada 6 meses' :
              riskProtectiveFactors?.checkups_frequency === 'not_regularly'? 'Não visita regularmente' :
              riskProtectiveFactors?.checkups_frequency === 'other'? 'Outro' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já participou de campanhas de prevenção contra o câncer de pele?">
            {
              riskProtectiveFactors?.cancer_campaigns === true ? 'Sim' :
              riskProtectiveFactors?.cancer_campaigns === false ? 'Não' :
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
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/edit/step1')}
        />
      </ScrollView>
    </Animated.View>
  );
}
