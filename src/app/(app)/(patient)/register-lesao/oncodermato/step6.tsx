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

export default function RegisterLesaoOncodermatoStep6() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionData, setRegisterLesionData, updateRegisterLesionData } = useRegisterLesionForm();
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoOncodermatoProps>();
  const lesionLocalValue = useWatch({ control, name: "size" });


  

  const handleNext = (data: LesaoOncodermatoProps) => {
    if (data.size && data.size.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/step7');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRegisterLesionData({});
    router.push('/(app)/(patient)/register-lesao/oncodermato/anamnesis/steps');
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
        <ProgressBar step={6} totalSteps={8} />

        <Text className="text-2xl font-semibold mt-6">Questionário ABCDE</Text>
        <Text className="text-lg mt-4">D - Diâmetro</Text>

        <Text className="text-base text-gray-600 mt-4 mb-8">Qual o tamanho aproximado da lesão?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Menor que 6 mm (menor que uma borracha de lápis)" value="Menor que 6 mm (menor que uma borracha de lápis)" checked={value === 'Menor que 6 mm (menor que uma borracha de lápis)'} onPress={() => {
                const newValue = "Menor que 6 mm (menor que uma borracha de lápis)";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionData({ size: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/step7')
              }} />
              <RadioButton label="Maior ou igual a 6 mm." value="Maior ou igual a 6 mm." checked={value === 'Maior ou igual a 6 mm.'} onPress={() => {
                const newValue = "Maior ou igual a 6 mm.";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionData({ size: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/step7')
              }} />
            </View>
          )}
          name="size"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/step5')} 
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
