import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useRiskProtectiveFactorsForm } from "@/hooks/Oncodermato/useRiskProtectiveFactorsForm";
import { useLesionType } from "@/hooks/useLesionType";
import { RiskProtectiveFactorsProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
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
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<RiskProtectiveFactorsProps>(
    {
      defaultValues: {
        uv_protection: riskProtectiveFactorsData.uv_protection
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "uv_protection" });


  

  const handleNext = (data: RiskProtectiveFactorsProps) => {
    if (data.uv_protection && data.uv_protection.length > 0 && notEmpty) {
      console.log(data);
      updateRiskProtectiveFactorsData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRiskProtectiveFactorsData({});
    setLesionType(null)
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

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={3} totalSteps={8} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente usa protetor solar regularmente? Se sim, qual FPS?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Não usa" value="none" checked={value === 'none'} onPress={() => {
                const newValue = "none";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 15" value="spf_15" checked={value === 'spf_15'} onPress={() => {
                const newValue = "spf_15";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 30" value="spf_30" checked={value === 'spf_30'} onPress={() => {
                const newValue = "spf_30";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 50" value="spf_50" checked={value === 'spf_50'} onPress={() => {
                const newValue = "spf_50";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 70" value="spf_70" checked={value === 'spf_70'} onPress={() => {
                const newValue = "spf_70";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ uv_protection: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step4')
              }} />
              <RadioButton label="FPS 100 ou mais" value="spf_100_plus" checked={value === 'spf_100_plus'} onPress={() => {
                const newValue = "spf_100_plus";
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

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step2')} 
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
    </Animated.View>
  );
}
