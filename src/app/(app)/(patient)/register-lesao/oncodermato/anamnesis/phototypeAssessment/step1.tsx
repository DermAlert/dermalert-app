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

export default function PhototypeAssessmentStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();


  // formulario
  const { control, handleSubmit } = useForm<PhototypeAssessmentProps>();
  const cancerTypeValue = useWatch({ control, name: "skin_color" });


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.skin_color && data.skin_color.length > 0 && notEmpty) {
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
        <ProgressBar step={1} totalSteps={8} />

        <Text className="text-base text-gray-700 my-8">Qual é a cor natural da pele do paciente (áreas não expostas ao sol)?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Branca leitosa" value="Branca leitosa" checked={value === 'Branca leitosa'} onPress={() => {
                const newValue = "Branca leitosa";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step2')
              }} />
              <RadioButton label="Branca" value="Branca" checked={value === 'Branca'} onPress={() => {
                const newValue = "Branca";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step2')
              }} />
              <RadioButton label="Branca a bege, com base dourada" value="Branca a bege, com base dourada" checked={value === 'Branca a bege, com base dourada'} onPress={() => {
                const newValue = "Branca a bege, com base dourada";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step2')
              }} />
              <RadioButton label="Bege" value="Bege" checked={value === 'Bege'} onPress={() => {
                const newValue = "Bege";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step2')
              }} />
              <RadioButton label="Castanha clara" value="Castanha clara" checked={value === 'Castanha clara'} onPress={() => {
                const newValue = "Castanha clara";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step2')
              }} />
              <RadioButton label="Castanha escura" value="Castanha escura" checked={value === 'Castanha escura'} onPress={() => {
                const newValue = "Castanha escura";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step2')
              }} />
              <RadioButton label="Negra" value="Negra" checked={value === 'Negra'} onPress={() => {
                const newValue = "Negra";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step2')
              }} />
            </View>
          )}
          name="skin_color"
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
