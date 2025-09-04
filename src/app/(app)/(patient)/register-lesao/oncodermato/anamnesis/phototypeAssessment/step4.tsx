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

export default function PhototypeAssessmentStep4() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<PhototypeAssessmentProps>(
    {
      defaultValues: {
        freckles: phototypeAssessmentData.freckles
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "freckles" });


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.freckles && data.freckles.length > 0 && notEmpty) {
      console.log(data);
      updatePhototypeAssessmentData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step5');
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
        <ProgressBar step={4} totalSteps={8} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">Quantas sardas o paciente tem em áreas não expostas?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Muitas" value="many" checked={value === 'many'} onPress={() => {
                const newValue = "many";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ freckles: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step5')
              }} />
              <RadioButton label="Algumas" value="some" checked={value === 'some'} onPress={() => {
                const newValue = "some";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ freckles: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step5')
              }} />
              <RadioButton label="Poucas" value="few" checked={value === 'few'} onPress={() => {
                const newValue = "few";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ freckles: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step5')
              }} />
              <RadioButton label="Nenhuma" value="none" checked={value === 'none'} onPress={() => {
                const newValue = "none";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ freckles: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step5')
              }} />
            </View>
          )}
          name="freckles"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step3')} 
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
