import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from '@/components/Input';
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BackHandler, InteractionManager, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const inputFocus = useRef<TextInput>(null);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      inputFocus.current?.focus();
  
      setTimeout(() => {
        if (inputFocus.current) {
          scrollRef.current?.scrollToFocusedInput(inputFocus.current);
        }
      }, 80);
    });
  
    return () => task.cancel();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setPatientData({});
        setImages([]);
        setModalAlert(true);
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

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

      <KeyboardAwareScrollView
        ref={scrollRef}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={0}
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between', width: '100%' }}
      >

          <View className="flex-1 px-8 justify-between w-full gap-6">

            <ProgressBar step={1} totalSteps={9} />

            <View className="flex-1">
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

            <View className=" w-full justify-start mt-6 pb-6">
              <Button title="Próximo" iconRight icon={(<ArrowRightIcon size={24} color="white" />)}  onPress={handleSubmit(handleNext)} />
            </View>
          </View>

        </KeyboardAwareScrollView>


      

      

    </Animated.View>
  );
}
