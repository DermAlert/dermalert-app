import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useUlceraUlcerInfoForm } from "@/hooks/Ulcera/useUlceraUlcerInfoForm";
import { UlceraUlcerInfoProps } from "@/types/forms";
import { router } from "expo-router";
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  SlideInRight, SlideOutLeft
} from 'react-native-reanimated';

export default function UlceraUlcerInfoEditStep3() {
  const [notEmpty, setNotEmpty] = useState(false);
  
  const { ulceraUlcerInfoData, setUlceraUlcerInfoData, updateUlceraUlcerInfoData } = useUlceraUlcerInfoForm();


  // formulario
  const { control, handleSubmit } = useForm<UlceraUlcerInfoProps>(
    {
      defaultValues: {
        used_antibiotics: ulceraUlcerInfoData.used_antibiotics
      }
    }
  );
  const cancerTypeValue = useWatch({ control, name: "used_antibiotics" });


  const handleNext = (data: UlceraUlcerInfoProps) => {
    if (data.used_antibiotics && data.used_antibiotics.length > 0 && notEmpty) {
      console.log(data);
      updateUlceraUlcerInfoData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step4')
    } else {
      return;
    }
  }

  const handleCancel = () => {
    setUlceraUlcerInfoData({});
    router.push('/(app)/(patient)/lesao/anamnesis/ulcera/ulcerInfo');
  }

  useEffect(() => {
    const current = cancerTypeValue || [];
    const hasValue = current.length > 0;

    setNotEmpty(hasValue);
  }, [cancerTypeValue]);

  useEffect(() => {
    console.log(ulceraUlcerInfoData)
  }, []);

  return (
    <Animated.View 
      entering={SlideInRight} 
      exiting={SlideOutLeft} 
      className="flex-1 bg-white justify-start items-center p-safe"
    >

      <Header title="Informações sobre a úlcera atual" onPress={handleCancel} />

      <ScrollView className="px-8 w-full flex-1">
        <ProgressBar step={3} totalSteps={4} />

        <Text allowFontScaling={false} className="text-base text-neutral-800 mt-4 mb-8">O paciente já usou antibióticos para tratar essa ferida?</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Sim" value="YES" checked={value === 'YES'} onPress={() => {
                const newValue = "YES";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraUlcerInfoData({ used_antibiotics: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step4')
              }} />
              <RadioButton label="Não" value="NO" checked={value === 'NO'} onPress={() => {
                const newValue = "NO";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraUlcerInfoData({ used_antibiotics: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step4')
              }} />
              <RadioButton label="Não sabe" value="DONT_KNOW" checked={value === 'DONT_KNOW'} onPress={() => {
                const newValue = "DONT_KNOW";
                onChange(newValue);
                setNotEmpty(true);
                updateUlceraUlcerInfoData({ used_antibiotics: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step4')
              }} />
            </View>
          )}
          name="used_antibiotics"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/anamnesis/ulcerInfo/edit/step2')} 
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
