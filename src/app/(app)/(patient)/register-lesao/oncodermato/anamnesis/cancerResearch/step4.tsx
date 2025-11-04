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

export default function CancerResearchStep4() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { cancerResearchData, setCancerResearchData, updateCancerResearchData } = useCancerResearchForm();
  const { setLesionType } = useLesionType();

  // formulario
  const { control, handleSubmit } = useForm<CancerResearchProps>(
    {
      defaultValues: {
        lesion_aspect: cancerResearchData.lesion_aspect
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "lesion_aspect" });


  

  const handleNext = (data: CancerResearchProps) => {
    if (data.lesion_aspect !== undefined && notEmpty) {
      console.log(data);
      updateCancerResearchData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step5');
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

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Investigação de CA e Lesões" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={4} totalSteps={6} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">Essas lesões têm bordas irregulares, múltiplas cores ou assimetria?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="true" checked={value === true} onPress={() => {
                const newValue = true;
                onChange(newValue);
                setNotEmpty(true);
                updateCancerResearchData({ lesion_aspect: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step5')
              }} />
              <RadioButton label="Não" value="false" checked={value === false} onPress={() => {
                const newValue = false;
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

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/cancerResearch/step3')} 
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
