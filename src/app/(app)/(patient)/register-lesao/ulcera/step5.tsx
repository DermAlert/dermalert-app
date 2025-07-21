import Button from "@/components/Button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RadioButton from "@/components/RadioButton";
import { useRegisterLesionUlceraForm } from "@/hooks/Ulcera/useRegisterLesionUlceraForm";
import { LesaoUlceraProps } from "@/types/forms";
import { AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";
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
  const { control, handleSubmit } = useForm<LesaoUlceraProps>();
  const lesionLocalValue = useWatch({ control, name: "bordos" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.bordos && data.bordos.length > 0 && notEmpty) {
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

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={5} totalSteps={9} />

        <Text className="text-2xl font-semibold mt-6">RESVECH</Text>
        <Text className="text-base text-gray-600 mt-4">Bordos</Text>
        <Text className="text-base text-gray-600 mb-8">(0-4 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Ausência de bordos e ferida" value="Ausência de bordos e ferida" checked={value === 'Ausência de bordos e ferida'} onPress={() => {
                const newValue = "Ausência de bordos e ferida";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ bordos: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
              <RadioButton label="Difusos" value="Difusos" checked={value === 'Difusos'} onPress={() => {
                const newValue = "Difusos";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ bordos: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
              <RadioButton label="Delimitados" value="Delimitados" checked={value === 'Delimitados'} onPress={() => {
                const newValue = "Delimitados";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ bordos: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
              <RadioButton label="Lesados" value="Lesados" checked={value === 'Lesados'} onPress={() => {
                const newValue = "Lesados";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ bordos: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
              <RadioButton label='Espessos ("envelhecimento", "evertidos"' value='Espessos ("envelhecimento", "evertidos"' checked={value === 'Espessos ("envelhecimento", "evertidos"'} onPress={() => {
                const newValue = 'Espessos ("envelhecimento", "evertidos"';
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ bordos: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step6')
              }} />
            </View>
          )}
          name="bordos"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step4')} 
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
