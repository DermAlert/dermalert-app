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

export default function UlceraRiskLifestyleStep4() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { ulceraRiskLifestyleData, setUlceraRiskLifestyleData, updateUlceraRiskLifestyleData } = useUlceraRiskLifestyleForm();


  // formulario
  const { control, handleSubmit } = useForm<UlceraRiskLifestyleProps>(
    {
      defaultValues: {
        physical_activity: ulceraRiskLifestyleData.physical_activity
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "physical_activity" });


  const handleNext = (data: UlceraRiskLifestyleProps) => {
    if (data.physical_activity && data.physical_activity.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraRiskLifestyleData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step5')
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

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Fatores de risco e estilo de vida" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={4} totalSteps={5} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente pratica alguma atividade física regularmente?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="YES" checked={value === 'YES'} onPress={() => {
                const newValue = "YES";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ physical_activity: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step5')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraRiskLifestyleData({ physical_activity: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step5')
              }} />
            </View>
          )}
          name="physical_activity"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/riskLifestyle/step3')} 
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
