import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraFamilyHistoryProps } from "@/types/forms";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function FamilyHistoryDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [familyHistory, setFamilyHistory] = useState<UlceraFamilyHistoryProps>();

  const { patientId } = usePatientId();

  async function loadFamilyHistory() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/patients/${patientId}/forms/family-vascular-history/`);

      setFamilyHistory(data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    } 
  }


  useEffect(() => {

    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadFamilyHistory();
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

      <Header title="Histórico familiar" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

        <TitleText title="Resumo" />

        <View className="gap-8 mt-8">
          <SummaryQuestion question="Alguém na família do paciente tem ou teve úlceras nas pernas?">
            {
              familyHistory?.family_leg_ulcers === 'YES'? 'Sim' :
              familyHistory?.family_leg_ulcers === 'NO'? 'Não' :
              familyHistory?.family_leg_ulcers === 'DONT_KNOW'? 'Não sabe' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="Alguém na família do paciente tem varizes importantes ou problemas circulatórios?">
            {
              familyHistory?.family_varicose_or_circulatory === 'YES'? 'Sim' :
              familyHistory?.family_varicose_or_circulatory === 'NO'? 'Não' :
              familyHistory?.family_varicose_or_circulatory === 'DONT_KNOW'? 'Não sabe' :
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
          onPress={() => router.push("/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/edit/step1")}
        />
      </ScrollView>
    </Animated.View>
  );
}
