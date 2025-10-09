import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
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

export default function CancerResearchEditStep6() {
    const [isLoading, setIsLoading] = useState(false);
  
  
  const { cancerResearchData, setCancerResearchData } = useCancerResearchForm();
  const { setLesionType } = useLesionType();

  const { patientId } = usePatientId();

  const handleSendtoServer = async () => {
    console.log(patientId);

    try {
      setIsLoading(true);
      // 1. Atualiza Investigação de Câncer de Pele e Lesões Suspeitas

      const responseResult = await api.get(`/patients/${patientId}/forms/cancer-research/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Atualizando cancerResearchData com os seguintes dados:");
        // console.log({
        //   "suspicious_moles": cancerResearchData.suspicious_moles,
        //   "bleed_itch": cancerResearchData.bleed_itch,
        //   "how_long": cancerResearchData.how_long,
        //   "lesion_aspect": cancerResearchData.lesion_aspect,
        //   "diagnosis": cancerResearchData.diagnosis
        // });

        const cancerResearchResponse = await api.put(
          `/patients/${patientId}/forms/cancer-research/${dataId}/`,
          {
            "suspicious_moles": cancerResearchData.suspicious_moles,
            "bleed_itch": cancerResearchData.bleed_itch,
            "how_long": cancerResearchData.how_long,
            "lesion_aspect": cancerResearchData.lesion_aspect,
            "diagnosis": cancerResearchData.diagnosis
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("cancerResearchData atualizado", cancerResearchResponse.data);

        setCancerResearchData({});

        setLesionType(null)
       

        router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/cancerResearch');
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
    setCancerResearchData({});
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/cancerResearch');  
  }



  useEffect(() => {
    console.log(cancerResearchData)
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

      <Header title="Investigação de CA e Lesões" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={6} totalSteps={6} />

        <TitleText title="Resumo" style={{marginTop: 8}} />

        <View className="gap-8 my-8">

          <SummaryQuestion question="O paciente tem pintas ou manchas que mudaram de cor, tamanho ou formato recentemente?">
            {
              cancerResearchData.suspicious_moles === true ? 'Sim' :
              cancerResearchData.suspicious_moles === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Essas manchas ou lesões causam coceira, sangramento ou dor?">
            {
              cancerResearchData.bleed_itch === true ? 'Sim' :
              cancerResearchData.bleed_itch === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Com que frequencia o paciente visita o dermatologista para check-ups?">
            {
              cancerResearchData.how_long === 'lt_1_month'? 'Menos de 1 mês' :
              cancerResearchData.how_long === '1_3_months'? '1-3 meses' :
              cancerResearchData.how_long === '3_6_months'? '3-6 meses' :
              cancerResearchData.how_long === 'gt_6_months'? 'Mais de 6 meses' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Essas lesões têm bordas irregulares, múltiplas cores ou assimetria?">
            {
              cancerResearchData.lesion_aspect === true ? 'Sim' :
              cancerResearchData.lesion_aspect === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já procurou um médico para avaliar essas lesões? Se sim, qual o diagnóstico?">
            {cancerResearchData.diagnosis}
          </SummaryQuestion>

        </View>
        
      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/edit/step5')} 
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
