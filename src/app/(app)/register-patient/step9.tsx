import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { usePatientForm } from "@/hooks/usePatientForm";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep9() {
  const [modalAlert, setModalAlert] = useState(false);
  const [modalAddImage, setModalAddImage] = useState(false);
  const [generalHealth, setGeneralHealth] = useState(false)
  const { setPatientData, patientData } = usePatientForm();

  const { generalHealthData, setGeneralHealthData } = useGeneralHealthForm();
  
  const handleCancel = () => {
    setPatientData({});
    setGeneralHealthData({});
    setModalAlert(!modalAlert);
    router.push('/(app)/home');
  }

  useEffect(() => {
    if (generalHealthData) {
      const hasData = Object.keys(generalHealthData).length > 0;
      setGeneralHealth(hasData);
    }
  }, [generalHealthData]);

  useEffect(() => {
    console.log(patientData)
  }, []);

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

      <View className="px-6 w-full justify-start flex-1">

        <ProgressBar step={9} totalSteps={9} />

        <Text className="text-2xl font-semibold mt-6">Antecedentes clínicos</Text>

        <Text className="text-base text-gray-500 mt-4 mb-8">Preencha a ficha de antecedentes clínicos do paciente para concluir o cadastro.</Text>

        <StepCard steps={4} title="Antecedentes clínicos" stepCheck={generalHealth} onPress={()=> router.push('/(app)/register-patient/general-health/step1')} />
        
      
      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/step8")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Concluir" 
          onPress={()=> {generalHealth && router.push("/(app)/(patient)/patient/[id]")}} 
          style={{ flexGrow: 1, width: '47%' }}
          activeOpacity={generalHealth ? 0.2 : 1}
          disabled={generalHealth}
        />
      </View>

    </Animated.View>
  );
}
