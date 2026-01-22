import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from '@/components/Input';
import { Loading } from "@/components/Loading";
import { TitleText } from "@/components/TitleText";
import { FormPatientEditSUSData } from "@/types/forms";
import { formatCNS, isValidCNS } from "@/utils/CNS";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function PatientEditSUS() {
  const [step1, setStep1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPatientEditSUSData>()


  const onSubmit = (data: FormPatientEditSUSData): void => {
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
      <Header title="Editar cartão SUS" onPress={() => router.push({pathname: '/(app)/(patient)/patientDetails/[id]', params: {id: id.toString()}})} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

        <TitleText title="Cartão SUS" description="Informe o número do cartão SUS do paciente." />

        <View>

          <Input 
            ref={inputFocus} 
            error={errors.sus?.message}
            formProps={{
              control,
              name: "sus",
              rules: {
                required: "O campo é obrigatório.",
                validate: value =>
                  isValidCNS(value) || "Número do cartão SUS inválido.",
              }
            }}
            inputProps={{
              placeholder: "Informe o cartão SUS do paciente",
              returnKeyType: "next",
            }}
            onChangeTextFormat={formatCNS}
          />
        </View>

          

          <Button title="Salvar" onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {!step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-10">

          <Icon iconName="CheckCircleIcon" />

          <TitleText title="Cartão SUS do paciente atualizado!" description="O número do cartão SUS do paciente foi atualizado com sucesso." />


          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push({pathname: '/(app)/(patient)/patientDetails/[id]', params: { id: id.toString() }})} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
