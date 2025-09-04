import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { useLesionType } from "@/hooks/useLesionType";
import { CancerResearchProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function CancerResearchStep3() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { cancerResearchData, setCancerResearchData, updateCancerResearchData } = useCancerResearchForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<CancerResearchProps>(
    {
      defaultValues: {
        how_long: cancerResearchData.how_long
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "how_long" });


  

  const handleNext = (data: CancerResearchProps) => {
    if (data.how_long && data.how_long.length > 0 && notEmpty) {
      console.log(data);
      updateCancerResearchData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4');
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
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(cancerResearchData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Investigação de CA e Lesões" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={3} totalSteps={6} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">Há quanto tempo o paciente notou essas alterações?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Menos de 1 mês" value="lt_1_month" checked={value === 'lt_1_month'} onPress={() => {
                const newValue = "lt_1_month";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')
              }} />
              <RadioButton label="1-3 meses" value="1_3_months" checked={value === '1_3_months'} onPress={() => {
                const newValue = "1_3_months";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')
              }} />
              <RadioButton label="3-6 meses" value="3_6_months" checked={value === '3_6_months'} onPress={() => {
                const newValue = "3_6_months";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')
              }} />
              <RadioButton label="Mais de 6 meses" value="gt_6_months" checked={value === 'gt_6_months'} onPress={() => {
                const newValue = "gt_6_months";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ how_long: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step4')
              }} />
            </View>
          )}
          name="how_long"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step2')} 
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
