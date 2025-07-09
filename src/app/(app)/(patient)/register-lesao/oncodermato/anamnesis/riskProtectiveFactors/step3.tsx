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

export default function RiskProtectiveFactorsStep3() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData, updateRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();


  // formulario
  const { control, handleSubmit } = useForm<RiskProtectiveFactorsProps>();
  const cancerTypeValue = useWatch({ control, name: "uv_protection" });


  

  const handleNext = (data: RiskProtectiveFactorsProps) => {
    if (data.uv_protection && data.uv_protection.length > 0 && notEmpty) {
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
        <ProgressBar step={3} totalSteps={8} />

        <Text className="text-base text-gray-700 my-8">O paciente usa protetor solar regularmente? Se sim, qual FPS?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Não usa" value="Não usa" checked={value === 'Não usa'} onPress={() => {
                const newValue = "Não usa";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 15" value="FPS 15" checked={value === 'FPS 15'} onPress={() => {
                const newValue = "FPS 15";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 30" value="FPS 30" checked={value === 'FPS 30'} onPress={() => {
                const newValue = "FPS 30";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 50" value="FPS 50" checked={value === 'FPS 50'} onPress={() => {
                const newValue = "FPS 50";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 70" value="FPS 70" checked={value === 'FPS 70'} onPress={() => {
                const newValue = "FPS 70";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 100 ou mais" value="FPS 100 ou mais" checked={value === 'FPS 100 ou mais'} onPress={() => {
                const newValue = "FPS 100 ou mais";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
            </View>
          )}
          name="uv_protection"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')} 
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
