import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import { useLesionType } from "@/hooks/useLesionType";
import { PhototypeAssessmentProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
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
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<PhototypeAssessmentProps>(
    {
      defaultValues: {
        eyes_color: phototypeAssessmentData.eyes_color
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "eyes_color" });


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.eyes_color && data.eyes_color.length > 0 && notEmpty) {
      console.log(data);
      updatePhototypeAssessmentData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setPhototypeAssessmentData({});
    setLesionType(null)
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

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={2} totalSteps={8} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">Qual é a cor dos olhos do paciente?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Azul claro, cinza, verde" value="light_blue_gray_green" checked={value === 'light_blue_gray_green'} onPress={() => {
                const newValue = "light_blue_gray_green";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
              <RadioButton label="Azul, cinza ou verde" value="blue_gray_green" checked={value === 'blue_gray_green'} onPress={() => {
                const newValue = "blue_gray_green";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
              <RadioButton label="Azul" value="blue" checked={value === 'blue'} onPress={() => {
                const newValue = "blue";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
              <RadioButton label="Castanho claro" value="light_brown" checked={value === 'light_brown'} onPress={() => {
                const newValue = "light_brown";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ eyes_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')
              }} />
              <RadioButton label="Castanho escuro" value="dark_brown" checked={value === 'dark_brown'} onPress={() => {
                const newValue = "dark_brown";
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

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step1')} 
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
