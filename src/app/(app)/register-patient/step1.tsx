import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep1() {
  const [modalAlert, setModalAlert] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>();
  const { updatePatientData, patientData, setPatientData } = usePatientForm();

  const handleNext = (data: PatientProps) => {
    console.log(data);
    updatePatientData(data);
    router.push('/(app)/register-patient/step2');
  }

  const handleCancel = () => {
    setPatientData({});
    setModalAlert(!modalAlert);
    router.push('/(app)/home');
  }

  const inputFocus = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputFocus.current?.focus();
    }, 300);
  
    return () => clearTimeout(timeout);
  }, []);

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

        <ProgressBar step={1} totalSteps={9} />

        <Text className="text-base mb-2 text-gray-700 mt-8">Nome completo</Text>

        <Text className="text-base text-gray-500 mb-2">Informe o nome completo do paciente.</Text>

        <Input 
          ref={inputFocus} 
          error={errors.name?.message}
          formProps={{ 
            name: 'name', 
            control, 
            rules: { required: 'O nome é obrigatório.' } 
          }}
          inputProps={{
            placeholder: "Informe o nome completo do paciente.",
            returnKeyType: "next"
          }}
        />

      </View>

      <View className="px-6 w-full justify-start mb-4">
        <Button title="Próximo" iconRight icon={(<AntDesign name="arrowright" size={14} color="white" />)} style={{ marginTop: 24 }} onPress={handleSubmit(handleNext)} />
      </View>

    </Animated.View>
  );
}
