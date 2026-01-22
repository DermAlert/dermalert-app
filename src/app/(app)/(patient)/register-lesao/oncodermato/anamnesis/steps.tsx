import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ModalAlert from "@/components/ModalAlert";
import StepCard from "@/components/StepCard";
import { TitleText } from "@/components/TitleText";
import { useOncodermatoAnamnesisAPI } from "@/hooks/api/oncodermato/useOncodermatoAnamnesisAPI";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterAnamnesisOncodermato() {
  const [modalAlert, setModalAlert] = useState(false);
  const [personalFamilyHistory, setPersonalFamilyHistory] = useState(false)
  const [phototypeAssessment, setPhototypeAssessment] = useState(false)
  const [riskProtectiveFactors, setRiskProtectiveFactors] = useState(false)
  const [cancerResearch, setCancerResearch] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const isFullFilled = personalFamilyHistory && phototypeAssessment && riskProtectiveFactors && cancerResearch;

  const { familyHistoryData, setFamilyHistoryData  } = useFamilyHistoryForm();
  const { phototypeAssessmentData, setPhototypeAssessmentData  } = usePhototypeAssessmentForm();
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData  } = useRiskProtectiveFactorsForm();
  const { cancerResearchData, setCancerResearchData  } = useCancerResearchForm();

  const { patientId } = usePatientId();
  const { setLesionType } = useLesionType();
  const { sendAnamnesisOncodermatoCancerResearch, sendAnamnesisOncodermatoFamilyHistory, sendAnamnesisOncodermatoPhototype, sendAnamnesisOncodermatoRiskProtectiveFactors } = useOncodermatoAnamnesisAPI();
  
    const handleSendtoServer = async () => {
      setIsLoading(true);
      await sendAnamnesisOncodermatoFamilyHistory(patientId);
      await sendAnamnesisOncodermatoPhototype(patientId);
      await sendAnamnesisOncodermatoRiskProtectiveFactors(patientId);
      await sendAnamnesisOncodermatoCancerResearch(patientId);
      router.push("/(app)/(patient)/register-lesao/oncodermato/anamnesis/success")
    }

  
  const handleCancel = () => {
    setFamilyHistoryData({});
    setPhototypeAssessmentData({});
    setRiskProtectiveFactorsData({});
    setCancerResearchData({});
    setLesionType(null)
    setModalAlert(!modalAlert);
    router.push('/(app)/(patient)/register-lesao/select');
  }

  useEffect(() => {
    if (familyHistoryData) {
      const hasData = Object.keys(familyHistoryData).length > 0;
      setPersonalFamilyHistory(hasData);
    }
    if (phototypeAssessmentData) {
      const hasData = Object.keys(phototypeAssessmentData).length > 0;
      setPhototypeAssessment(hasData);
    }
    if (riskProtectiveFactorsData) {
      const hasData = Object.keys(riskProtectiveFactorsData).length > 0;
      setRiskProtectiveFactors(hasData);
    }
    if (cancerResearchData) {
      const hasData = Object.keys(cancerResearchData).length > 0;
      setCancerResearch(hasData);
    }
  }, [familyHistoryData, phototypeAssessmentData, riskProtectiveFactorsData, cancerResearchData]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setFamilyHistoryData({});
        setPhototypeAssessmentData({});
        setRiskProtectiveFactorsData({});
        setCancerResearchData({});
        setLesionType(null)
        setModalAlert(true);
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

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
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <ModalAlert 
        modalAlert={modalAlert} 
        setModalAlert={setModalAlert} 
        description="Ao cancelar a anamnese, todos os dados preenchidos até aqui serão perdidos."
        title="Deseja cancelar a anamnese?"
        handleCancel={handleCancel}
        btnNoText="Não, continuar"
        btnYesText="Sim, cancelar"
      />

      <Header title="Registrar lesão" onPress={() => setModalAlert(!modalAlert)} />

      <View className="px-8 py-6 w-full justify-start flex-1">

        <TitleText title="Anamnese Oncodermato" description="Preencha as fichas de anamnese de oncodermato do paciente para registrar a lesão." />

        <View className="gap-3 mt-8">
          <StepCard steps={5} title="Histórico Familiar e Pessoal de Câncer de Pele" stepCheck={personalFamilyHistory} onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step1')} />

          <StepCard steps={8} title="Avaliação de Fototipo" stepCheck={phototypeAssessment} onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step1')} />

          <StepCard steps={8} title="Fatores de Risco e Proteção para Câncer de Pele" stepCheck={riskProtectiveFactors} onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step1')} />

          <StepCard steps={6} title="Investigação de Câncer de Pele e Lesões Suspeitas" stepCheck={cancerResearch} onPress={() =>  router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step1')} />
        </View>

        
        
      
      </View>

      <View className=" mt-6 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Salvar e avançar" 
          iconRight
          icon={<ArrowRightIcon size={24} color={`${isFullFilled ? 'white' : '#D4D6DF'}`} />} 
          onPress={()=> {isFullFilled && handleSendtoServer()}} 
          activeOpacity={isFullFilled ? 0.2 : 1}
          disabled={isFullFilled}
        />
      </View>

    </Animated.View>
  );
}
