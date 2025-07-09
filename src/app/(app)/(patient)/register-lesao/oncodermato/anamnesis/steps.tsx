import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAddImage from "@/components/ModalAddImage";
import ModalAlert from "@/components/ModalAlert";
import StepCard from "@/components/StepCard";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterAnamnesisOncodermato() {
  const [modalAlert, setModalAlert] = useState(false);
  const [modalAddImage, setModalAddImage] = useState(false);
  const [personalFamilyHistory, setPersonalFamilyHistory] = useState(false)
  const [phototypeAssessment, setPhototypeAssessment] = useState(false)
  const [riskProtectiveFactors, setRiskProtectiveFactors] = useState(false)
  const [cancerResearch, setCancerResearch] = useState(false)

  const isFullFilled = personalFamilyHistory && phototypeAssessment && riskProtectiveFactors && cancerResearch;

  const { familyHistoryData, setFamilyHistoryData  } = useFamilyHistoryForm();
  const { phototypeAssessmentData, setPhototypeAssessmentData  } = usePhototypeAssessmentForm();
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData  } = useRiskProtectiveFactorsForm();
  const { cancerResearchData, setCancerResearchData  } = useCancerResearchForm();
 
  
  const handleCancel = () => {
    setFamilyHistoryData({});
    setPhototypeAssessmentData({});
    setRiskProtectiveFactorsData({});
    setCancerResearchData({});
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

      <ModalAddImage modalAddImage={modalAddImage} setModalAddImage={setModalAddImage} />

      <Header title="Registrar lesão" onPress={() => setModalAlert(!modalAlert)} />

      <View className="px-6 w-full justify-start flex-1">


        <Text className="text-2xl font-semibold mt-6">Anamnese Oncodermato</Text>

        <Text className="text-base text-gray-500 mt-4 mb-8">Preencha as fichas de anamnese de oncodermato do paciente para registrar a lesão.</Text>

        <StepCard steps={5} title="Histórico Familiar e Pessoal de Câncer de Pele" stepCheck={personalFamilyHistory} onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/step1')} />

        <StepCard steps={8} title="Avaliação de Fototipo" stepCheck={phototypeAssessment} onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step1')} />

        <StepCard steps={8} title="Fatores de Risco e Proteção para Câncer de Pele" stepCheck={riskProtectiveFactors} onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step1')} />

        <StepCard steps={6} title="Investigação de Câncer de Pele e Lesões Suspeitas" stepCheck={cancerResearch} onPress={() =>  router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step1')} />
        
      
      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Salvar e avançar" 
          iconRight
          icon={<AntDesign name="arrowright" size={14} color={`${isFullFilled ? 'white' : '#B3B3B3'}`} />} 
          onPress={()=> {isFullFilled && router.push("/(app)/(patient)/patient/[id]")}} 
          style={{ marginTop: 24 }} 
          activeOpacity={isFullFilled ? 0.2 : 1}
          disabled={isFullFilled}
        />
      </View>

    </Animated.View>
  );
}
