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

export default function RegisterLesaoUlceraStep5() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>(
    {
      defaultValues: {
        wound_edges: registerLesionUlceraData.wound_edges,
      }
    }
  );
  const lesionLocalValue = useWatch({ control, name: "wound_edges" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.wound_edges && data.wound_edges.length > 0 && notEmpty) {
      console.log(data);
      updateRegisterLesionUlceraData(data);
      router.push('/(app)/(patient)/register-lesao/ulcera/step6');
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
        <ProgressBar step={5} totalSteps={9} />

        <TitleText title="RESVECH" description="Bordos"/>
        <Text allowFontScaling={false} className="text-sm text-neutral-700 mb-6">(0-4 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Ausência de bordos e ferida" value="no_edges" checked={value === 'no_edges'} onPress={() => {
                const newValue = "no_edges";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_edges: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
              <RadioButton label="Difusos" value="diffuse" checked={value === 'diffuse'} onPress={() => {
                const newValue = "diffuse";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_edges: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
              <RadioButton label="Delimitados" value="well_defined" checked={value === 'well_defined'} onPress={() => {
                const newValue = "well_defined";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_edges: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
              <RadioButton label="Lesados" value="damaged" checked={value === 'damaged'} onPress={() => {
                const newValue = "damaged";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_edges: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
              <RadioButton label='Espessos ("envelhecimento", "evertidos"' value='thickened' checked={value === 'thickened'} onPress={() => {
                const newValue = 'thickened';
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ wound_edges: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
            </View>
          )}
          name="wound_edges"
        /> 

      </ScrollView>

      <View className="gap-4 mt-4 px-8 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<ArrowLeftIcon size={24} color="#4052A1" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step4')} 
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
