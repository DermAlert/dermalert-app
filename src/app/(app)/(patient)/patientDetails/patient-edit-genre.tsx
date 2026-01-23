import Button from "@/components/Button";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import { Loading } from "@/components/Loading";
import RadioButton from "@/components/RadioButton";
import { TitleText } from "@/components/TitleText";
import { usePatientAPI } from "@/hooks/api/usePatientAPI";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import Animated, { SlideInDown, SlideOutDown, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

export default function PatientEditGenre() {
  const [step1, setStep1] = useState(true);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useLocalSearchParams();
  const { updatePatientData } = usePatientAPI();
  

  const { 
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ gender?: string, other_gender?: string | null }>()

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


  const onSubmit = async (data: { gender?: string, other_gender?: string | null }) => {
    if (data.gender && notEmpty) {
      const cleanedData: {gender?: string, other_gender?: string | null} = {
        ...data,
        gender: data.gender,
        other_gender: data.gender === 'O' ? data.other_gender : null
      };
      console.log(cleanedData);
      setIsLoading(true);
      await updatePatientData(cleanedData, id);
      reset();
      setStep1(false)
      setIsLoading(false)
    }
  };

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

  if(isLoading){
      return (
        <View className="flex-1 p-safe justify-center items-center">
          <Loading />
        </View>
      )
    }

  return (
    <Animated.View 
      entering={SlideInDown} 
      exiting={SlideOutDown} 
      className="flex-1 bg-white p-safe justify-start items-center"
    >
      <Header title="Editar gênero" onPress={() => router.push({pathname: '/(app)/(patient)/patientDetails/[id]', params: {id: id.toString()}})} />

      {step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-8">

        <TitleText title="Gênero do paciente" description="Infome qual gênero o paciente se identifica." />

        <View>
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
                      <Text allowFontScaling={false} className="mb-2 text-neutral-900 font-semibold">Especifique</Text>
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

          

          <Button 
            title="Salvar" onPress={handleSubmit(onSubmit)} 
            activeOpacity={notEmpty ? 0.2 : 1}
            disabled={notEmpty}
          />

        </View>
      )}

      {!step1 && (
        <View className="p-8 w-full justify-start flex-1 gap-10">

          <Icon iconName="CheckCircleIcon" />

          <TitleText title="O gênero do paciente atualizado!" description="O gênero com qual o paciente se identifica foi atualizado com sucesso." />


          <Button 
            title="Voltar" 
            secondary 
            style={{ alignSelf: "flex-start" }} 
            full={false}
            onPress={() => router.push({pathname: '/(app)/(patient)/patientDetails/[id]', params: { id: id.toString() }})} 
            iconLeft 
            icon={(<ArrowLeftIcon size={18} color="#4052A1"/>)}  
          />

        </View>
      )}

      

      
      
    </Animated.View>
  );
}
