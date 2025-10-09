import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraHealthHistoryProps } from "@/types/forms";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function HealthHistoryDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [healthHistory, setHealthHistory] = useState<UlceraHealthHistoryProps>();

  const { patientId } = usePatientId();
  

  async function loadHealthHistory() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/patients/${patientId}/forms/clinical-history/`);

      setHealthHistory(data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    } 
  }


  useEffect(() => {

    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadHealthHistory();
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

      <Header title="Histórico clínico geral" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

        <TitleText title="Resumo" />

        <View className="gap-8 mt-8">
          <SummaryQuestion question="O paciente possui diagnóstico de hipertensão arterial?">
            {
              healthHistory?.hypertension === 'YES'? 'Sim' :
              healthHistory?.hypertension === 'NO'? 'Não' :
              healthHistory?.hypertension === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente possui diagnóstico de diabetes mellitus?">
            {
              healthHistory?.diabetes === 'YES'? 'Sim' :
              healthHistory?.diabetes === 'NO'? 'Não' :
              healthHistory?.diabetes === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já teve trombose venosa profunda?">
            {
              healthHistory?.deep_vein_thrombosis === 'YES'? 'Sim' :
              healthHistory?.deep_vein_thrombosis === 'NO'? 'Não' :
              healthHistory?.deep_vein_thrombosis === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já foi diagnosticado(a) com insuficiência venosa crônica?">
            {
              healthHistory?.chronic_venous_insufficiency === 'YES'? 'Sim' :
              healthHistory?.chronic_venous_insufficiency === 'NO'? 'Não' :
              healthHistory?.chronic_venous_insufficiency === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente usa ou já usou meias de compressão?">
            {
              healthHistory?.compression_stockings_use === 'CURRENTLY'? 'Sim, atualmente' :
              healthHistory?.compression_stockings_use === 'USED_BUT_NOT_ANYMORE'? 'Sim, mas não usa mais' :
              healthHistory?.compression_stockings_use === 'NEVER_USED'? 'Não Nunca usou' :
              healthHistory?.compression_stockings_use === 'DONT_KNOW_WHAT_IT_IS'? 'Não sabe o que é' :
              'Não informado'
            }
          </SummaryQuestion>

        </View>

        <Button title="Editar" 
          secondary 
          style={{ marginTop: 24, alignSelf: "flex-start"}} 
          full={false} 
          iconLeft 
          icon={<PencilSimpleLineIcon size={24} color="#4052A1" />} 
          onPress={() => router.push("/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/edit/step1")}
        />

      </ScrollView>
    </Animated.View>
  );
}
