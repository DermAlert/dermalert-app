import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraRiskLifestyleForm } from "@/hooks/Ulcera/useUlceraRiskLifestyleForm";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { UlceraRiskLifestyleProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraRiskLifestyleEditStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { ulceraRiskLifestyleData, setUlceraRiskLifestyleData, updateUlceraRiskLifestyleData } = useUlceraRiskLifestyleForm();

  const { patientId } = usePatientId();

  // formulario
  const { control, handleSubmit, reset } = useForm<UlceraRiskLifestyleProps>(
    {
      defaultValues: {
        long_periods_posture: ""
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "long_periods_posture" });

  const loadRiskLifestyle = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/patients/${patientId}/forms/lifestyle-risk/`);
      setUlceraRiskLifestyleData(prev => {
        return prev?.long_periods_posture ? prev : data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [patientId, setUlceraRiskLifestyleData]);

  useEffect(() => {
    if (ulceraRiskLifestyleData?.long_periods_posture) {
      reset({
        long_periods_posture: ulceraRiskLifestyleData.long_periods_posture
      });
    }
  }, [ulceraRiskLifestyleData, reset]);

  useEffect(() => {
    loadRiskLifestyle();
  }, [loadRiskLifestyle]);


  const handleNext = (data: UlceraRiskLifestyleProps) => {
    if (data.long_periods_posture && data.long_periods_posture.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraRiskLifestyleData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step2')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraRiskLifestyleData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/riskLifestyle');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraRiskLifestyleData)
  }, []);

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

      <Header title="Fatores de risco e estilo de vida" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={5} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente permanece sentado(a) ou em pé por longos períodos durante o dia?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim, em pé por muitas horas" value="STANDING_LONG_HOURS" checked={value === 'STANDING_LONG_HOURS'} onPress={() => {
                const newValue = "STANDING_LONG_HOURS";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ long_periods_posture: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step2')
              }} />
              <RadioButton label="Sim, sentado(a) por muitas horas" value="SITTING_LONG_HOURS" checked={value === 'SITTING_LONG_HOURS'} onPress={() => {
                const newValue = "SITTING_LONG_HOURS";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ long_periods_posture: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step2')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ long_periods_posture: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step2')
              }} />
            </View>
          )}
          name="long_periods_posture"
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
