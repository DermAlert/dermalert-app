import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraCareSupportForm } from "@/hooks/Ulcera/useUlceraCareSupportForm";
import { UlceraCareSupportProps } from "@/types/forms";
import { router, useFocusEffect } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { BackHandler, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraCareSupportStep1() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { ulceraCareSupportData, setUlceraCareSupportData, updateUlceraCareSupportData } = useUlceraCareSupportForm();


  // formulario
  const { control, handleSubmit } = useForm<UlceraCareSupportProps>(
    {
      defaultValues: {
        has_dressings_available: ulceraCareSupportData.has_dressings_available
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "has_dressings_available" });


  const handleNext = (data: UlceraCareSupportProps) => {
    if (data.has_dressings_available && data.has_dressings_available.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraCareSupportData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/step2')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraCareSupportData({});
    router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraCareSupportData)
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

      <Header title="Acesso a cuidados e suporte" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={1} totalSteps={3} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente tem curativos disponíveis em casa ou fornecidos pela UBS?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="YES" checked={value === 'YES'} onPress={() => {
                const newValue = "YES";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraCareSupportData({ has_dressings_available: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/step2')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraCareSupportData({ has_dressings_available: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/step2')
              }} />
            </View>
          )}
          name="has_dressings_available"
        /> 

      </ScrollView>

      <View className="px-8 w-full justify-start mb-4">
        <Button 
          title="Próximo" 
          iconRight 
          icon={<ArrowRightIcon size={24} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />}
          style={{ marginTop: 24 }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
