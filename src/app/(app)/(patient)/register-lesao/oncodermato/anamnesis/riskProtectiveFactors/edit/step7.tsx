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

export default function RiskProtectiveFactorsEditStep7() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData, updateRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();
  const { setLesionType } = useLesionType();


  // formulario
  const { control, handleSubmit } = useForm<RiskProtectiveFactorsProps>(
    {
      defaultValues: {
        cancer_campaigns: riskProtectiveFactorsData.cancer_campaigns
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "cancer_campaigns" });


  

  const handleNext = (data: RiskProtectiveFactorsProps) => {
    if (data.cancer_campaigns !== undefined && notEmpty) {
      console.log(data);
      updateRiskProtectiveFactorsData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/edit/step8');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRiskProtectiveFactorsData({});
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/phototypeAssessment');  
  }

  useEffect(() => {
    const current = cancerTypeValue;

    setNotEmpty(current !== undefined);
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
        <ProgressBar step={7} totalSteps={8} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente já participou de campanhas de prevenção contra o câncer de pele?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="true" checked={value === true} onPress={() => {
                const newValue = true;
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ cancer_campaigns: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/edit/step8')
              }} />
              <RadioButton label="Não" value="false" checked={value === false} onPress={() => {
                const newValue = false;
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ cancer_campaigns: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/edit/step8')
              }} />
            </View>
          )}
          name="cancer_campaigns"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/edit/step6')} 
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
