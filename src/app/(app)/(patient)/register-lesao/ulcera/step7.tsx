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

export default function RegisterLesaoUlceraStep7() {
  const [notEmpty, setNotEmpty] = useState(false);

  const { registerLesionUlceraData, setRegisterLesionUlceraData, updateRegisterLesionUlceraData } = useRegisterLesionUlceraForm();
  
  

  // formulario
  const { control, handleSubmit } = useForm<LesaoUlceraProps>();
  const lesionLocalValue = useWatch({ control, name: "exsudato" });


  

  const handleNext = (data: LesaoUlceraProps) => {
    if (data.exsudato && data.exsudato.length > 0 && notEmpty) {
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

      <ScrollView className="px-6 w-full flex-1">
        <ProgressBar step={7} totalSteps={9} />

        <Text className="text-2xl font-semibold mt-6">RESVECH</Text>
        <Text className="text-base text-gray-600 mt-4">Exsudato</Text>
        <Text className="text-base text-gray-600 mb-8">(0-4 pontos)</Text>


        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-3">
              <RadioButton label="Seco" value="Seco" checked={value === 'Seco'} onPress={() => {
                const newValue = "Seco";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exsudato: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
              <RadioButton label="Úmido" value="Úmido" checked={value === 'Úmido'} onPress={() => {
                const newValue = "Úmido";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exsudato: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
              <RadioButton label="Molhado" value="Molhado" checked={value === 'Molhado'} onPress={() => {
                const newValue = "Molhado";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exsudato: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
              <RadioButton label="Saturado ou elevado" value="Saturado ou elevado" checked={value === 'Saturado ou elevado'} onPress={() => {
                const newValue = "Saturado ou elevado";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exsudato: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
              <RadioButton label="Com fuga de exsudato" value="Com fuga de exsudato" checked={value === 'Com fuga de exsudato'} onPress={() => {
                const newValue = "Com fuga de exsudato";
                onChange(newValue);
                setNotEmpty(true);
                updateRegisterLesionUlceraData({ exsudato: newValue });
                router.push('/(app)/(patient)/register-lesao/ulcera/step8')
              }} />
            </View>
          )}
          name="exsudato"
        /> 

      </ScrollView>

      <View className="gap-4 mt-6 px-6 w-full justify-start mb-4 flex-row">
        <Button title="Voltar" 
          iconLeft 
          secondary 
          icon={(<AntDesign name="arrowleft" size={14} color="#1E1E1E" />)} 
          onPress={()=> router.push('/(app)/(patient)/register-lesao/ulcera/step6')} 
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
