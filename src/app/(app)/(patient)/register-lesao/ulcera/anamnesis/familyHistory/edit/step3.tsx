import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraFamilyHistoryForm } from "@/hooks/Ulcera/useUlceraFamilyHistoryForm";
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

export default function UlceraFamilyHistoryEditStep3() {
  const [isLoading, setIsLoading] = useState(false);
  
  
  const { ulceraFamilyHistoryData, setUlceraFamilyHistoryData } = useUlceraFamilyHistoryForm();

  const { patientId } = usePatientId();

  const handleSendtoServer = async () => {
    console.log(patientId);

    try {
      setIsLoading(true);
      // 1. Atualizar Histórico clinico geral

      const responseResult = await api.get(`/patients/${patientId}/forms/family-vascular-history/`);

      const dataId = responseResult.data.id;

      if(dataId){

        console.log("Enviando ulceraFamilyHistoryData com os seguintes dados:");
        // console.log({
          // "family_leg_ulcers": ulceraFamilyHistoryData.family_leg_ulcers,
          // "family_varicose_or_circulatory": ulceraFamilyHistoryData.family_varicose_or_circulatory
        // });

        const ulceraFamilyHistoryDataResponse = await api.put(
          `/patients/${patientId}/forms/family-vascular-history/${dataId}/`,
          {
            "family_leg_ulcers": ulceraFamilyHistoryData.family_leg_ulcers,
            "family_varicose_or_circulatory": ulceraFamilyHistoryData.family_varicose_or_circulatory
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("ulceraFamilyHistoryData atualizado com sucesso:", ulceraFamilyHistoryDataResponse.data);

        setUlceraFamilyHistoryData({});

        router.push('/(app)/(patient)/lesao/anamnesis/ulcera/familyHistory');
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
    setUlceraFamilyHistoryData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/familyHistory/');
  }

  useEffect(() => {
    console.log(ulceraFamilyHistoryData)
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

      <Header title="Histórico familiar" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={3} totalSteps={3} />

        <TitleText title="Resumo" style={{marginTop: 8}} />

        <View className="gap-8 my-8">

          <SummaryQuestion question="Alguém na família do paciente tem ou teve úlceras nas pernas?">
            {
              ulceraFamilyHistoryData.family_leg_ulcers === 'YES'? 'Sim' :
              ulceraFamilyHistoryData.family_leg_ulcers === 'NO'? 'Não' :
              ulceraFamilyHistoryData.family_leg_ulcers === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Alguém na família do paciente tem varizes importantes ou problemas circulatórios?">
            {
              ulceraFamilyHistoryData.family_varicose_or_circulatory === 'YES'? 'Sim' :
              ulceraFamilyHistoryData.family_varicose_or_circulatory === 'NO'? 'Não' :
              ulceraFamilyHistoryData.family_varicose_or_circulatory === 'DONT_KNOW'? 'Não sabe' :
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
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/edit/step2')} 
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
