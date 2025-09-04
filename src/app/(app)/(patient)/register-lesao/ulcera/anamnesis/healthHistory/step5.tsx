import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraHealthHistoryForm } from "@/hooks/Ulcera/useUlceraHealthHistoryForm";
import { UlceraHealthHistoryProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraHealthHistoryStep5() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { ulceraHealthHistoryData, setUlceraHealthHistoryData, updateUlceraHealthHistoryData } = useUlceraHealthHistoryForm();


  // formulario
  const { control, handleSubmit } = useForm<UlceraHealthHistoryProps>(
    {
      defaultValues: {
        compression_stockings_use: ulceraHealthHistoryData.compression_stockings_use
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "compression_stockings_use" });


  const handleNext = (data: UlceraHealthHistoryProps) => {
    if (data.compression_stockings_use && data.compression_stockings_use.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraHealthHistoryData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/step6')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraHealthHistoryData({});
    router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/steps');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraHealthHistoryData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Histórico clínico geral" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={5} totalSteps={6} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente usa ou já usou meias de compressão?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim, atualmente" value="CURRENTLY" checked={value === 'CURRENTLY'} onPress={() => {
                const newValue = "CURRENTLY";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraHealthHistoryData({ compression_stockings_use: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/step6')
              }} />
              <RadioButton label="Sim, mas não usa mais" value="USED_BUT_NOT_ANYMORE" checked={value === 'USED_BUT_NOT_ANYMORE'} onPress={() => {
                const newValue = "USED_BUT_NOT_ANYMORE";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraHealthHistoryData({ compression_stockings_use: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/step6')
              }} />
              <RadioButton label="Nunca usou" value="NEVER_USED" checked={value === 'NEVER_USED'} onPress={() => {
                const newValue = "NEVER_USED";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraHealthHistoryData({ compression_stockings_use: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/step6')
              }} />
              <RadioButton label="Não sabe o que é" value="DONT_KNOW_WHAT_IT_IS" checked={value === 'DONT_KNOW_WHAT_IT_IS'} onPress={() => {
                const newValue = "DONT_KNOW_WHAT_IT_IS";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraHealthHistoryData({ compression_stockings_use: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/step6')
              }} />
            </View>
          )}
          name="compression_stockings_use"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/healthHistory/step4')} 
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
