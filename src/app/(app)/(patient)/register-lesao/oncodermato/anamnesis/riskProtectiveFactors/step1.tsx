import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import { RiskProtectiveFactorsProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RiskProtectiveFactorsStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData, updateRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();


  // formulario
  const { control, handleSubmit } = useForm<RiskProtectiveFactorsProps>();
  const cancerTypeValue = useWatch({ control, name: "sun_exposure_period" });


  

  const handleNext = (data: RiskProtectiveFactorsProps) => {
    if (data.sun_exposure_period && data.sun_exposure_period.length > 0 && notEmpty) {
      console.log(data);
      updateRiskProtectiveFactorsData(data);
      //router.push('/(app)/(patient)/register-lesao/Oncodermato/Anamnesis/personalFamilyHistory/step1');
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

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Fatores de Risco e Proteção" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={1} totalSteps={8} />

        <Text className="text-base text-gray-700 my-8">Com que frequência o paciente se expõe ao sol por longos períodos?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Diariamente" value="Diariamente" checked={value === 'Diariamente'} onPress={() => {
                const newValue = "Diariamente";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_exposure_period: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')
              }} />
              <RadioButton label="Algumas vezes por semana" value="Algumas vezes por semana" checked={value === 'Algumas vezes por semana'} onPress={() => {
                const newValue = "Algumas vezes por semana";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_exposure_period: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')
              }} />
              <RadioButton label="Ocasionalmente" value="Ocasionalmente" checked={value === 'Ocasionalmente'} onPress={() => {
                const newValue = "Ocasionalmente";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_exposure_period: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')
              }} />
              <RadioButton label="Não se expõe ao sol" value="Não se expõe ao sol" checked={value === 'Não se expõe ao sol'} onPress={() => {
                const newValue = "Não se expõe ao sol";
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

      <View className="px-6 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          style={{ marginTop: 24 }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
