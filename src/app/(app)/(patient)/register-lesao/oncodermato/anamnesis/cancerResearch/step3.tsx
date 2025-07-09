import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { CancerResearchProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function CancerResearchStep3() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { cancerResearchData, setCancerResearchData, updateCancerResearchData } = useCancerResearchForm();


  // formulario
  const { control, handleSubmit } = useForm<CancerResearchProps>();
  const cancerTypeValue = useWatch({ control, name: "how_long" });


  

  const handleNext = (data: CancerResearchProps) => {
    if (data.how_long && data.how_long.length > 0 && notEmpty) {
      console.log(data);
      updateCancerResearchData(data);
      //router.push('/(app)/(patient)/register-lesao/Oncodermato/Anamnesis/personalFamilyHistory/step1');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setCancerResearchData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(cancerResearchData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Investigação de CA e Lesões" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={3} totalSteps={6} />

        <Text className="text-base text-gray-700 my-8">Há quanto tempo o paciente notou essas alterações?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Menos de 1 mês" value="Menos de 1 mês" checked={value === 'Menos de 1 mês'} onPress={() => {
                const newValue = "Menos de 1 mês";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')
              }} />
              <RadioButton label="1-3 meses" value="1-3 meses" checked={value === '1-3 meses'} onPress={() => {
                const newValue = "1-3 meses";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')
              }} />
              <RadioButton label="3-6 meses" value="3-6 meses" checked={value === '3-6 meses'} onPress={() => {
                const newValue = "3-6 meses";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')
              }} />
              <RadioButton label="Mais de 6 meses" value="Mais de 6 meses" checked={value === 'Mais de 6 meses'} onPress={() => {
                const newValue = "Mais de 6 meses";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')
              }} />
            </View>
          )}
          name="how_long"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step2')} 
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
