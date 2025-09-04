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

export default function RegisterLesaoOncodermatoStep4() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionData, setRegisterLesionData, updateRegisterLesionData } = useRegisterLesionForm();

  const { setLesionType } = useLesionType();
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoOncodermatoProps>(
    {
      defaultValues: {
        border: registerLesionData.border,
      }
    }
  );
  const lesionLocalValue = useWatch({ control, name: "border" });


  

  const handleNext = (data: LesaoOncodermatoProps) => {
    if (data.border && data.border.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionData(data);
      router.push('/(app)/(patient)/register-lesao/oncodermato/step5');
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
        <ProgressBar step={4} totalSteps={8} />

        <TitleText title="Questionário ABCDE" style={{marginTop: 24}} />
        <Text className="text-base mt-4 text-neutral-900 font-semibold">B - Bordas</Text>
        <Text className="text-base mt-2 mb-8 text-neutral-700">Como são as bordas da lesão?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Regulares e bem definidas" value="regular_well_defined" checked={value === 'regular_well_defined'} onPress={() => {
                const newValue = "regular_well_defined";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionData({ border: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/step5')
              }} />
              <RadioButton label="Irregulares, mal definidas, com contornos serrilhados ou borrados" value="irregular_poorly_defined" checked={value === 'irregular_poorly_defined'} onPress={() => {
                const newValue = "irregular_poorly_defined";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionData({ border: newValue });
                router.push('/(app)/(patient)/register-lesao/oncodermato/step5')
              }} />
            </View>
          )}
          name="border"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}  
          onPress={()=> router.push('/(app)/(patient)/register-lesao/oncodermato/step3')} 
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
