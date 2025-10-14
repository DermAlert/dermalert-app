import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraRiskLifestyleForm } from "@/hooks/Ulcera/useUlceraRiskLifestyleForm";
import { UlceraRiskLifestyleProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraRiskLifestyleStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { ulceraRiskLifestyleData, setUlceraRiskLifestyleData, updateUlceraRiskLifestyleData } = useUlceraRiskLifestyleForm();


  // formulario
  const { control, handleSubmit } = useForm<UlceraRiskLifestyleProps>(
    {
      defaultValues: {
        long_periods_posture: ulceraRiskLifestyleData.long_periods_posture
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "long_periods_posture" });


  const handleNext = (data: UlceraRiskLifestyleProps) => {
    if (data.long_periods_posture && data.long_periods_posture.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraRiskLifestyleData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step2')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraRiskLifestyleData({});
    router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraRiskLifestyleData)
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
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step2')
              }} />
              <RadioButton label="Sim, sentado(a) por muitas horas" value="SITTING_LONG_HOURS" checked={value === 'SITTING_LONG_HOURS'} onPress={() => {
                const newValue = "SITTING_LONG_HOURS";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ long_periods_posture: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step2')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ long_periods_posture: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step2')
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
