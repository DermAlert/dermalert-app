import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";
import { TitleText } from "@/components/TitleText";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { usePatientForm } from "@/hooks/usePatientForm";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import axios from "axios";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep9() {
  const [modalAlert, setModalAlert] = useState(false);
  const [generalHealth, setGeneralHealth] = useState(false)
  const { setPatientData, patientData, setImages } = usePatientForm();
  const [isLoading, setIsLoading] = useState(false);

  const { generalHealthData, setGeneralHealthData } = useGeneralHealthForm();
  const { patientId, updatePatientId, setPatientId } = usePatientId();

  const handleSendtoServer = async () => {
    // console.log(patientData);
    // console.log(generalHealthData)

    try {
      setIsLoading(true)

      // 1. Envia patientData
      const response = await api.post(`/patients/`, patientData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log("patientData enviado com sucesso:", response.data);

      // 2. Pega o user ID da resposta
      const userId = response.data?.user?.id;

      console.log("ID do usuário retornado:", userId);

      if (!userId) {
        console.error("ID do usuário não encontrado na resposta");
        return;
      }

      if (userId){
        const formattedChronicDiseases = generalHealthData.chronic_diseases && generalHealthData.chronic_diseases.length > 0 ? generalHealthData.chronic_diseases.map((d) => ({ name: d })) : [];

        const formattedMedicines = generalHealthData.medicines && generalHealthData.medicines.length > 0 ? generalHealthData.medicines.map((d) => ({ name: d })) : [];

        const formattedAllergies = generalHealthData.allergies && generalHealthData.allergies.length > 0 ? generalHealthData.allergies.map((d) => ({ name: d })) : [];


        console.log("Enviando generalHealthData com os seguintes dados:");
        // console.log({
        //   "surgeries": generalHealthData.surgeries,
        //   "physical_activity_frequency": generalHealthData.physical_activity_frequency,
        //   "chronic_diseases": formattedChronicDiseases,
        //   "medicines": formattedMedicines,
        //   "allergies": formattedAllergies
        // });
        // console.log(`/patients/${userId}/forms/general-health/`)

        // 3. Envia generalHealthData para a rota com userId
        const generalResponse = await api.post(
          `/patients/${userId}/forms/general-health/`,
          {
            "surgeries": generalHealthData.surgeries,
            "physical_activity_frequency": generalHealthData.physical_activity_frequency,
            "chronic_diseases": formattedChronicDiseases,
            "medicines": formattedMedicines,
            "allergies": formattedAllergies
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("generalHealthData enviado com sucesso:", generalResponse.data);

        setPatientData({});
        setGeneralHealthData({});
        setImages([]);

        updatePatientId(userId.toString());

        router.push("/(app)/(patient)/patient/[id]")
      }
      

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
    setPatientData({});
    setGeneralHealthData({});
    setImages([]);
    setModalAlert(!modalAlert);
    router.push('/(app)/home');
  }

  useEffect(() => {
    if (generalHealthData) {
      const hasData = Object.keys(generalHealthData).length > 0;
      setGeneralHealth(hasData);
    }
  }, [generalHealthData]);

  // useEffect(() => {
  //   //console.log(patientData)
  //   const formattedChronicDiseases = generalHealthData.chronic_diseases && generalHealthData.chronic_diseases.length > 0 ? generalHealthData.chronic_diseases.map((d) => ({ name: d })) : [];

  //   const formattedMedicines = generalHealthData.medicines && generalHealthData.medicines.length > 0 ? generalHealthData.medicines.map((d) => ({ name: d })) : [];

  //   const formattedAllergies = generalHealthData.allergies && generalHealthData.allergies.length > 0 ? generalHealthData.allergies.map((d) => ({ name: d })) : [];
  //   console.log(formattedChronicDiseases)
  // }, []);


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
        description="Ao cancelar o cadastro do paciente, todos os dados preenchidos até aqui serão perdidos."
        title="Deseja cancelar o cadastro?"
        handleCancel={handleCancel}
        btnNoText="Não, continuar"
        btnYesText="Sim, cancelar"
      />


      <Header title="Cadastrar paciente" onPress={() => setModalAlert(!modalAlert)} />

      <View className="px-8 pb-6 w-full justify-start flex-1 gap-6">

        <ProgressBar step={9} totalSteps={9} />

        <View className="flex-1 gap-6">
          <TitleText title="Antecedentes clínicos" description="Preencha a ficha de antecedentes clínicos do paciente para concluir o cadastro." />

          <StepCard steps={4} title="Antecedentes clínicos" stepCheck={generalHealth} onPress={()=> router.push('/(app)/register-patient/general-health/step1')} />
        </View>

        
        <View className="gap-4 w-full justify-start flex-row">
          <Button title="Voltar" 
            iconLeft 
            secondary 
            icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
            onPress={()=> router.push("/(app)/register-patient/step8")} 
            style={{ flexGrow: 1, width: '47%' }}
          />
          <Button title="Concluir" 
            onPress={()=> {generalHealth && handleSendtoServer()}} 
            style={{ flexGrow: 1, width: '47%' }}
            activeOpacity={generalHealth ? 0.2 : 1}
            disabled={generalHealth}
          />
        </View>
      
      </View>

      

    </Animated.View>
  );
}
