import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { LesaoOncodermatoProps } from "@/types/forms";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep7() {
  const [notEmpty, setNotEmpty] = useState(false);


  const { registerLesionData, setRegisterLesionData, updateRegisterLesionData } = useRegisterLesionForm();
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoOncodermatoProps>();
  const lesionLocalValue = useWatch({ control, name: "changed" });


  

  const handleNext = (data: LesaoOncodermatoProps) => {
    if (data.changed && data.changed.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/step8');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRegisterLesionData({});
    router.push('/(app)/(patient)/register-lesao/select');
  }

  useEffect(() => {
    const current = lesionLocalValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [lesionLocalValue]);

  useEffect(() => {
    console.log(registerLesionData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Registrar lesão" onPress={handleCancel} />

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={7} totalSteps={8} />

        <Text className="text-2xl font-semibold mt-6">Questionário ABCDE</Text>
        <Text className="text-lg mt-4">E - Evolução</Text>

        <Text className="text-base text-gray-600 mt-4 mb-8">A lesão mudou ao longo do tempo?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Não houve mudanças perceptíveis nos últimos meses" value="Não houve mudanças perceptíveis nos últimos meses" checked={value === 'Não houve mudanças perceptíveis nos últimos meses'} onPress={() => {
                const newValue = "Não houve mudanças perceptíveis nos últimos meses";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionData({ changed: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/step8')
              }} />
              <RadioButton label="Houve mudança de forma, tamanho, cor, coceira ou sangramento recentemente" value="Houve mudança de forma, tamanho, cor, coceira ou sangramento recentemente" checked={value === 'Houve mudança de forma, tamanho, cor, coceira ou sangramento recentemente'} onPress={() => {
                const newValue = "Houve mudança de forma, tamanho, cor, coceira ou sangramento recentemente";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionData({ changed: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/step8')
              }} />
            </View>
          )}
          name="changed"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/step6')} 
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
