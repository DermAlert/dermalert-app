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

export default function PhototypeAssessmentStep2() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();


  // formulario
  const { control, handleSubmit } = useForm<PhototypeAssessmentProps>();
  const cancerTypeValue = useWatch({ control, name: "eyes_color" });


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.eyes_color && data.eyes_color.length > 0 && notEmpty) {
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
        <ProgressBar step={2} totalSteps={8} />

        <Text className="text-base text-gray-700 my-8">Qual é a cor dos olhos do paciente?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Azul claro, cinza, verde" value="Azul claro, cinza, verde" checked={value === 'Azul claro, cinza, verde'} onPress={() => {
                const newValue = "Azul claro, cinza, verde";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
              <RadioButton label="Azul, cinza ou verde" value="Azul, cinza ou verde" checked={value === 'Azul, cinza ou verde'} onPress={() => {
                const newValue = "Azul, cinza ou verde";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
              <RadioButton label="Azul" value="Azul" checked={value === 'Azul'} onPress={() => {
                const newValue = "Azul";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
              <RadioButton label="Castanho claro" value="Castanho claro" checked={value === 'Castanho claro'} onPress={() => {
                const newValue = "Castanho claro";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
              <RadioButton label="Castanho escuro" value="Castanho escuro" checked={value === 'Castanho escuro'} onPress={() => {
                const newValue = "Castanho escuro";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
            </View>
          )}
          name="eyes_color"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step1')} 
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
