import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraAnamnesisAPI } from "@/hooks/api/ulcera/useUlceraAnamnesisAPI";
import { useUlceraHealthHistoryForm } from "@/hooks/Ulcera/useUlceraHealthHistoryForm";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
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
  const { setLesionType } = useLesionType();
  const { patientId } = usePatientId();
  const { updateAnamnesisUlceraHealthHistory } = useUlceraAnamnesisAPI();

  const handleSendtoServer = async () => {
    setIsLoading(true);
    await updateAnamnesisUlceraHealthHistory(patientId);
    // setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/healthHistory');
  }

  const handleCancel = () => {
    setUlceraHealthHistoryData({});
    // setLesionType(null)
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
