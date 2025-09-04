import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { TitleText } from "@/components/TitleText";
import { FormUserEditEmailData } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
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
        <View className="p-8 w-full justify-start flex-1 gap-8">

          <TitleText title="Novo endereço de e-mail" description="Informe um endereço de e-mail válido." />

          <View>
            <Label text="Novo e-mail" />

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
          </View>
        
          

          <Button title="Salvar" onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {!step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-10">

          <Icon iconName="CheckCircleIcon" />

          <TitleText title="Seu e-mail foi alterado" description="Seu novo endereço de e-mail foi salvo com sucesso." />


          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push('/(app)/meus-dados')} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
