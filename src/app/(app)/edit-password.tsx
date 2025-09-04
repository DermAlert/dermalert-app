import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { TitleText } from "@/components/TitleText";
import { FormUserEditPassData } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'phosphor-react-native';
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
        <View className="p-8 w-full justify-start flex-1 gap-8">

          <TitleText title="Senha atual" description="Informe sua senha atual" />


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
            }}
            password 
          />

          <Button title="Criar nova senha" iconRight icon={(<ArrowRightIcon size={20} color="white" weight="bold" />)} onPress={handleValidateStep1} />

        </View>
      )}

      {step2 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

          <TitleText title="Nova senha" description="Crie uma senha que siga os padrões indicados abaixo para maior segurança." />

          <View>

            <Label text="Nova senha" />

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

            <Label text="Confirma nova senha" style={{ marginTop: 32 }} />

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

          </View>

          
          <View>
            <Text className="text-sm mb-2 font-medium text-neutral-600 mt-4">A senha deve conter:</Text>

            <View className="flex-row gap-2 items-center mb-2">
              <CheckIcon size={18} color="#D4D6DF" />
              <Text className="text-sm text-neutral-600">Mínimo de 8 caracteres</Text>
            </View>
            <View className="flex-row gap-2 items-center mb-2">
              <CheckIcon size={18} color="#D4D6DF" />
              <Text className="text-sm text-neutral-600">Pelo menos 1 letra maiúscula</Text>
            </View>
            <View className="flex-row gap-2 items-center mb-2">
              <CheckIcon size={18} color="#D4D6DF" />
              <Text className="text-sm text-neutral-600">Pelo menos 1 número</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <CheckIcon size={18} color="#D4D6DF" />
              <Text className="text-sm text-neutral-600">Pelo menos 1 caractere especial (@, #, $, etc.)</Text>
            </View>
          </View>
          

          <Button title="Salvar" onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {step3 && (
        <View className="p-8 w-full justify-start flex-1 gap-10">

          <Icon iconName="CheckCircleIcon" />

          <TitleText title="Senha criada com sucesso" description="Sua nova senha foi criada com sucesso."/>

          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push('/(app)/meus-dados')} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
