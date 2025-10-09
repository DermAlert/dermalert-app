import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useFamilyHistoryForm } from "@/hooks/Oncodermato/useFamilyHistoryForm";
import { useLesionType } from "@/hooks/useLesionType";
import { PersonalFamilyHistoryProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft, useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

export default function PersonalFamilyHistoryEditStep3() {
  const [isYesOpen, setIsYesOpen] = useState(false);
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { familyHistoryData, setFamilyHistoryData, updateFamilyHistoryData  } = useFamilyHistoryForm();
  const { setLesionType } = useLesionType();


  // animação accordion
  const measuredHeight = useSharedValue(0);
  const animatedHeight = useDerivedValue(() => 
    withTiming(
      isYesOpen ? measuredHeight.value : 0, 
      { duration: 300 }
    )
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  // formulario
  const { control, handleSubmit } = useForm<PersonalFamilyHistoryProps>(
    {
      defaultValues: {
        removed_injuries: familyHistoryData.removed_injuries
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "removed_injuries" });


  

  const handleNext = (data: PersonalFamilyHistoryProps) => {
    if (data.removed_injuries !== undefined && notEmpty) {
      console.log(data);
      updateFamilyHistoryData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step4');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setFamilyHistoryData({});
    setLesionType(null)
    router.push('/(app)/(patient)/lesao/anamnesis/oncodermato/personalFamilyHistory');
  }

  useEffect(() => {
    const current = cancerTypeValue;

    setNotEmpty(current !== undefined);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(familyHistoryData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Histórico Familiar e Pessoal" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={3} totalSteps={5} />

        <Text className="text-base text-neutral-800 mt-4 mb-8">O paciente já teve lesões removidas que foram identificadas como pré-cancerígenas?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="true" checked={value === true} onPress={() => {
                const newValue = true;
                onChange(newValue);
                setNotEmpty(true);
                updateFamilyHistoryData({ removed_injuries: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step4')
              }} />
              <RadioButton label="Não" value="false" checked={value === false} onPress={() => {
                const newValue = false;
                onChange(newValue);
                setNotEmpty(true);
                updateFamilyHistoryData({ removed_injuries: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step4')
              }} />
            </View>
          )}
          name="removed_injuries"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/personalFamilyHistory/edit/step2')} 
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
