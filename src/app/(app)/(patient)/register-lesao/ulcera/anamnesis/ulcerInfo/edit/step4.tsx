import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraAnamnesisAPI } from "@/hooks/api/ulcera/useUlceraAnamnesisAPI";
import { useUlceraUlcerInfoForm } from "@/hooks/Ulcera/useUlceraUlcerInfoForm";
import { usePatientId } from "@/hooks/usePatientId";
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
  const { updateAnamnesisUlceraUlcerInfo } = useUlceraAnamnesisAPI();

  const handleSendtoServer = async () => {
    setIsLoading(true);
    await updateAnamnesisUlceraUlcerInfo(patientId);
    // setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/ulcerInfo');
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
