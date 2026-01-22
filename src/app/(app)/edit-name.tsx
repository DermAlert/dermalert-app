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

export default function EditName() {
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
      <Header title="Atualizar nome" onPress={() => router.push('/(app)/meus-dados')} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

          <TitleText title="Nome do paciente" description="Informe o nome do paciente" />

          <View>
            <Label text="Nome completo" />

            <Input 
              ref={inputFocus} 
              error={errors.email?.message}
              formProps={{
                control,
                name: "email",
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

          <TitleText title="Nome do paciente atualizado!" description="O nome do paciente foi atualizado com sucesso." />


          <Button title="Voltar" secondary style={{ alignSelf: "flex-start" }} full={false} onPress={() => router.push('/(app)/meus-dados')} iconLeft 
          icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
