import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import { useLesionType } from "@/hooks/useLesionType";
import { RiskProtectiveFactorsProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RiskProtectiveFactorsStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData, updateRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<RiskProtectiveFactorsProps>(
    {
      defaultValues: {
        sun_exposure_period: riskProtectiveFactorsData.sun_exposure_period
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "sun_exposure_period" });


  

  const handleNext = (data: RiskProtectiveFactorsProps) => {
    if (data.sun_exposure_period && data.sun_exposure_period.length > 0 && notEmpty) {
      console.log(data);
      updateRiskProtectiveFactorsData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRiskProtectiveFactorsData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(riskProtectiveFactorsData)
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

      <Header title="Fatores de Risco e Proteção" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={8} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">Com que frequência o paciente se expõe ao sol por longos períodos?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Diariamente" value="daily" checked={value === 'daily'} onPress={() => {
                const newValue = "daily";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_exposure_period: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')
              }} />
              <RadioButton label="Algumas vezes por semana" value="few_times_per_week" checked={value === 'few_times_per_week'} onPress={() => {
                const newValue = "few_times_per_week";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_exposure_period: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')
              }} />
              <RadioButton label="Ocasionalmente" value="occasionally" checked={value === 'occasionally'} onPress={() => {
                const newValue = "occasionally";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_exposure_period: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')
              }} />
              <RadioButton label="Não se expõe ao sol" value="no_exposure" checked={value === 'no_exposure'} onPress={() => {
                const newValue = "no_exposure";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_exposure_period: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')
              }} />
            </View>
          )}
          name="sun_exposure_period"
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
