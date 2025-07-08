import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { formatDate } from "@/utils/formatDate";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep3() {
  const [modalAlert, setModalAlert] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>();
  const { updatePatientData, setPatientData } = usePatientForm();

  const handleNext = (data: PatientProps) => {
    const formattedData = formatDate(data.date_of_birth ?? "");
    const dateData = { date_of_birth: formattedData }
    console.log(dateData);
    updatePatientData(dateData);
    router.push('/(app)/register-patient/step4');
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

        <ProgressBar step={3} totalSteps={9} />

        <Text className="text-base mb-2 text-gray-700 mt-8">Data de nascimento</Text>

        <Text className="text-base text-gray-500 mb-2">Informe a data de nascimento do paciente.</Text>

        <Input 
          ref={inputFocus} 
          error={errors.date_of_birth?.message}
          formProps={{ 
            name: 'date_of_birth', 
            control, 
            rules: { 
              required: "Data de nascimento é obrigatória.",
              pattern: {
                value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
                message: "Data de nascimento inválido."
              }
            } 
          }}
          inputProps={{
            placeholder: "dd/mm/aaaa",
            returnKeyType: "next",
          }}
        />

      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/step2")} 
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
