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

export default function PhototypeAssessmentStep6() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<PhototypeAssessmentProps>(
    {
      defaultValues: {
        tanned_skin: phototypeAssessmentData.tanned_skin
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "tanned_skin" });


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.tanned_skin && data.tanned_skin.length > 0 && notEmpty) {
      console.log(data);
      updatePhototypeAssessmentData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step7');
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
        <ProgressBar step={6} totalSteps={8} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">A pele do paciente bronzeia?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Nunca, sempre queima" value="never_always_burns" checked={value === 'never_always_burns'} onPress={() => {
                const newValue = "never_always_burns";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ tanned_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step7')
              }} />
              <RadioButton label="Às vezes" value="sometimes" checked={value === 'sometimes'} onPress={() => {
                const newValue = "sometimes";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ tanned_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step7')
              }} />
              <RadioButton label="Frequentemente" value="often" checked={value === 'often'} onPress={() => {
                const newValue = "often";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ tanned_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step7')
              }} />
              <RadioButton label="Sempre" value="always" checked={value === 'always'} onPress={() => {
                const newValue = "always";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ tanned_skin: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step7')
              }} />
            </View>
          )}
          name="tanned_skin"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/step5')} 
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
