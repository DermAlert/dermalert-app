import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import { SummaryQuestion } from "@/components/SummaryQuestion";
import { TitleText } from "@/components/TitleText";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraCareSupportProps } from "@/types/forms";
import { router } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function CareSupportDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [careSupport, setCareSupport] = useState<UlceraCareSupportProps>();

  const { patientId } = usePatientId();

  async function loadCareSupport() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/patients/${patientId}/forms/care-access-support/`);

      setCareSupport(data);

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    } 
  }


  useEffect(() => {

    setIsLoading(true);
    const timeout = setTimeout(() => {
      loadCareSupport();
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

      <Header title="Acesso a cuidados e suporte" icon="back" onPress={handleCancel} />

      <ScrollView className="px-8 my-6 w-full flex-1">

        <TitleText title="Resumo" />

        <View className="gap-8 mt-8">
          <SummaryQuestion question="O paciente tem curativos disponíveis em casa ou fornecidos pela UBS?">
            {
              careSupport?.has_dressings_available === 'YES'? 'Sim' :
              careSupport?.has_dressings_available === 'NO'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

          <SummaryQuestion question="O paciente tem ajuda para cuidar da ferida em casa?">
            {
              careSupport?.has_help_at_home === 'YES'? 'Sim' :
              careSupport?.has_help_at_home === 'NO'? 'Não' :
              'Não informado'
            }
          </SummaryQuestion>

        </View>

        <Button title="Editar" secondary style={{ marginTop: 24, alignSelf: "flex-start"}} full={false} iconLeft icon={<PencilSimpleLineIcon size={24} color="#4052A1" />} />

      </ScrollView>
    </Animated.View>
  );
}
