import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { formatDate, formatDateInput, formatDateToBr } from "@/utils/formatDate";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep3() {
  const [modalAlert, setModalAlert] = useState(false);
  const { patientData, updatePatientData, setPatientData, setImages } = usePatientForm();
  
  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>(
    {
      defaultValues: {
        date_of_birth: formatDateToBr(patientData.date_of_birth || ''),
      }
    }
  );

  const handleNext = (data: PatientProps) => {
    const formattedData = formatDate(data.date_of_birth ?? "");
    const dateData = { date_of_birth: formattedData }
    console.log(dateData);
    updatePatientData(dateData);
    router.push('/(app)/register-patient/step4');
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

        <ProgressBar step={3} totalSteps={9} />

        <View className="flex-1">
          <Label title="Data de nascimento" text="Informe a data de nascimento do paciente." />

          <Input 
            ref={inputFocus} 
            error={errors.date_of_birth?.message}
            formProps={{ 
              name: 'date_of_birth', 
              control, 
              rules: { 
                required: "Data de nascimento é obrigatória.",
                pattern: {
                  value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                  message: "Data de nascimento inválido."
                }
              } 
            }}
            inputProps={{
              placeholder: "dd/mm/aaaa",
              returnKeyType: "next",
            }}onChangeTextFormat={formatDateInput}
          />
        </View>

        
        <View className="gap-4 w-full justify-start flex-row">
          <Button title="Voltar" 
            iconLeft 
            secondary 
            icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}  
            onPress={()=> router.push("/(app)/register-patient/step2")} 
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
