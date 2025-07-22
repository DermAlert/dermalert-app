import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { FormUserEditPassData } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function EditPassword() {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const {
      control,
      handleSubmit,
      reset,
      getValues, 
      trigger,
      formState: { errors },
    } = useForm<FormUserEditPassData>()

  function validatePasswordConfirmation(passwordConfirmation: string) {
    const { newPassword } = getValues();
    return newPassword === passwordConfirmation || 'As senhas devem ser iguais';
  };

  const inputFocus = useRef<TextInput>(null);
  const confirmPass = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputFocus.current?.focus();
    }, 300);
  
    return () => clearTimeout(timeout);
  }, []);

  const handleValidateStep1 = async () => {
    const isValid = await trigger('actualPassword');
    if (isValid) {
      handleStep2();
    }
  };

  const handleStep2 = ()=> {
    setStep1(false)
    setStep2(true)
    setStep3(false)
  }

  const handleStep3 = ()=> {
    setStep1(false)
    setStep2(false)
    setStep3(true)
  }

  const onSubmit = (data: FormUserEditPassData): void => {
    console.log(data);
    reset();
    handleStep3()
  };

  return (
    <Animated.View 
      entering={SlideInDown} 
      exiting={SlideOutDown} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <Header title="Alterar senha" onPress={() => router.push('/(app)/meus-dados')} />

      {step1 && (
        <View className="px-6 w-full justify-start flex-1 mt-[70]">

          <Text className="mb-4 text-2xl font-semibold">Senha atual</Text>

          <Text className="text-base text-gray-500 mb-8">Informe sua senha atual.</Text>

          <Input ref={inputFocus} 
            error={errors.actualPassword?.message}
            formProps={{
              control,
              name: "actualPassword",
              rules: {
                required: "A senha é obrigatória."
              }
            }}
            inputProps={{
              placeholder: "Senha atual",
              returnKeyType: "send",
              secureTextEntry: true,
            }}
            password 
          />

          <Button title="Criar nova senha" iconRight icon={(<AntDesign name="arrowright" size={10} color="white" />)} style={{ marginTop: 24 }} onPress={handleValidateStep1}  />

        </View>
      )}

      {step2 && (
        <View className="px-6 w-full justify-start flex-1 mt-[70]">

          <Text className="mb-4 text-2xl font-semibold">Nova senha</Text>

          <Text className="text-base text-gray-500">Crie uma senha que siga os padrões indicados abaixo para maior segurança.</Text>

          <Text className="text-base mb-2 text-gray-700 mt-8">Nova senha</Text>

          <Input 
            error={errors.newPassword?.message}
            formProps={{
              control,
              name: "newPassword",
              rules: {
                required: "Campo obrigatório.",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
                  message: "A senha deve seguir as regras abaixo.",
                }

              }
            }}
            inputProps={{
              placeholder: "Nova atual",
              returnKeyType: "next",
              onSubmitEditing: () => confirmPass.current?.focus(),
              //secureTextEntry: true,
            }}
            password
          />

          <Text className="text-base mb-2 text-gray-700 mt-8">Confirma nova senha</Text>

          <Input 
            ref={confirmPass}
            error={errors.confirmNewPassword?.message}
            formProps={{
              control,
              name: "confirmNewPassword",
              rules: {
                required: "Senha é obrigatória.",
                validate: validatePasswordConfirmation,
              }
            }}
            inputProps={{
              placeholder: "Confirma nova senha",
              returnKeyType: "send",
              //secureTextEntry: true,
            }}
            password
          />

          <Text className="text-sm mb-2 text-gray-700 mt-4">A senha deve conter:</Text>

          <View className="flex-row gap-2 items-center mb-1">
            <Feather name="check" size={13} color="#1E1E1E" />
            <Text className="text-sm text-gray-500">Mínimo de 8 caracteres</Text>
          </View>
          <View className="flex-row gap-2 items-center mb-1">
            <Feather name="check" size={13} color="#1E1E1E" />
            <Text className="text-sm text-gray-500">Pelo menos 1 letra maiúscula</Text>
          </View>
          <View className="flex-row gap-2 items-center mb-1">
            <Feather name="check" size={13} color="#1E1E1E" />
            <Text className="text-sm text-gray-500">Pelo menos 1 número</Text>
          </View>
          <View className="flex-row gap-2 items-center mb-1">
            <Feather name="check" size={13} color="#1E1E1E" />
            <Text className="text-sm text-gray-500">Pelo menos 1 caractere especial (@, #, $, etc.)</Text>
          </View>

          <Button title="Salvar" style={{ marginTop: 24 }} onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {step3 && (
        <View className="px-6 w-full justify-start flex-1 mt-[70]">

          <Feather name="check-circle" size={40} color="#1E1E1E" />

          <Text className="mb-4 text-2xl font-semibold mt-8">Senha criada com sucesso</Text>

          <Text className="text-base text-gray-500">Sua nova senha foi criada com sucesso.</Text>

          <Button title="Voltar" secondary style={{ marginTop: 32, width: 112 }} onPress={() => router.push('/(app)/meus-dados')} />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
