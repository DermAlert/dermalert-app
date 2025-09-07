import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { TitleText } from "@/components/TitleText";
import { FormForgotPassData } from "@/types/forms";
import { formatCPF } from "@/utils/formatCPF";
import { router } from "expo-router";
import { WarningCircleIcon } from 'phosphor-react-native';
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
      <Header title="Esqueceu a senha?" onPress={() => router.push('/(auth)/index')} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1">

          <Icon iconName="KeyIcon" />

          <TitleText title="Recuperação de senha" description="Informe o CPF cadastrado e enviaremos um link para recuperação de senha no endereço de e-mail vinculado." className="mt-8" />
        

          <View className="mt-10">
          
            <Label title="CPF" />
            <Input 
              error={errors.cpf?.message}
              formProps={{
                control,
                name: "cpf",
                rules: {
                  required: "O CPF é obrigatório.",
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
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
            <Button title="Enviar" style={{ marginTop: 32 }} onPress={handleSubmit(onSubmit)} />
          </View>

        </View>
      )}

      {!step1 && (
        <View className="p-8 w-full justify-start flex-1">

          <Icon iconName="Envelope" />

          <TitleText title="Verifique seu e-mail" description="Enviamos um link de recuperação de senha no endereço de e-mail vinculado ao CPF informado." className="mt-8" />
          
          <Button title="Fazer login" secondary style={{ marginTop: 32, alignSelf: "flex-start"}} full={false} onPress={() => router.push('/(auth)/index')} />

          <View className="bg-warning-100 rounded-2xl flex-row p-3 mt-10 gap-2">
            <WarningCircleIcon size={24} color="#D08700" />
            <View className="flex-1">
              <Text className="text-warning-900 text-base font-semibold">Não recebeu um e-mail?</Text>
              <Text className="text-warning-700 text-sm">Verifique sua caixa de spam. Caso não tenha recebido o link, informe seu gestor.</Text>
            </View>
          </View>

        </View>
      )}

      
      
    </Animated.View>
  );
}
