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

export default function RiskProtectiveFactorsStep2() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData, updateRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<RiskProtectiveFactorsProps>(
    {
      defaultValues: {
        sun_burn: riskProtectiveFactorsData.sun_burn
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "sun_burn" });


  

  const handleNext = (data: RiskProtectiveFactorsProps) => {
    if (data.sun_burn && data.sun_burn.length > 0 && notEmpty) {
      console.log(data);
      updateRiskProtectiveFactorsData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step3');
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
        <ProgressBar step={2} totalSteps={8} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">Quantas vezes ao longo da vida o paciente já teve queimaduras solares graves (com formação de bolhas)?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="1-2 vezes" value="once_twice" checked={value === 'once_twice'} onPress={() => {
                const newValue = "once_twice";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_burn: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step3')
              }} />
              <RadioButton label="3-5 vezes" value="three_to_five" checked={value === 'three_to_five'} onPress={() => {
                const newValue = "three_to_five";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_burn: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step3')
              }} />
              <RadioButton label="Mais de 5 vezes" value="more_than_five" checked={value === 'more_than_five'} onPress={() => {
                const newValue = "more_than_five";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_burn: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step3')
              }} />
              <RadioButton label="Nunca teve" value="never" checked={value === 'never'} onPress={() => {
                const newValue = "never";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ sun_burn: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step3')
              }} />
            </View>
          )}
          name="sun_burn"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step1')} 
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
