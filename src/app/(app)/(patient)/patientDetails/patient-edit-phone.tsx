import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { Loading } from "@/components/Loading";
import { TitleText } from "@/components/TitleText";
import { usePatientAPI } from "@/hooks/api/usePatientAPI";
import { formatPhone } from "@/utils/formatPhone";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function PatientEditPhone() {
  const [step1, setStep1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();
  const { updatePatientData } = usePatientAPI();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{phone_number?: string;}>()


  const onSubmit = async (data: {phone_number?: string;}) => {
      setIsLoading(true);
      await updatePatientData(data, id);
      reset();
      setStep1(false)
      setIsLoading(false)
    }

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
      <Header title="Alterar telefone" onPress={() => router.push({pathname: '/(app)/(patient)/patientDetails/[id]', params: {id: id.toString()}})} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

          <TitleText title="Telefone de contato do paciente" description="Ao informar os dados de contato, o paciente concorda que poderá ser contatado a partir deles para receber informações sobre a pesquisa." />

          <View>
            <Label text="Telefone de contato" />          

            <Input 
              error={errors.phone_number?.message}
              formProps={{
                control,
                name: "phone_number",
                rules: {
                  required: "O telefone é obrigatório.",
                  pattern: {
                    //value: /^(\(\d{2}\)\s?|\d{2})(\s?|\d{1})(\d{4,5})-(\d{4})$/,
                    value: /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
                    message: "Telefone inválido."
                  }
                }
              }}
              inputProps={{
                placeholder: "Informe o telefone do paciente",
                returnKeyType: "next",
                keyboardType: "numeric",
                maxLength: 15
              }}
              onChangeTextFormat={formatPhone}
              
            />
          </View>

          

          <Button title="Salvar" onPress={handleSubmit(onSubmit)} />

        </View>
      )}

      {!step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-10">

          <Icon iconName="CheckCircleIcon" />

          <TitleText title="Telefone de contato atualizado!" description="O telefone de contato informado pelo paciente foi atualizado com sucesso." />


          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push({pathname: '/(app)/(patient)/patientDetails/[id]', params: { id: id.toString() }})} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
