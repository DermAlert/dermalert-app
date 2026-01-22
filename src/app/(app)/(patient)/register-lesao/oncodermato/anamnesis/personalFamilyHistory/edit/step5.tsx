import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useOncodermatoAnamnesisAPI } from "@/hooks/api/oncodermato/useOncodermatoAnamnesisAPI";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
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

export default function PersonalFamilyHistoryEditStep5() {
  const { familyHistoryData, setFamilyHistoryData  } = useFamilyHistoryForm();
  const { setLesionType } = useLesionType();
  const [isLoading, setIsLoading] = useState(false);

  const { patientId } = usePatientId();
  const { updateAnamnesisOncodermatoFamilyHistory } = useOncodermatoAnamnesisAPI();

  const handleSendtoServer = async () => {
    setIsLoading(true);
    await updateAnamnesisOncodermatoFamilyHistory(patientId);
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/personalFamilyHistory');
  }


  const handleCancel = () => {
    setFamilyHistoryData({});
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/personalFamilyHistory');
  }



  useEffect(() => {
    console.log(familyHistoryData)
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
    

      <Header title="Histórico Familiar e Pessoal" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={5} totalSteps={5} />

        <TitleText title="Resumo" style={{marginTop: 24}} />

        <View className='gap-8 my-8'>

          <SummaryQuestion question="O paciente tem histórico familiar de câncer de pele?">
            { familyHistoryData?.family_history && familyHistoryData?.family_history.length > 0 ? familyHistoryData?.family_history?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não'}
          </SummaryQuestion>

          <SummaryQuestion question="Se sim, qual tipo de câncer de pele?">
            { familyHistoryData?.family_history_types && familyHistoryData?.family_history_types.length > 0 ? familyHistoryData?.family_history_types?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não tenho'}
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já foi diagnosticado com câncer de pele?">
            { familyHistoryData?.patient_cancer_type && familyHistoryData?.patient_cancer_type.length > 0 ? familyHistoryData?.patient_cancer_type?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não fui'}
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já teve lesões removidas que foram identificadas como pré-cancerígenas?">
            {
              familyHistoryData.removed_injuries === true ? 'Sim' :
              familyHistoryData.removed_injuries === false ? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já passou por tratamento para lesões na pele?">
            { familyHistoryData?.injuries_treatment && familyHistoryData?.injuries_treatment.length > 0 ? familyHistoryData?.injuries_treatment?.map((item: string | { name: string }) => typeof item === 'string' ? item : item.name).join(', ') : 'Não'}
          </SummaryQuestion>

        </View>
      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step4')} 
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
