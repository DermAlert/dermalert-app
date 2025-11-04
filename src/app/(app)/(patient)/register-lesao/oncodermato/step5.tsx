import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { TitleText } from "@/components/TitleText";
import { useRegisterLesionForm } from "@/hooks/Oncodermato/useRegisterLesionForm";
import { useLesionType } from "@/hooks/useLesionType";
import { LesaoOncodermatoProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoOncodermatoStep5() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionData, setRegisterLesionData, updateRegisterLesionData } = useRegisterLesionForm();

  const { setLesionType } = useLesionType();
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoOncodermatoProps>(
    {
      defaultValues: {
        color_variation: registerLesionData.color_variation,
      }
    }
  );
  const lesionLocalValue = useWatch({ control, name: "color_variation" });


  

  const handleNext = (data: LesaoOncodermatoProps) => {
    if (data.color_variation && data.color_variation.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/step6');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRegisterLesionData({});
    setLesionType(null)
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

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={5} totalSteps={8} />

        <TitleText title="Questionário ABCDE" style={{marginTop: 24}} />
        <Text allowFontScaling={false} className="text-base mt-4 text-neutral-900 font-semibold">C - Cor</Text>
        <Text allowFontScaling={false} className="text-base mt-2 mb-8 text-neutral-700">A lesão apresenta variação de cor?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Uma única cor (ex: castanho claro ou escuro)" value="single_color" checked={value === 'single_color'} onPress={() => {
                const newValue = "single_color";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionData({ color_variation: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/step6')
              }} />
              <RadioButton label="Três ou mais cores (ex: marrom, preto, vermelho, branco, azul)" value="three_or_more_colors" checked={value === 'three_or_more_colors'} onPress={() => {
                const newValue = "three_or_more_colors";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionData({ color_variation: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/step6')
              }} />
            </View>
          )}
          name="color_variation"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}  
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/step4')} 
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
