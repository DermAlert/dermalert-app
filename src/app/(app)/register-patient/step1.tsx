import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

export default function RegisterPatientStep1() {
  const [modalAlert, setModalAlert] = useState(false);
  const { updatePatientData, patientData, setPatientData, setImages } = usePatientForm();

  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>(
    {
      defaultValues: {
        user: {
          name: patientData.user?.name || '',
        }
      }
    }
  );
  
  const handleNext = (data: PatientProps) => {
    console.log(data);
    updatePatientData(data);
    router.push('/(app)/register-patient/step2');
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

  useEffect(() => {
      console.log(patientData)
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

        <ProgressBar step={1} totalSteps={9} />

        <View>
          <Label title="Nome completo" text="Informe o nome completo do paciente."  />

          <Input 
            ref={inputFocus} 
            error={errors.user?.name?.message}
            formProps={{ 
              name: 'user.name', 
              control, 
              rules: { required: 'O nome é obrigatório.' } 
            }}
            inputProps={{
              placeholder: "Nome completo",
              returnKeyType: "next"
            }}
          />
        </View>

        

      </View>

      <View className="px-8 w-full justify-start mb-4 mt-6">
        <Button title="Próximo" iconRight icon={(<ArrowRightIcon size={24} color="white" />)}  onPress={handleSubmit(handleNext)} />
      </View>

    </Animated.View>
  );
}
