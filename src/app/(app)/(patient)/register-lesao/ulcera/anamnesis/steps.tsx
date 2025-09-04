import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ModalAlert from "@/components/ModalAlert";
import StepCard from "@/components/StepCard";
import { TitleText } from "@/components/TitleText";
import { useUlceraCareSupportForm } from "@/hooks/Ulcera/useUlceraCareSupportForm";
import { useUlceraFamilyHistoryForm } from "@/hooks/Ulcera/useUlceraFamilyHistoryForm";
import { useUlceraHealthHistoryForm } from "@/hooks/Ulcera/useUlceraHealthHistoryForm";
import { useUlceraRiskLifestyleForm } from "@/hooks/Ulcera/useUlceraRiskLifestyleForm";
import { useUlceraUlcerInfoForm } from "@/hooks/Ulcera/useUlceraUlcerInfoForm";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import axios from "axios";
import { router } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
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

  const handleSendtoServer = async () => {
    console.log(patientId);

    try {
      setIsLoading(true);
      // 1. Envia Histórico clinico geral

      console.log("Enviando ulceraHealthHistoryData com os seguintes dados:");
      // console.log({
      //   "hypertension": ulceraHealthHistoryData.hypertension,
      //   "diabetes": ulceraHealthHistoryData.diabetes,
      //   "deep_vein_thrombosis": ulceraHealthHistoryData.deep_vein_thrombosis,
      //   "chronic_venous_insufficiency": ulceraHealthHistoryData.chronic_venous_insufficiency,
      //   "compression_stockings_use": ulceraHealthHistoryData.compression_stockings_use,
      // });

      const ulceraHealthHistoryResponse = await api.post(
        `/patients/${patientId}/forms/clinical-history/`,
        {
          "hypertension": ulceraHealthHistoryData.hypertension,
          "diabetes": ulceraHealthHistoryData.diabetes,
          "deep_vein_thrombosis": ulceraHealthHistoryData.deep_vein_thrombosis,
          "chronic_venous_insufficiency": ulceraHealthHistoryData.chronic_venous_insufficiency,
          "compression_stockings_use": ulceraHealthHistoryData.compression_stockings_use,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraHealthHistoryData enviado com sucesso:", ulceraHealthHistoryResponse.data);

      setUlceraHealthHistoryData({});

      //------

      // 2. Envia Fatores de risco e estilo de vida

      console.log("Enviando ulceraRiskLifestyleData com os seguintes dados:");
      // console.log({
      //   "long_periods_posture": ulceraRiskLifestyleData.long_periods_posture,
      //   "leg_foot_trauma": ulceraRiskLifestyleData.leg_foot_trauma,
      //   "smoking": ulceraRiskLifestyleData.smoking,
      //   "physical_activity": ulceraRiskLifestyleData.physical_activity,
      // });

      const ulceraRiskLifestyleResponse = await api.post(
        `/patients/${patientId}/forms/lifestyle-risk/`,
        {
          "long_periods_posture": ulceraRiskLifestyleData.long_periods_posture,
        "leg_foot_trauma": ulceraRiskLifestyleData.leg_foot_trauma,
        "smoking": ulceraRiskLifestyleData.smoking,
        "physical_activity": ulceraRiskLifestyleData.physical_activity,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraRiskLifestyleData enviado com sucesso:", ulceraRiskLifestyleResponse.data);

      setUlceraRiskLifestyleData({});

      // //------

      // // 3. Envia Historico familiar

      console.log("Enviando ulceraFamilyHistoryData com os seguintes dados:");
      // console.log({
      //   "family_leg_ulcers": ulceraFamilyHistoryData.family_leg_ulcers,
      //   "family_varicose_or_circulatory": ulceraFamilyHistoryData.family_varicose_or_circulatory
      // });

      const ulceraFamilyHistoryResponse = await api.post(
        `/patients/${patientId}/forms/family-vascular-history/`,
        {
          "family_leg_ulcers": ulceraFamilyHistoryData.family_leg_ulcers,
          "family_varicose_or_circulatory": ulceraFamilyHistoryData.family_varicose_or_circulatory
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraFamilyHistoryData enviado com sucesso:", ulceraFamilyHistoryResponse.data);

      setUlceraFamilyHistoryData({});

      // //------

      // // 4. Envia Informações sobre a ulcera atual

      console.log("Enviando ulceraUlcerInfoData com os seguintes dados:");
      // console.log({
      //   "how_long": ulceraUlcerInfoData.how_long,
      //   "treated_elsewhere": ulceraUlcerInfoData.treated_elsewhere,
      //   "used_antibiotics": ulceraUlcerInfoData.used_antibiotics,
      // });

      const ulceraUlcerInfoResponse = await api.post(
        `/patients/${patientId}/forms/current-ulcer-info/`,
        {
          "how_long": ulceraUlcerInfoData.how_long,
          "treated_elsewhere": ulceraUlcerInfoData.treated_elsewhere,
          "used_antibiotics": ulceraUlcerInfoData.used_antibiotics,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraUlcerInfoData enviado com sucesso:", ulceraUlcerInfoResponse.data);

      setUlceraUlcerInfoData({});

      //------

      // 5. Envia Acesso a cuidados e suporte

      console.log("Enviando ulceraCareSupportData com os seguintes dados:");
      // console.log({
      //   "has_dressings_available": ulceraCareSupportData.has_dressings_available,
      //   "has_help_at_home": ulceraCareSupportData.has_help_at_home
      // });

      const ulceraCareSupportResponse = await api.post(
        `/patients/${patientId}/forms/care-access-support/`,
        {
          "has_dressings_available": ulceraCareSupportData.has_dressings_available,
          "has_help_at_home": ulceraCareSupportData.has_help_at_home
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("ulceraCareSupportData enviado com sucesso:", ulceraCareSupportResponse.data);

      setUlceraCareSupportData({});

      

      router.push("/(app)/(patient)/register-lesao/ulcera/anamnesis/success")
     

    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('STATUS:', error.response?.status);
        console.log('HEADERS:', error.response?.headers);
        console.log('DATA:', JSON.stringify(error.response?.data, null, 2));
      } 
    }
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
