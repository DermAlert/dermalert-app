import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { Loading } from "@/components/Loading";
import { TitleText } from "@/components/TitleText";
import { usePatientAPI } from "@/hooks/api/usePatientAPI";
import { formatCPF, isValidCPF } from "@/utils/formatCPF";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function PatientEditCPF() {
  const [step1, setStep1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();
  const { updatePatientData } = usePatientAPI();
  

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{user?: { cpf?: string; }}>()


  const onSubmit = async (data: {user?: { cpf?: string; }}) => {
    const formattedData = (data.user?.cpf ?? '').replace(/\D/g, '');
    const userData = { user: { cpf: formattedData } };
    //console.log(userData);
    setIsLoading(true);
    await updatePatientData(userData, id);
    reset();
    setStep1(false)
    setIsLoading(false)
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

        <TitleText title="CPF do paciente" description="Informe o CPF do paciente" />

        <View>
          <Label text="CPF" />

          <Input 
            ref={inputFocus} 
            error={errors.user?.cpf?.message}
            formProps={{
              control,
              name: "user.cpf",
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
              placeholder: "Informe o CPF do paciente",
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

          <TitleText title="CPF do paciente atualizado!" description="O CPF do paciente foi atualizado com sucesso." />


          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push({pathname: '/(app)/(patient)/patientDetails/[id]', params: { id: id.toString() }})} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
