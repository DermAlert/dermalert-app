import Button from "@/components/Button";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { usePhototypeAssessmentForm } from "@/hooks/Oncodermato/usePhototypeAssessmentForm";
import { useLesionType } from "@/hooks/useLesionType";
import { usePatientId } from "@/hooks/usePatientId";
import { api } from "@/services/api";
import { PhototypeAssessmentProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function PhototypeAssessmentEditStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { phototypeAssessmentData, setPhototypeAssessmentData, updatePhototypeAssessmentData } = usePhototypeAssessmentForm();
  const { setLesionType } = useLesionType();

  const { patientId } = usePatientId();


  // formulario
  const { control, handleSubmit, reset } = useForm<PhototypeAssessmentProps>(
    {
      defaultValues: {
        skin_color: ""
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "skin_color" });

  const loadPhototypeAssessment = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/patients/${patientId}/forms/phototype/`);
      setPhototypeAssessmentData(prev => {
        return prev?.skin_color ? prev : data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [patientId, setPhototypeAssessmentData]);

  useEffect(() => {
    if (phototypeAssessmentData?.skin_color) {
      reset({
        skin_color: phototypeAssessmentData.skin_color
      });
    }
  }, [phototypeAssessmentData, reset]);

  useEffect(() => {
    loadPhototypeAssessment();
  }, [loadPhototypeAssessment]);


  

  const handleNext = (data: PhototypeAssessmentProps) => {
    if (data.skin_color && data.skin_color.length > 0 && notEmpty) {
      console.log(data);
      updatePhototypeAssessmentData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step2');
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

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleCancel()
        return true;
      };
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
  
      return () => subscription.remove();
    }, [])
  );

  if(isLoading){
    return (
      <View className="flex-1 bg-white p-safe justify-center items-center">
        <Loading />
      </View>
    )
  }

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Avaliação de Fototipo" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={8} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">Qual é a cor natural da pele do paciente (áreas não expostas ao sol)?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Branca leitosa" value="milky_white" checked={value === 'milky_white'} onPress={() => {
                const newValue = "milky_white";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step2')
              }} />
              <RadioButton label="Branca" value="white" checked={value === 'white'} onPress={() => {
                const newValue = "white";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step2')
              }} />
              <RadioButton label="Branca a bege, com base dourada" value="white_to_beige_golden" checked={value === 'white_to_beige_golden'} onPress={() => {
                const newValue = "white_to_beige_golden";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step2')
              }} />
              <RadioButton label="Bege" value="beige" checked={value === 'beige'} onPress={() => {
                const newValue = "beige";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step2')
              }} />
              <RadioButton label="Castanha clara" value="light_brown" checked={value === 'light_brown'} onPress={() => {
                const newValue = "light_brown";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step2')
              }} />
              <RadioButton label="Castanha escura" value="dark_brown" checked={value === 'dark_brown'} onPress={() => {
                const newValue = "dark_brown";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step2')
              }} />
              <RadioButton label="Negra" value="black" checked={value === 'black'} onPress={() => {
                const newValue = "black";
                onChange(newValue);
                setNotEmpty(true);
                updatePhototypeAssessmentData({ skin_color: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/phototypeAssessment/edit/step2')
              }} />
            </View>
          )}
          name="skin_color"
        /> 

      </ScrollView>

      <View className="px-8 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#D4D6DF'}`} />}
          style={{ marginTop: 24 }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
