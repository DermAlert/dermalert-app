import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { FormPatientEditEmailData } from "@/types/forms";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function PatientEditEmail() {
  const [step1, setStep1] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPatientEditEmailData>()

  const onSubmit = (data: FormPatientEditEmailData): void => {
    console.log(data);
    reset();
    setStep1(false)
  };

  const inputFocus = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputFocus.current?.focus();
    }, 300);
  
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View 
      entering={SlideInDown} 
      exiting={SlideOutDown} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <Header title="Alterar email" onPress={() => router.push('/(app)/(patient)/patientDetails/[id]')} />

      {step1 && (
        <View className="px-6 w-full justify-start flex-1 mt-[70]">

          <Text className="mb-4 text-2xl font-semibold">Endereço de e-mail do paciente</Text>

          <Text className="text-base text-gray-500">Ao informar os dados de contato, o paciente concorda que poderá ser contatado a partir deles para receber informações sobre a pesquisa.</Text>
        
          <Text className="text-base mb-2 text-gray-700 mt-8">E-mail para retorno</Text>

          <Text className="text-base text-gray-500 mb-2">Endereço de e-mail para contatar o paciente</Text>

          <Input 
            ref={inputFocus} 
            error={errors.email?.message}
            formProps={{
              control,
              name: "email",
              rules: {
                required: "O e-mail é obrigatório.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "E-mail inválido."
                }
              }
            }}
            inputProps={{
              placeholder: "Informe o e-mail do paciente",
              returnKeyType: "next",
            }}
          />

          <Button title="Salvar" style={{ marginTop: 24 }} onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {!step1 && (
        <View className="px-6 w-full justify-start flex-1 mt-[70]">

          <Feather name="check-circle" size={40} color="#1E1E1E" />

          <Text className="mb-4 text-2xl font-semibold mt-8">E-mail para retorno atualizado!</Text>

          <Text className="text-base text-gray-500">O endereço de e-mail informado pelo paciente foi atualizado com sucesso.</Text>

          <Button title="Voltar" secondary style={{ marginTop: 32, width: 112 }} onPress={() => router.push('/(app)/(patient)/patientDetails/[id]')} />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
