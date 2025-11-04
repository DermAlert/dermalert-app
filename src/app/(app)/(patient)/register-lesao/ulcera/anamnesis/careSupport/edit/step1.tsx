import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraCareSupportForm } from "@/hooks/Ulcera/useUlceraCareSupportForm";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraCareSupportProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraCareSupportEditStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { ulceraCareSupportData, setUlceraCareSupportData, updateUlceraCareSupportData } = useUlceraCareSupportForm();

  const { patientId } = usePatientId();

  // formulario
  const { control, handleSubmit, reset } = useForm<UlceraCareSupportProps>(
    {
      defaultValues: {
        has_dressings_available: ""
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "has_dressings_available" });

  const loadCareSupport = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/patients/${patientId}/forms/care-access-support/`);
      setUlceraCareSupportData(prev => {
        return prev?.has_dressings_available ? prev : data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [patientId, setUlceraCareSupportData]);

  useEffect(() => {
    if (ulceraCareSupportData?.has_dressings_available) {
      reset({
        has_dressings_available: ulceraCareSupportData.has_dressings_available
      });
    }
  }, [ulceraCareSupportData, reset]);

  useEffect(() => {
    loadCareSupport();
  }, [loadCareSupport]);


  const handleNext = (data: UlceraCareSupportProps) => {
    if (data.has_dressings_available && data.has_dressings_available.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraCareSupportData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/edit/step2')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraCareSupportData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/careSupport');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraCareSupportData)
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

      <Header title="Acesso a cuidados e suporte" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={3} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">O paciente tem curativos disponíveis em casa ou fornecidos pela UBS?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="YES" checked={value === 'YES'} onPress={() => {
                const newValue = "YES";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraCareSupportData({ has_dressings_available: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/edit/step2')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraCareSupportData({ has_dressings_available: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/edit/step2')
              }} />
            </View>
          )}
          name="has_dressings_available"
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
