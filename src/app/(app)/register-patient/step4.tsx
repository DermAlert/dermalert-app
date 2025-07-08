import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';


export default function RegisterPatientStep4() {
  const [modalAlert, setModalAlert] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>();
  const { updatePatientData, setPatientData } = usePatientForm();


  const handleNext = (data: PatientProps) => {
    console.log(data);
    updatePatientData(data);
    router.push('/(app)/register-patient/step5');
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

        <ProgressBar step={4} totalSteps={9} />

        <Text className="text-base mb-8 text-gray-700 mt-8">Com qual gênero o paciente se identifica?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Feminino" value="F" checked={value === 'F'} onPress={() => onChange('F')} />
              <RadioButton label="Masculino" value="M" checked={value === 'M'} onPress={() => onChange('M')} />
              <RadioButton label="Não binário" value="N" checked={value === 'N'} onPress={() => onChange('N')} />
              <RadioButton label="Prefiro não responder" value="" checked={value === ''} onPress={() => onChange('')} />
              <RadioButton label="Outro" value="O" checked={value === 'O'} onPress={() => onChange('O')} openField fieldTitle="Especifique" fieldPlaceholder="Ex.:" />
            </View>
          )}
          name="gender"
        />  

      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/step3")} 
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
