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

export default function RiskProtectiveFactorsStep6() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { riskProtectiveFactorsData, setRiskProtectiveFactorsData, updateRiskProtectiveFactorsData } = useRiskProtectiveFactorsForm();


  // formulario
  const { control, handleSubmit } = useForm<RiskProtectiveFactorsProps>();
  const cancerTypeValue = useWatch({ control, name: "checkups_frequency" });


  

  const handleNext = (data: RiskProtectiveFactorsProps) => {
    if (data.checkups_frequency && data.checkups_frequency.length > 0 && notEmpty) {
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
        <ProgressBar step={6} totalSteps={8} />

        <Text className="text-base text-gray-700 my-8">Com que frequencia o paciente visita o dermatologista para check-ups?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Anualmente" value="Anualmente" checked={value === 'Anualmente'} onPress={() => {
                const newValue = "Anualmente";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ checkups_frequency: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step7')
              }} />
              <RadioButton label="A cada 6 meses" value="A cada 6 meses" checked={value === 'A cada 6 meses'} onPress={() => {
                const newValue = "A cada 6 meses";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ checkups_frequency: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step7')
              }} />
              <RadioButton label="Não visita regularmente" value="Não visita regularmente" checked={value === 'Não visita regularmente'} onPress={() => {
                const newValue = "Não visita regularmente";
                onChange(newValue);
                setNotEmpty(true);
                updateRiskProtectiveFactorsData({ checkups_frequency: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step7')
              }} />
            </View>
          )}
          name="checkups_frequency"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/riskProtectiveFactors/step5')} 
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
