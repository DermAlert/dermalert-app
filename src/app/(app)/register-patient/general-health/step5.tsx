import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useGeneralHealthForm } from "@/hooks/useGeneralHealthForm";
import { GeneralHealthProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function GeneralHealthStep5() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { generalHealthData, setGeneralHealthData, updateGeneralHealthData  } = useGeneralHealthForm();


  // formulario
  const { control, handleSubmit } = useForm<GeneralHealthProps>(
    {
      defaultValues: {
        physical_activity_frequency: generalHealthData.physical_activity_frequency
      }
    }
  );

  const physicalActivityValue = useWatch({ control, name: "physical_activity_frequency" });

  const handleNext = (data: GeneralHealthProps) => {
    if (data.physical_activity_frequency && notEmpty) {
      console.log(data);
      updateGeneralHealthData(data);
      router.push('/(app)/register-patient/general-health/step6');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setGeneralHealthData({});
    router.push('/(app)/register-patient/step9');
  }

  useEffect(() => {
    const current = physicalActivityValue || "";
    const hasOtherSelections = current.length > 0;


    setNotEmpty(hasOtherSelections);
  }, [physicalActivityValue]);


  useEffect(() => {
    console.log(generalHealthData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Andecedentes clínicos" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={5} totalSteps={6} />

        <Text className="text-base text-neutral-900 mt-6 mb-8">O paciente pratica atividade física regularmente com alguma frequencia? </Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Diariamente" value="daily" checked={value === 'daily'} onPress={() => {
                const newValue = "daily";
                onChange(newValue);
                setNotEmpty(true);
                updateGeneralHealthData({ physical_activity_frequency: newValue });
                router.push('/(app)/register-patient/general-health/step6');
                }} />
              <RadioButton label="3-5 vezes por semana" value="3-5 times a week" checked={value === '3-5 times a week'} onPress={() => {
                const newValue = "3-5 times a week";
                onChange(newValue);
                setNotEmpty(true);
                updateGeneralHealthData({ physical_activity_frequency: newValue });
                router.push('/(app)/register-patient/general-health/step6');
                }} />
              <RadioButton label="1-2 vezes por semana" value="1-2 times a week" checked={value === '1-2 times a week'} onPress={() => {
                const newValue = "1-2 times a week";
                onChange(newValue);
                setNotEmpty(true);
                updateGeneralHealthData({ physical_activity_frequency: newValue });
                router.push('/(app)/register-patient/general-health/step6');
                }} />
              <RadioButton label="Ocasionalmente" value="occasionally" checked={value === 'occasionally'} onPress={() => {
                const newValue = "occasionally";
                onChange(newValue);
                setNotEmpty(true);
                updateGeneralHealthData({ physical_activity_frequency: newValue });
                router.push('/(app)/register-patient/general-health/step6');
                }} />
              <RadioButton label="Não" value="never" checked={value === 'never'} onPress={() => {
                const newValue = "never";
                onChange(newValue);
                setNotEmpty(true);
                updateGeneralHealthData({ physical_activity_frequency: newValue });
                router.push('/(app)/register-patient/general-health/step6');
                }} />
            </View>
          )}
          name="physical_activity_frequency"
        /> 
      </ScrollView>

      <View className="gap-4 mt-6 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}  
          onPress={()=> router.push("/(app)/register-patient/general-health/step4")} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#D4D6DF'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
