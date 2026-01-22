import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { Loading } from "@/components/Loading";
import { TitleText } from "@/components/TitleText";
import { FormPatientEditCPFData } from "@/types/forms";
import { formatCPF, isValidCPF } from "@/utils/formatCPF";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function ProfissionalEditCPF() {
  const [step1, setStep1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPatientEditCPFData>()


  const onSubmit = (data: FormPatientEditCPFData): void => {
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

  if(isLoading){
      return (
        <View className="flex-1 p-safe justify-center items-center">
          <Loading />
        </View>
      )
    }

  return (
    <Animated.View 
      entering={SlideInDown} 
      exiting={SlideOutDown} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <Header title="Editar cartão SUS" onPress={() => router.push('/(app)/(profissional)/profissionalDetails/[id]')} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

        <TitleText title="CPF do profissional" description="Informe o CPF do profissional" />

        <View>
          <Label text="CPF" />

          <Input 
            ref={inputFocus} 
            error={errors.cpf?.message}
            formProps={{
              control,
              name: "cpf",
              rules: {
                required: "O CPF é obrigatório.",
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: "CPF inválido."
                },
                validate: value => isValidCPF(value) || "CPF inválido.",
              }
            }}
            inputProps={{
              placeholder: "Informe o CPF do profissional",
              returnKeyType: "next",
            }}
            onChangeTextFormat={formatCPF}
          />
        </View>

          

          <Button title="Salvar" onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {!step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-10">

          <Icon iconName="CheckCircleIcon" />

          <TitleText title="CPF do profissional atualizado!" description="O CPF do profissional foi atualizado com sucesso." />


          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push('/(app)/(profissional)/profissionalDetails/[id]')} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
