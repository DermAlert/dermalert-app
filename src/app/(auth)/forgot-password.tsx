import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { FormForgotPassData } from "@/types/forms";
import { formatCPF } from "@/utils/formatCPF";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from 'react-native';
import Animated, { SlideInUp, SlideOutDown } from 'react-native-reanimated';

export default function ForgotPasswordEmail() {
  const [step1, setStep1] = useState(true);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormForgotPassData>()

    const onSubmit = (data: FormForgotPassData): void => {
      console.log(data);
      reset();
      setStep1(false)
    };

  return (
    <Animated.View 
      entering={SlideInUp} 
      exiting={SlideOutDown} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <Header title="Esqueceu a senha?" onPress={() => router.push('/(auth)/login')} />

      {step1 && (
        <View className="p-6 w-full justify-center flex-1">

          <MaterialCommunityIcons name="email-outline" size={24} color="black" />

          <Text className="mb-4 mt-8 text-2xl font-semibold">Recuperação de senha</Text>

          <Text className="text-base text-gray-500">Informe o CPF cadastrado e enviaremos um link para recuperação de senha no endereço de e-mail vinculado.</Text>
        

          <View className="p-6 border border-gray-300 rounded-md mt-14">
          
            <Text className="text-base mb-2 text-gray-700">CPF</Text>
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
                placeholder: "Informe seu CPF",
                returnKeyType: "next",
                maxLength: 14,
                keyboardType: "numeric"
              }}
              onChangeTextFormat={formatCPF}
            />
            <Button title="Enviar" style={{ marginTop: 24 }} onPress={handleSubmit(onSubmit)} />
          </View>

        </View>
      )}

      {!step1 && (
        <View className="p-6 w-full justify-center flex-1">

        <MaterialCommunityIcons name="email-outline" size={40} color="#1E1E1E" />

        <Text className="mb-4 mt-8 text-2xl font-semibold">Verifique seu e-mail</Text>

        <Text className="text-base text-gray-500">Enviamos um link de recuperação de senha no endereço de e-mail vinculado ao CPF informado.</Text>
        
        <Button title="Fazer login" secondary style={{ marginTop: 32, width: 112 }} onPress={() => router.push('/(auth)/login')} />

        <View className="bg-[#FFF1C2] rounded-lg flex-row p-3 mt-14 gap-4">
          <AntDesign name="exclamationcircleo" size={20} color="#522504" />
          <View className="flex-1">
            <Text className="text-yellow-900 font-semibold mb-2">Não recebeu um e-mail?</Text>
            <Text className="text-yellow-700 leading-5">Verifique sua caixa de spam. Caso não tenha recebido o link, informe seu gestor.</Text>
          </View>
        </View>

      </View>
      )}

      
      
    </Animated.View>
  );
}
