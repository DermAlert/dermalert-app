import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { formatPhone } from "@/utils/formatPhone";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep5() {
  const [modalAlert, setModalAlert] = useState(false);
  const { patientData, updatePatientData, setPatientData, setImages } = usePatientForm();
  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>(
    {
      defaultValues: {
        phone_number: patientData.phone_number ?? '',
        user: {
          email: patientData.user?.email ?? ''
        }
      }
    }
  );


  const handleNext = (data: PatientProps) => {
    console.log(data);
    updatePatientData(data);
    router.push('/(app)/register-patient/step6');
  }
  
  const handleCancel = () => {
    setPatientData({});
    setImages([]);
    setModalAlert(!modalAlert);
    router.push('/(app)/home');
  }

  const inputFocus = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputFocus.current?.focus();
    }, 300);
  
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <ModalAlert 
        modalAlert={modalAlert} 
        setModalAlert={setModalAlert} 
        description="Ao cancelar o cadastro do paciente, todos os dados preenchidos até aqui serão perdidos."
        title="Deseja cancelar o cadastro?"
        handleCancel={handleCancel}
        btnNoText="Não, continuar"
        btnYesText="Sim, cancelar"
      />

      <Header title="Cadastrar paciente" onPress={() => setModalAlert(!modalAlert)} />

      <View className="px-8 pb-6 w-full justify-start flex-1 gap-6">

        <ProgressBar step={5} totalSteps={9} />

        <View className="flex-1 gap-8">
          <Text allowFontScaling={false} className="text-base text-neutral-700">Ao informar os dados de contato, o paciente concorda que poderá ser contatado a partir deles para receber informações sobre a pesquisa.</Text>

          <View>
            <Label title="E-mail para retorno" text="Endereço de e-mail para contatar o paciente"/>

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
                placeholder: "Endereço de e-mail",
                returnKeyType: "next",
              }}
            />
          </View>

          <View>
            <Text allowFontScaling={false} className="text-base mb-2 text-neutral-900 font-semibold">Telefone de contato <Text allowFontScaling={false} className="text-base text-neutral-700 mb-2 font-normal">(Opcional)</Text></Text>

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
                placeholder: "Telefone do paciente",
                returnKeyType: "next",
                keyboardType: "numeric",
                maxLength: 15
              }}
              onChangeTextFormat={formatPhone}
            />
          </View>
        </View>

        
        <View className="gap-4 w-full justify-start flex-row">
          <Button title="Voltar" 
            iconLeft 
            secondary 
            icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}  
            onPress={()=> router.push("/(app)/register-patient/step4")} 
            style={{ flexGrow: 1, width: '47%' }}
          />
          <Button title="Próximo" 
            iconRight 
            icon={(<ArrowRightIcon size={24} color="white" />)} 
            onPress={handleSubmit(handleNext)} 
            style={{ flexGrow: 1, width: '47%' }}
          />
        </View>
        
      
      </View>

      

    </Animated.View>
  );
}
