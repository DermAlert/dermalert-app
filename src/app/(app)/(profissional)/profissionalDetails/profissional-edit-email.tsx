import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import { Loading } from "@/components/Loading";
import { TitleText } from "@/components/TitleText";
import { FormPatientEditEmailData } from "@/types/forms";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

export default function ProfissionalEditEmail() {
  const [step1, setStep1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPatientEditEmailData>()

  const onSubmit = async (data: FormPatientEditEmailData): Promise<void> => {
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
      <Header title="Alterar email" onPress={() => router.push('/(app)/(profissional)/profissionalDetails/[id]')} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

          <TitleText title="Endereço de e-mail do profissional" description="Ao informar os dados de contato, o profissional concorda que poderá ser contatado a partir deles para receber informações sobre a pesquisa." />

          <View>
            <Label title="E-mail para retorno" text="Endereço de e-mail para contatar o profissional" />

            <Input 
              ref={inputFocus} 
              error={errors.user?.email?.message}
              formProps={{
                control,
                name: "user.email",
                rules: {
                  required: "O e-mail é obrigatório.",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "E-mail inválido."
                  }
                }
              }}
              inputProps={{
                placeholder: "Informe o e-mail do profissional",
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

          <TitleText title="E-mail para retorno atualizado!" description="O endereço de e-mail informado pelo profissional foi atualizado com sucesso." />


          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push('/(app)/(profissional)/profissionalDetails/[id]')} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
