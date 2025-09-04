import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraFamilyHistoryForm } from "@/hooks/Ulcera/useUlceraFamilyHistoryForm";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraFamilyHistoryStep3() {
  
  const { ulceraFamilyHistoryData, setUlceraFamilyHistoryData } = useUlceraFamilyHistoryForm();

  const handleNext = () => {
    router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/steps');
  }

  const handleCancel = () => {
    setUlceraFamilyHistoryData({});
    router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/steps');
  }

  useEffect(() => {
    console.log(ulceraFamilyHistoryData)
  }, []);

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
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/step2')} 
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
