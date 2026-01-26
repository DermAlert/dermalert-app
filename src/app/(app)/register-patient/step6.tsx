import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientAPI } from "@/hooks/api/usePatientAPI";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { formatCNS, isValidCNS } from "@/utils/CNS";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep6() {
  const [modalAlert, setModalAlert] = useState(false);
  const { patientData, updatePatientData, setPatientData, setImages } = usePatientForm();
  const { checkIfPatientExists } = usePatientAPI();
  

  const { control, handleSubmit, formState: { errors }, setError } = useForm<PatientProps>(
    {
      defaultValues: {
        sus_number: formatCNS(patientData.sus_number ?? '')
      }
    }
  );


  const handleNext = async (data: PatientProps) => {
    const formattedData = (data?.sus_number ?? '').replace(/\D/g, '');
    const patientExists = await checkIfPatientExists(formattedData);
    console.log(patientExists)
    if (patientExists) {
      console.log("paciente já existe");
      setError("sus_number", {
        type: "manual",
        message: "Paciente já cadastrado"
      });
    } else {
      const userData = { sus_number: formattedData };
      console.log(userData);
      updatePatientData(userData);
      router.push('/(app)/register-patient/step7');
    }
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

        <ProgressBar step={6} totalSteps={9} />

        <View className="flex-1">
          <Label title="Cartão SUS" text="Informe o número do cartão SUS do paciente." />

          <Input 
            ref={inputFocus} 
            error={errors.sus_number?.message}
            formProps={{
              control,
              name: "sus_number",
              rules: {
                required: "O campo é obrigatório.",
                validate: value =>
                  isValidCNS(value) || "Número do cartão SUS inválido.",
              }
            }}
            inputProps={{
              placeholder: "Cartão SUS do paciente",
              returnKeyType: "next",
              keyboardType: "numeric",
              maxLength: 19 // considerando espaços
            }}
            onChangeTextFormat={formatCNS}
          />
        </View>

        <View className="gap-4 w-full justify-start flex-row">
          <Button title="Voltar" 
            iconLeft 
            secondary 
            icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
            onPress={()=> router.push("/(app)/register-patient/step5")} 
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
