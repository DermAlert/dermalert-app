import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { TitleText } from "@/components/TitleText";
import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { LesaoUlceraProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function RegisterLesaoUlceraStep3() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>(
    {
      defaultValues: {
        lesion_dimension: registerLesionUlceraData.lesion_dimension
      }
    }
  );
  const lesionLocalValue = useWatch({ control, name: "lesion_dimension" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.lesion_dimension && data.lesion_dimension.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step4');
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setRegisterLesionUlceraData({});
    router.push('/(app)/(patient)/register-lesao/select');
  }

  useEffect(() => {
    const current = lesionLocalValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [lesionLocalValue]);

  useEffect(() => {
    console.log(registerLesionUlceraData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Registrar lesão" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={3} totalSteps={9} />

        <TitleText title="RESVECH" description="Dimensão da lesão"/>
        <Text className="text-sm text-neutral-700 mb-6">(0-6 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-[10]">
              <RadioButton label="Área = 0m²" value="0" checked={value === '0'} onPress={() => {
                const newValue = "0";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área < 4cm²" value="3" checked={value === '3'} onPress={() => {
                const newValue = "3";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área = entre 4cm² e 16cm²" value="4" checked={value === '4'} onPress={() => {
                const newValue = "4";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área = entre 16cm² e 36cm²" value="16" checked={value === '16'} onPress={() => {
                const newValue = "16";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área = entre 36cm² e 64cm²" value="360" checked={value === '360'} onPress={() => {
                const newValue = "360";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área = entre 64cm² e 100cm²" value="64" checked={value === '64'} onPress={() => {
                const newValue = "64";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
              <RadioButton label="Área > 100cm²" value="101" checked={value === '101'} onPress={() => {
                const newValue = "101";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ lesion_dimension: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step4')
              }} />
            </View>
          )}
          name="lesion_dimension"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step2')} 
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
