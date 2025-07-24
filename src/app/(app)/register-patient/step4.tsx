import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

export default function RegisterPatientStep4() {
  const [modalAlert, setModalAlert] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);


  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>();
  const { updatePatientData, setPatientData } = usePatientForm();

  // animação accordion
  const measuredHeight = useSharedValue(0);
  const animatedHeight = useDerivedValue(() =>
    withTiming(
      measuredHeight.value,
      { duration: 300 }
    )
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  const handleNext = (data: PatientProps) => {

    if (data.gender && data.gender.length > 0 && notEmpty) {
      const finalGender = data.gender === 'S' ? '' : data.gender === 'outro' ? data.customGender : data.gender;

    const cleanedData: PatientProps = {
      ...data,
      gender: finalGender,
    };

    delete cleanedData.customGender;

    console.log(cleanedData);
    updatePatientData(cleanedData);
    router.push('/(app)/register-patient/step5');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setPatientData({});
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

      <View className="px-6 w-full justify-start flex-1">
        <ProgressBar step={4} totalSteps={9} />

        <Text className="text-base mb-8 text-gray-700 mt-8">Com qual gênero o paciente se identifica?</Text>

        <Controller
          control={control}
          name="gender"
          rules={{ required: "O campo é obrigatório." }}
          render={({ field: { onChange, value } }) => {
            const isYesOpen = value === 'outro';

            return (
              <View className="gap-3">
                <RadioButton label="Feminino" value="F" checked={value === 'F'} onPress={() => {
                  onChange('F');
                  setNotEmpty(true);
                  }} />
                <RadioButton label="Masculino" value="M" checked={value === 'M'} onPress={() => {
                  onChange('M');
                  setNotEmpty(true);
                  }} />
                <RadioButton label="Não binário" value="N" checked={value === 'N'} onPress={() => {
                  onChange('N');
                  setNotEmpty(true);
                  }} />
                <RadioButton label="Prefiro não responder" value="S" checked={value === 'S'} onPress={() => {
                  onChange('S');
                  setNotEmpty(true);
                  }} />
                <RadioButton
                  label="Outro"
                  value="outro"
                  checked={isYesOpen}
                  onPress={() => {
                    onChange('outro');
                    setNotEmpty(true);
                    }}
                />

                {isYesOpen && (
                  <Animated.View style={animatedStyle}>
                    <View
                      style={{ position: 'absolute', width: '100%' }}
                      onLayout={(e) => {
                        measuredHeight.value = e.nativeEvent.layout.height;
                      }}
                    >
                      <View className="mx-6 mt-3">
                        <Text className="mb-2">Especifique</Text>

                        <Input
                          error={errors.customGender?.message}
                          formProps={{
                            name: 'customGender',
                            control,
                            rules: { required: 'O campo é obrigatório.' }
                          }}
                          inputProps={{
                            placeholder: "Ex.:",
                            returnKeyType: "next"
                          }}
                        />
                      </View>
                    </View>
                  </Animated.View>
                )}
              </View>
            );
          }}
        />
      </View>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar"
          iconLeft
          secondary
          icon={<AntDesign name="arrowleft" size={14} color="#1E1E1E" />}
          onPress={() => router.push("/(app)/register-patient/step3")}
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
