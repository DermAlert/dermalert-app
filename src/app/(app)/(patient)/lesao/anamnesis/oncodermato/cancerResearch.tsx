import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { CancerResearchProps } from "@/types/forms";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function CancerResearchDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [cancerResearch, setCancerResearch] = useState<CancerResearchProps>();

  const { patientId } = usePatientId();

  async function loadCancerResearch() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/patients/${patientId}/forms/cancer-research/`);

      setCancerResearch(data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    } 
  }


  useEffect(() => {

    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadCancerResearch();
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

      <Header title="Investigação de CA e Lesões" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

        <TitleText title="Resumo" />

        <View className="gap-8 mt-8">
          <SummaryQuestion question="O paciente tem pintas ou manchas que mudaram de cor, tamanho ou formato recentemente?">
            {
              cancerResearch?.suspicious_moles === true ? 'Sim' :
              cancerResearch?.suspicious_moles === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Essas manchas ou lesões causam coceira, sangramento ou dor?">
            {
              cancerResearch?.bleed_itch === true ? 'Sim' :
              cancerResearch?.bleed_itch === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Com que frequencia o paciente visita o dermatologista para check-ups?">
            {
              cancerResearch?.how_long === 'lt_1_month'? 'Menos de 1 mês' :
              cancerResearch?.how_long === '1_3_months'? '1-3 meses' :
              cancerResearch?.how_long === '3_6_months'? '3-6 meses' :
              cancerResearch?.how_long === 'gt_6_months'? 'Mais de 6 meses' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Essas lesões têm bordas irregulares, múltiplas cores ou assimetria?">
            {
              cancerResearch?.lesion_aspect === true ? 'Sim' :
              cancerResearch?.lesion_aspect === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já procurou um médico para avaliar essas lesões? Se sim, qual o diagnóstico?">
            {cancerResearch?.diagnosis}
          </SummaryQuestion>

        </View>

        <Button 
          title="Editar" 
          secondary 
          style={{ marginTop: 24, alignSelf: "flex-start"}} 
          full={false} iconLeft 
          icon={<PencilSimpleLineIcon size={24} color="#4052A1" />} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/edit/step1')}
        />
      </ScrollView>
    </Animated.View>
  );
}
