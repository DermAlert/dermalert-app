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

export default function RegisterLesaoUlceraStep4() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>(
    {
      defaultValues: {
        depth_of_tissue_injury: registerLesionUlceraData.depth_of_tissue_injury,
      }
    }
  )
  const lesionLocalValue = useWatch({ control, name: "depth_of_tissue_injury" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.depth_of_tissue_injury && data.depth_of_tissue_injury.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step5');
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
        <ProgressBar step={4} totalSteps={9} />

        <TitleText title="RESVECH" description="Profundidade do tecido atingido"/>
        <Text className="text-sm text-neutral-700 mb-6">(0-4 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-[10]">
              <RadioButton label="Pele intacta regenerada ou cicatrizada" value="intact_skin" checked={value === 'intact_skin'} onPress={() => {
                const newValue = "intact_skin";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth_of_tissue_injury: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
              <RadioButton label="Atingimento de epiderme e derme" value="epidermis_dermis" checked={value === 'epidermis_dermis'} onPress={() => {
                const newValue = "epidermis_dermis";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth_of_tissue_injury: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
              <RadioButton label="Atingimento de tela subcutânea ou tecido adiposo sem atingir a fáscia muscular" value="hypodermis_subcutaneous" checked={value === 'hypodermis_subcutaneous'} onPress={() => {
                const newValue = "hypodermis_subcutaneous";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth_of_tissue_injury: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
              <RadioButton label="Atingimento muscular" value="muscle_tissue" checked={value === 'muscle_tissue'} onPress={() => {
                const newValue = "muscle_tissue";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth_of_tissue_injury: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
              <RadioButton label="Atingimento ósseo e/ou tecidos anexos (tendões, ligamentos, cápsula articular) ou necrose negra, não permitindo visualização de tecidos subjacentes" value="bone_tissue" checked={value === 'bone_tissue'} onPress={() => {
                const newValue = "bone_tissue";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ depth_of_tissue_injury: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step5')
              }} />
            </View>
          )}
          name="depth_of_tissue_injury"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step3')} 
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
