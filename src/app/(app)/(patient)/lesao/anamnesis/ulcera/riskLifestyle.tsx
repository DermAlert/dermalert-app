import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraRiskLifestyleProps } from "@/types/forms";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RiskLifestyleDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [riskLifestyle, setRiskLifestyle] = useState<UlceraRiskLifestyleProps>();

  const { patientId } = usePatientId();

  async function loadRiskLifestyle() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/patients/${patientId}/forms/lifestyle-risk/`);

      setRiskLifestyle(data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    } 
  }


  useEffect(() => {

    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadRiskLifestyle();
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

      <Header title="Fatores de risco e estilo de vida" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

        <TitleText title="Resumo" />

        <View className="gap-8 mt-8">
          <SummaryQuestion question="O paciente permanece sentado(a) ou em pé por longos períodos durante o dia?">
            {
              riskLifestyle?.long_periods_posture === 'STANDING_LONG_HOURS'? 'Sim, em pé por muitas horas' :
              riskLifestyle?.long_periods_posture === 'SITTING_LONG_HOURS'? 'Sim, sentado(a) por muitas horas' :
              riskLifestyle?.long_periods_posture === 'NO'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já teve algum trauma na perna ou pé?">
            {
              riskLifestyle?.leg_foot_trauma === 'YES'? 'Sim' :
              riskLifestyle?.leg_foot_trauma === 'NO'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente fuma ou já fumou?">
            {
              riskLifestyle?.smoking === 'CURRENT_SMOKER'? 'Sim, atualmente' :
              riskLifestyle?.smoking === 'FORMER_SMOKER'? 'Já fumou, mas parou' :
              riskLifestyle?.smoking === 'NEVER_SMOKED'? 'Nunca fumou' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente pratica alguma atividade física regularmente?">
            {
              riskLifestyle?.physical_activity === 'YES'? 'Sim' :
              riskLifestyle?.physical_activity === 'NO'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

        </View>

        <Button title="Editar" secondary style={{ marginTop: 24, alignSelf: "flex-start"}} full={false} iconLeft icon={<PencilSimpleLineIcon size={24} color="#4052A1" />} />

      </ScrollView>
    </Animated.View>
  );
}
