import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { useUlceraAnamnesisAPI } from "@/hooks/api/ulcera/useUlceraAnamnesisAPI";
import { useUlceraCareSupportForm } from "@/hooks/Ulcera/useUlceraCareSupportForm";
import { usePatientId } from "@/hooks/usePatientId";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraCareSupportEditStep3() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { ulceraCareSupportData, setUlceraCareSupportData } = useUlceraCareSupportForm();

  const { patientId } = usePatientId();
  const { updateAnamnesisUlceraCareSupport } = useUlceraAnamnesisAPI();

  const handleSendtoServer = async () => {
    setIsLoading(true);
    await updateAnamnesisUlceraCareSupport(patientId);
    // setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/careSupport');
  }

  const handleCancel = () => {
    setUlceraCareSupportData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/careSupport');
  }

  useEffect(() => {
    console.log(ulceraCareSupportData)
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

      <Header title="Acesso a cuidados e suporte" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={3} totalSteps={3} />

        <TitleText title="Resumo" style={{marginTop: 8}} />

        <View className="gap-8 my-8">
          <SummaryQuestion question="O paciente tem curativos disponíveis em casa ou fornecidos pela UBS?">
            {
              ulceraCareSupportData.has_dressings_available === 'YES'? 'Sim' :
              ulceraCareSupportData.has_dressings_available === 'NO'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente tem ajuda para cuidar da ferida em casa?">
            {
              ulceraCareSupportData.has_help_at_home === 'YES'? 'Sim' :
              ulceraCareSupportData.has_help_at_home === 'NO'? 'Não' :
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
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/edit/step2')} 
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
