import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraCareSupportForm } from "@/hooks/Ulcera/useUlceraCareSupportForm";
import { UlceraCareSupportProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraCareSupportStep2() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { ulceraCareSupportData, setUlceraCareSupportData, updateUlceraCareSupportData } = useUlceraCareSupportForm();


  // formulario
  const { control, handleSubmit } = useForm<UlceraCareSupportProps>(
    {
      defaultValues: {
        has_help_at_home: ulceraCareSupportData.has_help_at_home
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "has_help_at_home" });


  const handleNext = (data: UlceraCareSupportProps) => {
    if (data.has_help_at_home && data.has_help_at_home.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraCareSupportData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/step3')
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

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Acesso a cuidados e suporte" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={2} totalSteps={3} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">O paciente tem ajuda para cuidar da ferida em casa?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="YES" checked={value === 'YES'} onPress={() => {
                const newValue = "YES";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraCareSupportData({ has_help_at_home: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/step3')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraCareSupportData({ has_help_at_home: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/step3')
              }} />
            </View>
          )}
          name="has_help_at_home"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/careSupport/step1')} 
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
