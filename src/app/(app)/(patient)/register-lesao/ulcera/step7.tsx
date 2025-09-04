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

export default function RegisterLesaoUlceraStep7() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>(
    {
      defaultValues: {
        exudate_type: registerLesionUlceraData.exudate_type,
      }
    }
  );
  const lesionLocalValue = useWatch({ control, name: "exudate_type" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.exudate_type && data.exudate_type.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step8');
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
        <ProgressBar step={7} totalSteps={9} />

        <TitleText title="RESVECH" description="Exsudato"/>
        <Text className="text-sm text-neutral-700 mb-6">(0-4 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Seco" value="dry" checked={value === 'dry'} onPress={() => {
                const newValue = "dry";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exudate_type: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
              <RadioButton label="Úmido" value="moist" checked={value === 'moist'} onPress={() => {
                const newValue = "moist";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exudate_type: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
              <RadioButton label="Molhado" value="wet" checked={value === 'wet'} onPress={() => {
                const newValue = "wet";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exudate_type: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
              <RadioButton label="Saturado ou elevado" value="saturated" checked={value === 'saturated'} onPress={() => {
                const newValue = "saturated";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exudate_type: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
              <RadioButton label="Com fuga de exsudato" value="leakage" checked={value === 'leakage'} onPress={() => {
                const newValue = "leakage";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exudate_type: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
            </View>
          )}
          name="exudate_type"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step6')} 
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
