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

export default function CancerResearchEditStep2() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { cancerResearchData, setCancerResearchData, updateCancerResearchData } = useCancerResearchForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<CancerResearchProps>(
    {
      defaultValues: {
        bleed_itch: cancerResearchData.bleed_itch
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "bleed_itch" });


  

  const handleNext = (data: CancerResearchProps) => {
    if (data.bleed_itch !== undefined && notEmpty) {
      console.log(data);
      updateCancerResearchData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/edit/step3');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setCancerResearchData({});
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/cancerResearch');  
  }

  useEffect(() => {
    const current = cancerTypeValue;

    setNotEmpty(current !== undefined);
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
        <ProgressBar step={2} totalSteps={6} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">Essas manchas ou lesões causam coceira, sangramento ou dor?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="true" checked={value === true} onPress={() => {
                const newValue = true;
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ bleed_itch: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/edit/step3')
              }} />
              <RadioButton label="Não" value="false" checked={value === false} onPress={() => {
                const newValue = false;
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ bleed_itch: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/edit/step3')
              }} />
            </View>
          )}
          name="bleed_itch"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/edit/step1')} 
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
