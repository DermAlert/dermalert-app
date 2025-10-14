import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ModalAlert from "@/components/ModalAlert";
import StepCard from "@/components/StepCard";
import { TitleText } from "@/components/TitleText";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import axios from "axios";
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

  const handleSendtoServer = async () => {
    console.log(patientId);

    try {
      setIsLoading(true);

      // 1. Envia Histórico Familiar e Pessoal de Câncer de Pele
      const formattedfamilyHistory = familyHistoryData.family_history && familyHistoryData.family_history.length > 0 ? familyHistoryData.family_history.map((d) => ({ name: d })) : [];
      
      const formattedfamilyHistoryTypes = familyHistoryData.family_history_types && familyHistoryData.family_history_types.length > 0 ? familyHistoryData.family_history_types.map((d) => ({ name: d })) : [];
      
      const formattedCancerType = familyHistoryData.patient_cancer_type && familyHistoryData.patient_cancer_type.length > 0 ? familyHistoryData.patient_cancer_type.map((d) => ({ name: d })) : [];
      
      const formattedInjuriesTreatment = familyHistoryData.injuries_treatment && familyHistoryData.injuries_treatment.length > 0 ? familyHistoryData.injuries_treatment.map((d) => ({ name: d })) : [];

      console.log("Enviando familyHistoryData com os seguintes dados:");
      // console.log({
      //   "family_history": formattedfamilyHistory,
      //   "family_history_types": formattedfamilyHistoryTypes,
      //   "patient_cancer_type": formattedCancerType,
      //   "removed_injuries": familyHistoryData.removed_injuries,
      //   "injuries_treatment": formattedInjuriesTreatment
      // });

      const familyHistoryResponse = await api.post(
        `/patients/${patientId}/forms/family-history/`,
        {
          "family_history": formattedfamilyHistory,
          "family_history_types": formattedfamilyHistoryTypes,
          "patient_cancer_type": formattedCancerType,
          "removed_injuries": familyHistoryData.removed_injuries,
          "injuries_treatment": formattedInjuriesTreatment
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("familyHistoryData enviado com sucesso:", familyHistoryResponse.data);


      setFamilyHistoryData({});

      //-------- 

      // 2. Envia Avaliação de Fototipo

      console.log("Enviando phototypeAssessmentData com os seguintes dados:");
      // console.log({
      //   "skin_color": phototypeAssessmentData.skin_color,
      //   "eyes_color": phototypeAssessmentData.eyes_color,
      //   "hair_color": phototypeAssessmentData.hair_color,
      //   "freckles": phototypeAssessmentData.freckles,
      //   "sun_exposed": phototypeAssessmentData.sun_exposed,
      //   "tanned_skin": phototypeAssessmentData.tanned_skin,
      //   "sun_sensitive_skin": phototypeAssessmentData.sun_sensitive_skin
      // });

      const phototypeAssessmentResponse = await api.post(
        `/patients/${patientId}/forms/phototype/`,
        {
          "skin_color": phototypeAssessmentData.skin_color,
          "eyes_color": phototypeAssessmentData.eyes_color,
          "hair_color": phototypeAssessmentData.hair_color,
          "freckles": phototypeAssessmentData.freckles,
          "sun_exposed": phototypeAssessmentData.sun_exposed,
          "tanned_skin": phototypeAssessmentData.tanned_skin,
          "sun_sensitive_skin": phototypeAssessmentData.sun_sensitive_skin
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("phototypeAssessmentData enviado com sucesso:", phototypeAssessmentResponse.data);

      setPhototypeAssessmentData({});

      // -----

      //3. Envia Fatores de Risco e Proteção para Câncer de Pele

      console.log("Enviando riskProtectiveFactorsData com os seguintes dados:");
      // console.log({
      //   "sun_exposure_period": riskProtectiveFactorsData.sun_exposure_period,
      //   "sun_burn": riskProtectiveFactorsData.sun_burn,
      //   "uv_protection": riskProtectiveFactorsData.uv_protection,
      //   "hat_use": riskProtectiveFactorsData.hat_use,
      //   "artifitial_tan": riskProtectiveFactorsData.artifitial_tan,
      //   "checkups_frequency": riskProtectiveFactorsData.checkups_frequency,
      //   "cancer_campaigns": riskProtectiveFactorsData.cancer_campaigns
      // });

      const riskProtectiveFactorsResponse = await api.post(
        `/patients/${patientId}/forms/risk-protective-factors/`,
        {
          "sun_exposure_period": riskProtectiveFactorsData.sun_exposure_period,
          "sun_burn": riskProtectiveFactorsData.sun_burn,
          "uv_protection": riskProtectiveFactorsData.uv_protection,
          "hat_use": riskProtectiveFactorsData.hat_use,
          "artifitial_tan": riskProtectiveFactorsData.artifitial_tan,
          "checkups_frequency": riskProtectiveFactorsData.checkups_frequency,
          "cancer_campaigns": riskProtectiveFactorsData.cancer_campaigns
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("riskProtectiveFactorsData enviado com sucesso:", riskProtectiveFactorsResponse.data);

      setRiskProtectiveFactorsData({});


      // -----

      //4. Envia Investigação de Câncer de Pele e Lesões Suspeitas

      console.log("Enviando cancerResearchData com os seguintes dados:");
      // console.log({
      //   "suspicious_moles": cancerResearchData.suspicious_moles,
      //   "bleed_itch": cancerResearchData.bleed_itch,
      //   "how_long": cancerResearchData.how_long,
      //   "lesion_aspect": cancerResearchData.lesion_aspect,
      //   "diagnosis": cancerResearchData.diagnosis
      // });

      const cancerResearchResponse = await api.post(
        `/patients/${patientId}/forms/cancer-research/`,
        {
          "suspicious_moles": cancerResearchData.suspicious_moles,
          "bleed_itch": cancerResearchData.bleed_itch,
          "how_long": cancerResearchData.how_long,
          "lesion_aspect": cancerResearchData.lesion_aspect,
          "diagnosis": cancerResearchData.diagnosis
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("cancerResearchData enviado com sucesso:", cancerResearchResponse.data);

      setCancerResearchData({});

      router.push("/(app)/(patient)/register-lesao/oncodermato/anamnesis/success")

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        //console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
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
