import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useOncodermatoAnamnesisAPI } from "@/hooks/api/oncodermato/useOncodermatoAnamnesisAPI";
import { usePatientId } from "@/hooks/usePatientId";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PersonalFamilyHistoryDetails() {

  const [isLoading, setIsLoading] = useState(true);
  const { patientId } = usePatientId();
  const { loadPersonalFamilyHistory, personalFamilyHistory } = useOncodermatoAnamnesisAPI();

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        loadPersonalFamilyHistory(patientId);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timeout);

    }, [patientId])
  );

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

      <Header title="Histórico Familiar e Pessoal" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

      <TitleText title="Resumo" />

      <View className="gap-8 mt-8">

        <SummaryQuestion question="O paciente tem histórico familiar de câncer de pele?">
          { personalFamilyHistory?.family_history && personalFamilyHistory?.family_history.length > 0 ? personalFamilyHistory?.family_history?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não'}
        </SummaryQuestion>

        <SummaryQuestion question="Se sim, qual tipo de câncer de pele?">
          { personalFamilyHistory?.family_history_types && personalFamilyHistory?.family_history_types.length > 0 ? personalFamilyHistory?.family_history_types?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não tenho'}
        </SummaryQuestion>

        <SummaryQuestion question="O paciente já foi diagnosticado com câncer de pele?">
          { personalFamilyHistory?.patient_cancer_type && personalFamilyHistory?.patient_cancer_type.length > 0 ? personalFamilyHistory?.patient_cancer_type?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não fui'}
        </SummaryQuestion>

        <SummaryQuestion question="O paciente já teve lesões removidas que foram identificadas como pré-cancerígenas?">
          {
            personalFamilyHistory?.removed_injuries === true ? 'Sim' :
            personalFamilyHistory?.removed_injuries === false ? 'Não' :
            'Não informado'
          }
        </SummaryQuestion>

        <SummaryQuestion question="O paciente já passou por tratamento para lesões na pele?">
          { personalFamilyHistory?.injuries_treatment && personalFamilyHistory?.injuries_treatment.length > 0 ? personalFamilyHistory?.injuries_treatment?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não'}
        </SummaryQuestion>
      </View> 

        <Button 
          title="Editar" 
          secondary 
          style={{ marginTop: 24, alignSelf: "flex-start"}} 
          full={false} iconLeft 
          icon={<PencilSimpleLineIcon size={24} color="#4052A1" />} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step1')}
        />

      </ScrollView>
    </Animated.View>
  );
}
