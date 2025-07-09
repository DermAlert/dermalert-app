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

export default function PhototypeAssessmentStep7() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();


  // formulario
  const { control, handleSubmit } = useForm<PhototypeAssessmentProps>();
  const cancerTypeValue = useWatch({ control, name: "sun_sensitive_skin" });


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.sun_sensitive_skin && data.sun_sensitive_skin.length > 0 && notEmpty) {
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
        <ProgressBar step={7} totalSteps={8} />

        <Text className="text-base text-gray-700 my-8">Quão sensível é a face do paciente ao sol?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Muito sensível" value="Muito sensível" checked={value === 'Muito sensível'} onPress={() => {
                const newValue = "Muito sensível";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_sensitive_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step8')
              }} />
              <RadioButton label="Sensível" value="Sensível" checked={value === 'Sensível'} onPress={() => {
                const newValue = "Sensível";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_sensitive_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step8')
              }} />
              <RadioButton label="Normal" value="Normal" checked={value === 'Normal'} onPress={() => {
                const newValue = "Normal";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_sensitive_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step8')
              }} />
              <RadioButton label="Resistente" value="Resistente" checked={value === 'Resistente'} onPress={() => {
                const newValue = "Resistente";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_sensitive_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step8')
              }} />
              <RadioButton label="Muito resistente, nunca queima" value="Muito resistente, nunca queima" checked={value === 'Muito resistente, nunca queima'} onPress={() => {
                const newValue = "Muito resistente, nunca queima";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_sensitive_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step8')
              }} />
            </View>
          )}
          name="sun_sensitive_skin"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step6')} 
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
