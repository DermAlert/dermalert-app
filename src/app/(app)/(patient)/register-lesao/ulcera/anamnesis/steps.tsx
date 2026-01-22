import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ModalAlert from "@/components/ModalAlert";
import StepCard from "@/components/StepCard";
import { TitleText } from "@/components/TitleText";
import { useUlceraAnamnesisAPI } from "@/hooks/api/ulcera/useUlceraAnamnesisAPI";
import { useUlceraCareSupportForm } from "@/hooks/Ulcera/useUlceraCareSupportForm";
import { useUlceraFamilyHistoryForm } from "@/hooks/Ulcera/useUlceraFamilyHistoryForm";
import { useUlceraHealthHistoryForm } from "@/hooks/Ulcera/useUlceraHealthHistoryForm";
import { useUlceraRiskLifestyleForm } from "@/hooks/Ulcera/useUlceraRiskLifestyleForm";
import { useUlceraUlcerInfoForm } from "@/hooks/Ulcera/useUlceraUlcerInfoForm";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterAnamnesisUlcera() {
  const [modalAlert, setModalAlert] = useState(false);
  const [ulceraHealthHistory, setUlceraHealthHistory] = useState(false)
  const [ulceraRiskLifestyle, setUlceraRiskLifestyle] = useState(false)
  const [ulceraFamilyHistory, setUlceraFamilyHistory] = useState(false)
  const [ulceraUlcerInfo, setUlceraUlcerInfo] = useState(false)
  const [ulceraCareSupport, setUlceraCareSupport] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const isFullFilled = ulceraHealthHistory && ulceraRiskLifestyle && ulceraFamilyHistory && ulceraUlcerInfo && ulceraCareSupport;

  const { ulceraHealthHistoryData, setUlceraHealthHistoryData  } = useUlceraHealthHistoryForm();
  const { ulceraRiskLifestyleData, setUlceraRiskLifestyleData  } = useUlceraRiskLifestyleForm();
  const { ulceraFamilyHistoryData, setUlceraFamilyHistoryData  } = useUlceraFamilyHistoryForm();
  const { ulceraCareSupportData, setUlceraCareSupportData  } = useUlceraCareSupportForm();
  const { ulceraUlcerInfoData, setUlceraUlcerInfoData  } = useUlceraUlcerInfoForm();

  const { patientId } = usePatientId();
  const { lesionType, setLesionType } = useLesionType();

  const { sendAnamnesisUlceraCareSupport, sendAnamnesisUlceraFamilyHistory, sendAnamnesisUlceraHealthHistory, sendAnamnesisUlceraRiskLifestyle, sendAnamnesisUlceraUlcerInfo } = useUlceraAnamnesisAPI();

  const handleSendtoServer = async () => {
      setIsLoading(true);
      await sendAnamnesisUlceraCareSupport(patientId);
      await sendAnamnesisUlceraFamilyHistory(patientId);
      await sendAnamnesisUlceraHealthHistory(patientId);
      await sendAnamnesisUlceraRiskLifestyle(patientId);
      await sendAnamnesisUlceraUlcerInfo(patientId);
      router.push("/(app)/(patient)/register-lesao/ulcera/anamnesis/success")
    }
 
  
  const handleCancel = () => {
    setUlceraHealthHistoryData({});
    setUlceraRiskLifestyleData({});
    setUlceraFamilyHistoryData({});
    setUlceraUlcerInfoData({});
    setUlceraCareSupportData({});
    setLesionType(null)
    setModalAlert(!modalAlert);
    router.push('/(app)/(patient)/register-lesao/select');
  }

  useEffect(() => {
    if (ulceraHealthHistoryData) {
      const hasData = Object.keys(ulceraHealthHistoryData).length > 0;
      setUlceraHealthHistory(hasData);
    }
    if (ulceraRiskLifestyleData) {
      const hasData = Object.keys(ulceraRiskLifestyleData).length > 0;
      setUlceraRiskLifestyle(hasData);
    }
    if (ulceraFamilyHistoryData) {
      const hasData = Object.keys(ulceraFamilyHistoryData).length > 0;
      setUlceraFamilyHistory(hasData);
    }
    if (ulceraUlcerInfoData) {
      const hasData = Object.keys(ulceraUlcerInfoData).length > 0;
      setUlceraUlcerInfo(hasData);
    }
    if (ulceraCareSupportData) {
      const hasData = Object.keys(ulceraCareSupportData).length > 0;
      setUlceraCareSupport(hasData);
    }
  }, [ulceraHealthHistoryData, ulceraRiskLifestyleData, ulceraFamilyHistoryData, ulceraUlcerInfoData, ulceraCareSupportData]);

  useEffect(() => {
    console.log(lesionType)
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setUlceraHealthHistoryData({});
        setUlceraRiskLifestyleData({});
        setUlceraFamilyHistoryData({});
        setUlceraUlcerInfoData({});
        setUlceraCareSupportData({});
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

        <TitleText title="Anamnese Ulcera Venosa" description="Preencha as fichas de anamnese de úlcera venosa do paciente para registrar a lesão." />

        <View className="gap-3 mt-8">
          <StepCard steps={6} title="Histórico clínico geral" stepCheck={ulceraHealthHistory} onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/step1')} />

          <StepCard steps={5} title="Fatores de risco e estilo de vida" stepCheck={ulceraRiskLifestyle} onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step1')} />

          <StepCard steps={3} title="Histórico familiar" stepCheck={ulceraFamilyHistory} onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/familyHistory/step1')} />

          <StepCard steps={4} title="Informações sobre a úlcera atual" stepCheck={ulceraUlcerInfo} onPress={() =>  router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/step1')} />

          <StepCard steps={3} title="Acesso a cuidados e suporte" stepCheck={ulceraCareSupport} onPress={() =>  router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/step1')} />
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
