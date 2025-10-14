import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { useLesionType } from "@/hooks/useLesionType";
import { CancerResearchProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function CancerResearchStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { cancerResearchData, setCancerResearchData, updateCancerResearchData } = useCancerResearchForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<CancerResearchProps>(
    {
      defaultValues: {
        suspicious_moles: cancerResearchData.suspicious_moles
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "suspicious_moles" });


  

  const handleNext = (data: CancerResearchProps) => {
    if (data.suspicious_moles !== undefined && notEmpty) {
      console.log(data);
      updateCancerResearchData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step2');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setCancerResearchData({});
    setLesionType(null)
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue;

    setNotEmpty(current !== undefined);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(cancerResearchData)
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

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Investigação de CA e Lesões" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={6} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente tem pintas ou manchas que mudaram de cor, tamanho ou formato recentemente?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="true" checked={value === true} onPress={() => {
                const newValue = true;
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ suspicious_moles: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step2')
              }} />
              <RadioButton label="Não" value="false" checked={value === false} onPress={() => {
                const newValue = false;
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ suspicious_moles: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step2')
              }} />
            </View>
          )}
          name="suspicious_moles"
        /> 

      </ScrollView>

      <View className="px-8 mt-4 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
