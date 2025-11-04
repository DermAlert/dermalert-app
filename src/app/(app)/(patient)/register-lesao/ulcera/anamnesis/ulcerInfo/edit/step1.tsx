import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraUlcerInfoForm } from "@/hooks/Ulcera/useUlceraUlcerInfoForm";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraUlcerInfoProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraUlcerInfoStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  const { ulceraUlcerInfoData, setUlceraUlcerInfoData, updateUlceraUlcerInfoData } = useUlceraUlcerInfoForm();

  const { patientId } = usePatientId();
  

  // formulario
  const { control, handleSubmit, reset } = useForm<UlceraUlcerInfoProps>(
    {
      defaultValues: {
        how_long: ""
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "how_long" });

  const loadUlcerInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/patients/${patientId}/forms/current-ulcer-info/`);
      setUlceraUlcerInfoData(prev => {
        return prev?.how_long ? prev : data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [patientId, setUlceraUlcerInfoData]);

  useEffect(() => {
    if (ulceraUlcerInfoData?.how_long) {
      reset({
        how_long: ulceraUlcerInfoData.how_long
      });
    }
  }, [ulceraUlcerInfoData, reset]);

  useEffect(() => {
    loadUlcerInfo();
  }, [loadUlcerInfo]);


  const handleNext = (data: UlceraUlcerInfoProps) => {
    if (data.how_long && data.how_long.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraUlcerInfoData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step2')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraUlcerInfoData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/ulcerInfo');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraUlcerInfoData)
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleCancel()
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Informações sobre a úlcera atual" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={4} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">Há quanto tempo o paciente está com a ferida?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Menos de 1 mês" value="lt_1_month" checked={value === 'lt_1_month'} onPress={() => {
                const newValue = "lt_1_month";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraUlcerInfoData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step2')
              }} />
              <RadioButton label="1 a 3 meses" value="1_3_months" checked={value === '1_3_months'} onPress={() => {
                const newValue = "1_3_months";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraUlcerInfoData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step2')
              }} />
              <RadioButton label="3 a 6 meses" value="3_6_months" checked={value === '3_6_months'} onPress={() => {
                const newValue = "3_6_months";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraUlcerInfoData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step2')
              }} />
              <RadioButton label="Mais de 6 meses" value="gt_6_months" checked={value === 'gt_6_months'} onPress={() => {
                const newValue = "gt_6_months";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraUlcerInfoData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step2')
              }} />
            </View>
          )}
          name="how_long"
        /> 

      </ScrollView>

      <View className="px-8 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />}
          style={{ marginTop: 24 }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
