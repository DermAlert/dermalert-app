import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { formatCNS, isValidCNS } from "@/utils/CNS";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep6() {
  const [modalAlert, setModalAlert] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>();
  const { updatePatientData, setPatientData } = usePatientForm();


  const handleNext = (data: PatientProps) => {
    console.log(data);
    updatePatientData(data);
    router.push('/(app)/register-patient/step7');
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

        <ProgressBar step={6} totalSteps={9} />

        <Text className="text-base mb-2 text-gray-700 mt-8">Cartão SUS</Text>

        <Text className="text-base text-gray-500 mb-2">Informe o número do cartão SUS do paciente.</Text>

        <Input 
          ref={inputFocus} 
          error={errors.sus_number?.message}
          formProps={{
            control,
            name: "sus_number",
            rules: {
              required: "O campo é obrigatório.",
              validate: value => {
                const cleaned = value.replace(/\D/g, '');
                if (cleaned.length !== 15) return "O CNS deve conter 15 dígitos.";
                if (!isValidCNS(cleaned)) return "Número do cartão SUS inválido.";
                return true;
              }
            }
          }}
          inputProps={{
            placeholder: "Cartão SUS do paciente",
            returnKeyType: "next",
            keyboardType: "numeric",
            maxLength: 19 // considerando espaços
          }}
          onChangeTextFormat={formatCNS}
        />
      
      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/step5")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Próximo" 
          iconRight 
          icon={(<AntDesign name="arrowright" size={14} color="white" />)} 
          onPress={handleSubmit(handleNext)} 
          style={{ flexGrow: 1, width: '47%' }}
        />
      </View>

    </Animated.View>
  );
}
