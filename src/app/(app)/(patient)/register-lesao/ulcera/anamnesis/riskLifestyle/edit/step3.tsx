import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraRiskLifestyleForm } from "@/hooks/Ulcera/useUlceraRiskLifestyleForm";
import { UlceraRiskLifestyleProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraRiskLifestyleEditStep3() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { ulceraRiskLifestyleData, setUlceraRiskLifestyleData, updateUlceraRiskLifestyleData } = useUlceraRiskLifestyleForm();


  // formulario
  const { control, handleSubmit } = useForm<UlceraRiskLifestyleProps>(
    {
      defaultValues: {
        smoking: ulceraRiskLifestyleData.smoking
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "smoking" });


  const handleNext = (data: UlceraRiskLifestyleProps) => {
    if (data.smoking && data.smoking.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraRiskLifestyleData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step4')
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

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Fatores de risco e estilo de vida" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={3} totalSteps={5} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">O paciente fuma ou já fumou?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim, atualmente" value="CURRENT_SMOKER" checked={value === 'CURRENT_SMOKER'} onPress={() => {
                const newValue = "CURRENT_SMOKER";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ smoking: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step4')
              }} />
              <RadioButton label="Já fumou, mas parou" value="FORMER_SMOKER" checked={value === 'FORMER_SMOKER'} onPress={() => {
                const newValue = "FORMER_SMOKER";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ smoking: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step4')
              }} />
              <RadioButton label="Nunca fumou" value="NEVER_SMOKED" checked={value === 'NEVER_SMOKED'} onPress={() => {
                const newValue = "NEVER_SMOKED";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ smoking: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step4')
              }} />
            </View>
          )}
          name="smoking"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/edit/step2')} 
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
