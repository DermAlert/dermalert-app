import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import { PhototypeAssessmentProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PhototypeAssessmentStep3() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();


  // formulario
  const { control, handleSubmit } = useForm<PhototypeAssessmentProps>();
  const cancerTypeValue = useWatch({ control, name: "hair_color" });


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.hair_color && data.hair_color.length > 0 && notEmpty) {
      console.log(data);
      updatePhototypeAssessmentData(data);
      //router.push('/(app)/(patient)/register-lesao/Oncodermato/Anamnesis/personalFamilyHistory/step1');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setPhototypeAssessmentData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(phototypeAssessmentData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Avaliação de Fototipo" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={3} totalSteps={8} />

        <Text className="text-base text-gray-700 my-8">Qual é a cor natural do cabelo do paciente?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Ruivo, loiro claro" value="Ruivo, loiro claro" checked={value === 'Ruivo, loiro claro'} onPress={() => {
                const newValue = "Ruivo, loiro claro";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ hair_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step4')
              }} />
              <RadioButton label="Loiro, castanho claro" value="Loiro, castanho claro" checked={value === 'Loiro, castanho claro'} onPress={() => {
                const newValue = "Loiro, castanho claro";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ hair_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step4')
              }} />
              <RadioButton label="Castanho" value="Castanho" checked={value === 'Castanho'} onPress={() => {
                const newValue = "Castanho";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ hair_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step4')
              }} />
              <RadioButton label="Castanho escuro" value="Castanho escuro" checked={value === 'Castanho escuro'} onPress={() => {
                const newValue = "Castanho escuro";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ hair_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step4')
              }} />
              <RadioButton label="Preto" value="Preto" checked={value === 'Preto'} onPress={() => {
                const newValue = "Preto";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ hair_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step4')
              }} />
            </View>
          )}
          name="hair_color"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step2')} 
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
