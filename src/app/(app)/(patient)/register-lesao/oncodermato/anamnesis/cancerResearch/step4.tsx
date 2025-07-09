import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useCancerResearchForm } from "@/hooks/Oncodermato/useCancerResearchForm";
import { CancerResearchProps } from "@/types/forms";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function CancerResearchStep4() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { cancerResearchData, setCancerResearchData, updateCancerResearchData } = useCancerResearchForm();


  // formulario
  const { control, handleSubmit } = useForm<CancerResearchProps>();
  const cancerTypeValue = useWatch({ control, name: "lesion_aspect" });


  

  const handleNext = (data: CancerResearchProps) => {
    if (data.lesion_aspect && data.lesion_aspect.length > 0 && notEmpty) {
      console.log(data);
      updateCancerResearchData(data);
      //router.push('/(app)/(patient)/register-lesao/Oncodermato/Anamnesis/personalFamilyHistory/step1');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setCancerResearchData({});
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

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={4} totalSteps={6} />

        <Text className="text-base text-gray-700 my-8">Essas lesões têm bordas irregulares, múltiplas cores ou assimetria?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="Sim" checked={value === 'Sim'} onPress={() => {
                const newValue = "Sim";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ lesion_aspect: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step5')
              }} />
              <RadioButton label="Não" value="Não" checked={value === 'Não'} onPress={() => {
                const newValue = "Não";
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ lesion_aspect: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step5')
              }} />
            </View>
          )}
          name="lesion_aspect"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step3')} 
          style={{ flexGrow: 1, width: '47%' }}
        />
        <Button 
          title="Próximo" 
          iconRight 
          icon={<AntDesign name="arrowright" size={14} color={`${notEmpty ? 'white' : '#B3B3B3'}`} />} 
          style={{ flexGrow: 1, width: '47%' }} 
          onPress={handleSubmit(handleNext)} 
          activeOpacity={notEmpty ? 0.2 : 1}
          disabled={notEmpty}
        />
      </View>
    </Animated.View>
  );
}
