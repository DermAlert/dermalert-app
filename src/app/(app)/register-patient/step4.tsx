import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { Label } from "@/components/Label";
import ModalAlert from "@/components/ModalAlert";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

export default function RegisterPatientStep4() {
  const [modalAlert, setModalAlert] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  const { patientData, updatePatientData, setPatientData, setImages } = usePatientForm();

  const { control, handleSubmit, formState: { errors } } = useForm<PatientProps>({
    defaultValues: {
      gender: patientData.gender || '',
      other_gender: patientData.other_gender || ''
    }
  });

  const genderValue = useWatch({ control, name: "gender" });

  const measuredHeight = useSharedValue(0);
  const isOpen = useSharedValue(false);

  const animatedHeight = useDerivedValue(() =>
    withTiming(isOpen.value ? measuredHeight.value : 0, { duration: 300 })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  const handleNext = (data: PatientProps) => {
    if (data.gender && notEmpty) {
      const cleanedData: PatientProps = {
        ...data,
        gender: data.gender,
        other_gender: data.gender === 'O' ? data.other_gender : null
      };
      console.log(cleanedData);
      updatePatientData(cleanedData);
      router.push('/(app)/register-patient/step5');
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

  useEffect(() => {
    if ((genderValue ?? '').length > 0) {
      setNotEmpty(true);
    }

    isOpen.value = genderValue === 'O';
  }, [genderValue]);

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
        <ProgressBar step={4} totalSteps={9} />

        <View className="flex-1 gap-8">
          <Label text="Com qual gênero o paciente se identifica?" />

          <Controller
            control={control}
            name="gender"
            rules={{ required: "O campo é obrigatório." }}
            render={({ field: { onChange, value } }) => (
              <View className="gap-[10]">
                {['F', 'M', 'N', 'P', 'O'].map((val, idx) => (
                  <RadioButton
                    key={val}
                    label={
                      val === 'F' ? 'Feminino' :
                      val === 'M' ? 'Masculino' :
                      val === 'N' ? 'Não binário' :
                      val === 'P' ? 'Prefiro não responder' :
                      'Outro'
                    }
                    value={val}
                    checked={value === val}
                    onPress={() => {
                      onChange(val);
                      setNotEmpty(true);
                    }}
                  />
                ))}

                <Animated.View style={animatedStyle}>
                  <View
                    style={{ position: 'absolute', width: '100%' }}
                    onLayout={(e) => {
                      measuredHeight.value = e.nativeEvent.layout.height;
                    }}
                  >
                    <View className="p-4">
                      <Text className="mb-2 text-neutral-900 font-semibold">Especifique</Text>
                      <Input
                        error={errors.other_gender?.message}
                        formProps={{
                          name: 'other_gender',
                          control,
                          rules: {
                            validate: (value) => {
                              if (genderValue === 'O' && !value) {
                                return 'O campo é obrigatório.';
                              }
                              return true;
                            }
                          }
                        }}
                        inputProps={{
                          placeholder: "Ex.:",
                          returnKeyType: "next"
                        }}
                      />
                    </View>
                  </View>
                </Animated.View>
              </View>
            )}
          />
        </View>

        <View className="gap-4 w-full justify-start flex-row">
          <Button
            title="Voltar"
            iconLeft
            secondary
            icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}  
            onPress={() => router.push("/(app)/register-patient/step3")}
            style={{ flexGrow: 1, width: '47%' }}
          />
          <Button
            title="Próximo"
            iconRight
            icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />}
            style={{ flexGrow: 1, width: '47%' }}
            onPress={handleSubmit(handleNext)}
            activeOpacity={notEmpty ? 0.2 : 1}
            disabled={notEmpty}
          />
        </View>

      </View>

      
    </Animated.View>
  );
}
