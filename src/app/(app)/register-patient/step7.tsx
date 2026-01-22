import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';


export default function RegisterPatientStep7() {
  const [modalAlert, setModalAlert] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const { patientData, setPatientData, setImages } = usePatientForm();
  
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

        <ProgressBar step={7} totalSteps={9} />

        <View className="flex-1">
          <Text allowFontScaling={false} className="text-base mb-8 text-neutral-900">O paciente autoriza o uso dos seus dados anonimizados para fins de pesquisa?</Text>

          <CheckButton label="Autoriza" value="Autoriza" checked={autorizado} onPress={() => {
            if(autorizado) {
              setAutorizado(false);
            } else {
              setAutorizado(true)
            }                
          }} 
          />
        </View>

        <View className="gap-4 w-full justify-start flex-row">
          <Button title="Voltar" 
            iconLeft 
            secondary 
            icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
            onPress={()=> router.push("/(app)/register-patient/step6")} 
            style={{ flexGrow: 1, width: '47%' }}
          />
          <Button title="Próximo" 
            iconRight 
            icon={(<ArrowRightIcon size={24} color={`${autorizado ? 'white' : '#B3B3B3'}`} />)} 
            onPress={()=> {
              autorizado && router.push("/(app)/register-patient/step8")
            }} 
            style={{ flexGrow: 1, width: '47%' }}
            activeOpacity={autorizado ? 0.2 : 1}
            disabled={autorizado}
          />
        </View>

      </View>

      

    </Animated.View>
  );
}
