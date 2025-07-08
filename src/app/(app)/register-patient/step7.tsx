import Button from "@/components/Button";
import CheckButton from "@/components/CheckButton";
import Header from "@/components/Header";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import { usePatientForm } from "@/hooks/usePatientForm";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';


export default function RegisterPatientStep7() {
  const [modalAlert, setModalAlert] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const { patientData, setPatientData } = usePatientForm();
  
  const handleCancel = () => {
    setPatientData({});
    setModalAlert(!modalAlert);
    router.push('/(app)/home');
  }

  const inputFocus = useRef<TextInput>(null);

  const { control, getValues, formState: { errors } } = useForm();

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

      

      <View className="px-6 w-full justify-start flex-1">

        <ProgressBar step={7} totalSteps={9} />

        <Text className="text-base mb-8 text-gray-700 mt-8">O paciente autoriza o uso dos seus dados anonimizados para fins de pesquisa?</Text>

        {/* <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <CheckButton label="Autoriza" value="Autoriza" checked={value === 'Autoriza'} onPress={() => {
                if(value === 'Autoriza') {
                  onChange('');
                  setAutorizado(false);
                } else {
                  onChange('Autoriza')
                  setAutorizado(true)
                }                
              }} 
              />
            </View>
          )}
          name="autorizacao"
        />  */}


          <CheckButton label="Autoriza" value="Autoriza" checked={autorizado} onPress={() => {
            if(autorizado) {
              setAutorizado(false);
            } else {
              setAutorizado(true)
            }                
          }} 
          />

      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push("/(app)/register-patient/step6")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button title="Próximo" 
          iconRight 
          icon={(<AntDesign name="arrowright" size={14} color={`${autorizado ? 'white' : '#B3B3B3'}`} />)} 
          onPress={()=> {autorizado && router.push("/(app)/register-patient/step8")}} 
          style={{ flexGrow: 1, width: '47%' }}
          activeOpacity={autorizado ? 0.2 : 1}
          disabled={autorizado}
        />
      </View>

    </Animated.View>
  );
}
