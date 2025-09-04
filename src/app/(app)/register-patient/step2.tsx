import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { formatCPF, isValidCPF } from "@/utils/formatCPF";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep2() {
  const [modalAlert, setModalAlert] = useState(false);
  const { patientData, updatePatientData, setPatientData, setImages } = usePatientForm();

  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>(
    {
      defaultValues: {
        user: {
          cpf: formatCPF(patientData.user?.cpf || ''),
        }
      }
    }
  );

  const handleNext = (data: PatientProps) => {
    const formattedData = (data.user?.cpf ?? '').replace(/\D/g, '');
    const userData = { user: { cpf: formattedData } };
    console.log(userData);
    updatePatientData(userData);
    router.push('/(app)/register-patient/step3');
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

        <ProgressBar step={2} totalSteps={9} />

        <View className="flex-1">
          <Label title="CPF" text="Informe o CPF do paciente."  />

          <Input 
            error={errors.user?.cpf?.message}
            ref={inputFocus} 
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
              placeholder: "CPF do paciente",
              returnKeyType: "next",
              maxLength: 14,
              keyboardType: "numeric"
            }}
            onChangeTextFormat={formatCPF}
          />
        </View>

        <View className="gap-4 w-full justify-start flex-row">
          <Button title="Voltar" 
            iconLeft 
            secondary 
            icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
            onPress={()=> router.push("/(app)/register-patient/step1")} 
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
