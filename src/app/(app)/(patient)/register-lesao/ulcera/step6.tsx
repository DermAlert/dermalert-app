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

export default function RegisterLesaoUlceraStep6() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>(
    {
      defaultValues: {
        wound_bed_tissue: registerLesionUlceraData.wound_bed_tissue,
      }
    }
  );
  const lesionLocalValue = useWatch({ control, name: "wound_bed_tissue" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.wound_bed_tissue && data.wound_bed_tissue.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step7');
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
        <ProgressBar step={6} totalSteps={9} />

        <TitleText title="RESVECH" description="Tipo de tecido presente no leito da ferida"/>
        <Text allowFontScaling={false} className="text-sm text-neutral-700 mb-6">(0-4 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Tecido regenerado/cicatrizado" value="regenerated_scarred" checked={value === 'regenerated_scarred'} onPress={() => {
                const newValue = "regenerated_scarred";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_bed_tissue: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step7')
              }} />
              <RadioButton label="Tecido epitelial" value="epithelialization" checked={value === 'epithelialization'} onPress={() => {
                const newValue = "epithelialization";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_bed_tissue: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step7')
              }} />
              <RadioButton label="Tecido de granulação" value="granulation" checked={value === 'granulation'} onPress={() => {
                const newValue = "granulation";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_bed_tissue: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step7')
              }} />
              <RadioButton label="Tecido desvitalizado e/ou fibrinoso" value="devitalized_fibrinous" checked={value === 'devitalized_fibrinous'} onPress={() => {
                const newValue = "devitalized_fibrinous";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_bed_tissue: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step7')
              }} />
              <RadioButton label="Tecido necrótico (necrose seca ou úmida)" value="necrotic" checked={value === 'necrotic'} onPress={() => {
                const newValue = "necrotic";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_bed_tissue: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step7')
              }} />
            </View>
          )}
          name="wound_bed_tissue"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)}  
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step5')} 
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
