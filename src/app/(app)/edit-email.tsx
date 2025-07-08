import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { FormUserEditEmailData } from "@/types/forms";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function EditEmail() {
  const [step1, setStep1] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUserEditEmailData>()

  const onSubmit = (data: FormUserEditEmailData): void => {
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
      <Header title="Alterar email" onPress={() => router.push('/(app)/meus-dados')} />

      {step1 && (
        <View className="px-6 w-full justify-start flex-1 mt-[70]">

          <Text className="mb-4 text-2xl font-semibold">Novo endereço de e-mail</Text>

          <Text className="text-base text-gray-500">Informe um endereço de e-mail válido.</Text>
        
          <Text className="text-base mb-2 text-gray-700 mt-8">Novo e-mail</Text>

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
              placeholder: "Informe seu novo e-mail",
              returnKeyType: "next",
            }}
          />

          <Button title="Salvar" style={{ marginTop: 24 }} onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {!step1 && (
        <View className="px-6 w-full justify-start flex-1 mt-[70]">

          <Feather name="check-circle" size={40} color="#1E1E1E" />

          <Text className="mb-4 text-2xl font-semibold mt-8">Seu e-mail foi alterado</Text>

          <Text className="text-base text-gray-500">Seu novo endereço de e-mail foi salvo com sucesso.</Text>

          <Button title="Voltar" secondary style={{ marginTop: 32, width: 112 }} onPress={() => router.push('/(app)/meus-dados')} />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
