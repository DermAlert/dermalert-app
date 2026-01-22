import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { Loading } from "@/components/Loading";
import { TitleText } from "@/components/TitleText";
import { FormPatientEditNameData } from "@/types/forms";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function ProfissionalEditName() {
  const [step1, setStep1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPatientEditNameData>()


  const onSubmit = (data: FormPatientEditNameData): void => {
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
      <Header title="Atualizar nome" onPress={() => router.push('/(app)/(profissional)/profissionalDetails/[id]')} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

        <TitleText title="Nome do profissional" description="Informe o nome do profissional" />

        <View>
          <Label text="Nome completo" />

          <Input 
            ref={inputFocus} 
            error={errors.name?.message}
            formProps={{
              control,
              name: "name",
              rules: {
                required: "O nome é obrigatório."
              }
            }}
            inputProps={{
              placeholder: "Informe o nome",
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

          <TitleText title="Nome do profissional atualizado!" description="O nome do profissional foi atualizado com sucesso." />


          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push('/(app)/(profissional)/profissionalDetails/[id]')} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
