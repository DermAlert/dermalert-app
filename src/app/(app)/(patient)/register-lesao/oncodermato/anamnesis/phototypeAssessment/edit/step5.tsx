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

export default function PhototypeAssessmentEditStep5() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<PhototypeAssessmentProps>(
    {
      defaultValues: {
        sun_exposed: phototypeAssessmentData.sun_exposed
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "sun_exposed" });


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.sun_exposed && data.sun_exposed.length > 0 && notEmpty) {
      console.log(data);
      updatePhototypeAssessmentData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step6');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setPhototypeAssessmentData({});
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/phototypeAssessment');
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
        <ProgressBar step={5} totalSteps={8} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">Como a pele do paciente reage quando fica muito tempo exposta ao sol?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Fica vermelha, dolorida, descasca" value="always_burns_peels_painful" checked={value === 'always_burns_peels_painful'} onPress={() => {
                const newValue = "always_burns_peels_painful";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_exposed: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step6')
              }} />
              <RadioButton label="Fica vermelha, descasca um pouco" value="burns_peels_a_little" checked={value === 'burns_peels_a_little'} onPress={() => {
                const newValue = "burns_peels_a_little";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_exposed: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step6')
              }} />
              <RadioButton label="Fica vermelha, mas não descasca" value="burns_no_peel" checked={value === 'burns_no_peel'} onPress={() => {
                const newValue = "burns_no_peel";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_exposed: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step6')
              }} />
              <RadioButton label="Fica levemente ou nada vermelha" value="seldom_or_not_red" checked={value === 'seldom_or_not_red'} onPress={() => {
                const newValue = "seldom_or_not_red";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_exposed: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step6')
              }} />
              <RadioButton label="Nunca fica vermelha" value="never_red" checked={value === 'never_red'} onPress={() => {
                const newValue = "never_red";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ sun_exposed: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step6')
              }} />
            </View>
          )}
          name="sun_exposed"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step4')} 
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
