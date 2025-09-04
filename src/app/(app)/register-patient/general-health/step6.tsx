import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function GeneralHealthStep6() {
  
  const { generalHealthData, setGeneralHealthData  } = useGeneralHealthForm();

  const handleNext = () => {
    router.push('/(app)/register-patient/step9');
  }

  const handleCancel = () => {
    setGeneralHealthData({});
    router.push('/(app)/register-patient/step9');
  }



  useEffect(() => {
    console.log(generalHealthData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Andecedentes clínicos" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={6} totalSteps={6} />

        <TitleText title="Resumo" style={{marginTop: 8}} />

        <View className="gap-8 my-8">

          <SummaryQuestion question="O paciente tem histórico de doenças crônicas?">
            { generalHealthData.chronic_diseases && generalHealthData.chronic_diseases.length > 0 ? generalHealthData.chronic_diseases?.join(', ') : 'Não'}
          </SummaryQuestion>

          <SummaryQuestion question="O paciente faz uso regular de medicamentos?">
            { generalHealthData.medicines && generalHealthData.medicines.length > 0 ? generalHealthData.medicines?.join(', ') : 'Não'}
          </SummaryQuestion>

          <SummaryQuestion question="O paciente possui alergias?">
            { generalHealthData.allergies && generalHealthData.allergies.length > 0 ? generalHealthData.allergies?.join(', ') : 'Não'}
          </SummaryQuestion>

          <SummaryQuestion question="O paciente já passou por cirurgias?">
            {generalHealthData.surgeries}
          </SummaryQuestion>

          <SummaryQuestion question="O paciente pratica atividade física regularmente?">
            {
              generalHealthData.physical_activity_frequency === 'daily'? 'Diariamente' :
              generalHealthData.physical_activity_frequency === '3-5 times a week'? '3-5 vezes por semana' :
              generalHealthData.physical_activity_frequency === '1-2 times a week'? '1-2 vezes por semana' :
              generalHealthData.physical_activity_frequency === 'occasionally'? 'Ocasionalmente' :
              generalHealthData.physical_activity_frequency === 'never'? 'Não' :
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
          onPress={()=> router.push("/(app)/register-patient/general-health/step5")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Salvar" 
          onPress={handleNext}
          style={{ flexGrow: 1, width: '47%' }}
        />
      </View>
    </Animated.View>
  );
}
