import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { formatCPF } from "@/utils/formatCPF";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep2() {
  const [modalAlert, setModalAlert] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>();
  const { updatePatientData, setPatientData } = usePatientForm();

  const handleNext = (data: PatientProps) => {
    console.log(data);
    updatePatientData(data);
    router.push('/(app)/register-patient/step3');
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

        <ProgressBar step={2} totalSteps={9} />

        <Text className="text-base mb-2 text-gray-700 mt-8">CPF</Text>

        <Text className="text-base text-gray-500 mb-2">Informe o CPF do paciente.</Text>

        <Input 
          error={errors.cpf?.message}
          formProps={{
            control,
            name: "cpf",
            rules: {
              required: "O CPF é obrigatório.",
              pattern: {
                value: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/,
                message: "CPF inválido."
              }
            }
          }}
          inputProps={{
            placeholder: "Informe o CPF do paciente.",
            returnKeyType: "next",
            maxLength: 14,
            keyboardType: "numeric"
          }}
          onChangeTextFormat={formatCPF}
        />
    

      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/step1")} 
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
